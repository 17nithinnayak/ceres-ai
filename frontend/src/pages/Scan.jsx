/* eslint-disable no-unused-vars */

import React, { useState, useRef } from "react";
import { Camera, Upload, Mic, Leaf, X, Loader, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// 🌍 Translation dictionary
const translations = {
  en: {
    title: "Scan Your Plant",
    subtitle: "Capture an image and let AI diagnose plant health instantly",
    takePhoto: "Take Photo",
    uploadImage: "Upload Image",
    voiceNote: "Voice Note",
    startDiagnosis: "Start Diagnosis",
    instant: "Instant",
    offline: "Offline",
    accuracy: "Accuracy",
    instantDesc: "Results in seconds",
    offlineDesc: "Works without internet",
    accuracyDesc: "Accuracy rate",
    analyzing: "Analyzing Image...",
    pleaseWait: "Please wait for the expert review.",
    error: "Error",
    tryAgain: "Clear & Try Again",
    selectPrompt: "Click to capture or upload image",
    supportText: "Supports high-res photos up to 10MB",
  },
  kn: {
    title: "ನಿಮ್ಮ ಸಸಿಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    subtitle: "ಚಿತ್ರವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ, ಮತ್ತು AI ತಕ್ಷಣವೇ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ ನೀಡುತ್ತದೆ",
    takePhoto: "ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
    uploadImage: "ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    voiceNote: "ಧ್ವನಿ ಟಿಪ್ಪಣಿ",
    startDiagnosis: "ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
    instant: "ತಕ್ಷಣ",
    offline: "ಆಫ್‌ಲೈನ್",
    accuracy: "ನಿಖರತೆ",
    instantDesc: "ಕೆಲವೇ ಕ್ಷಣದಲ್ಲಿ ಫಲಿತಾಂಶಗಳು",
    offlineDesc: "ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೇ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
    accuracyDesc: "ನಿಖರತೆಯ ಪ್ರಮಾಣ",
    analyzing: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    pleaseWait: "ದಯವಿಟ್ಟು ತಜ್ಞರ ಪರಿಶೀಲನೆಗಾಗಿ ಕಾಯಿರಿ.",
    error: "ದೋಷ",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    selectPrompt: "ಚಿತ್ರವನ್ನು ಸೆರೆಹಿಡಿಯಲು ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    supportText: "10MB ವರೆಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಚಿತ್ರಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ",
  },
};

// --- Mock data (unchanged)
const mockAnalysisData = {
  imageUrl: "https://placehold.co/400x300/15803d/ffffff?text=Analyzed+Leaf",
  offlineResult: {
    diseaseName: "Early Blight",
    confidenceScore: 0.92,
  },
  onlineResult: {
    diseaseName: "Tomato Early Blight (Alternaria solani)",
    severity: "Moderate",
    summary:
      "Early Blight is a common fungal disease affecting tomatoes and potatoes. It causes dark, concentric spots on older leaves, reducing photosynthesis and leading to premature defoliation.",
    scientificReason:
      "Caused by the fungus Alternaria solani, the disease thrives in warm, humid conditions. Spores are spread by wind, water splash, insects, and contaminated tools, infecting lower leaves first.",
    preventativeMeasures: [
      "Rotate crops annually to avoid pathogen buildup in the soil.",
      "Water at the base of the plant to keep leaves dry.",
      "Apply a suitable fungicide (e.g., Chlorothalonil) at the first sign of disease.",
      "Remove and destroy infected leaves immediately.",
    ],
  },
};

const App = ({ lang = "en" }) => {
  const t = translations[lang]; // 🪄 Use translation based on selected language

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
      setError(null);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const startDiagnosis = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading
      const data = mockAnalysisData;
      setAnalysisResult(data);
    } catch (err) {
      setError("Failed to complete analysis");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Sub Component ---
  const AnalysisResultDisplay = ({ result }) => {
    const { offlineResult, onlineResult } = result;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-700"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-700 pb-4">
          <h2 className="text-3xl font-extrabold text-green-300 flex items-center mb-4 sm:mb-0">
            <Leaf size={32} className="mr-3" /> Analysis Complete
          </h2>
          <button
            onClick={clearSelection}
            className="p-3 text-gray-400 hover:text-red-400 transition-colors rounded-full bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <img
              src={previewUrl || result.imageUrl}
              alt="Analyzed Plant Leaf"
              className="w-full h-auto rounded-xl object-cover shadow-lg border border-gray-700"
            />
            <div className="bg-gray-700 p-4 rounded-xl border border-green-800">
              <h4 className="font-semibold text-lg mb-1 text-green-200">
                Offline (Instant) Diagnosis
              </h4>
              <p className="text-sm text-gray-300">
                Disease: <span className="font-bold">{offlineResult.diseaseName}</span>
              </p>
              <p className="text-sm text-gray-300">
                Confidence:{" "}
                <span className="font-bold">
                  {(offlineResult.confidenceScore * 100).toFixed(0)}%
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-green-900/50 p-4 rounded-xl border border-green-900">
              <h3 className="text-2xl font-bold text-green-300 mb-2">
                {onlineResult.diseaseName}
              </h3>
              <div className="flex items-center space-x-2 text-red-400 font-medium">
                <AlertTriangle size={18} />
                <span>Severity: {onlineResult.severity}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold border-b border-gray-700 pb-1 text-green-300">
                Summary
              </h4>
              <p className="text-gray-300 italic">{onlineResult.summary}</p>

              <h4 className="text-xl font-semibold border-b border-gray-700 pb-1 text-green-300">
                Scientific Reason
              </h4>
              <p className="text-gray-300">{onlineResult.scientificReason}</p>

              <h4 className="text-xl font-semibold border-b border-gray-700 pb-1 text-green-300">
                Preventative Measures
              </h4>
              <ul className="list-disc list-inside space-y-2 text-gray-300 pl-4">
                {onlineResult.preventativeMeasures.map((measure, i) => (
                  <li key={i}>{measure}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-gray-100">
      <motion.main
        className="max-w-4xl mx-auto px-4 sm:px-8 py-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {analysisResult ? (
          <AnalysisResultDisplay result={analysisResult} />
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-4">
              {t.title.split(" ")[0]} <span className="text-green-300">{t.title.split(" ")[1]}</span>
            </h1>
            <p className="text-gray-400 text-lg">{t.subtitle}</p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Preview & Actions */}
            {!isLoading && !error && (
              <div className="mt-12 flex flex-col items-center gap-8">
                <motion.div
                  className={`w-full max-w-md h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors shadow-xl ${
                    selectedFile
                      ? "border-green-700 bg-gray-700/50 relative"
                      : "border-green-600 bg-gray-800 hover:border-green-400 hover:bg-gray-700"
                  }`}
                  onClick={selectedFile ? null : triggerFileInput}
                >
                  {previewUrl ? (
                    <>
                      <img
                        src={previewUrl}
                        alt="Selected Leaf Preview"
                        className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80"
                      />
                      <div className="z-10 text-center p-4 rounded-xl backdrop-blur-sm bg-black/40">
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            clearSelection();
                          }}
                          className="mt-2 text-sm text-red-400 hover:text-red-300 flex items-center mx-auto"
                        >
                          <X size={16} className="mr-1" /> Remove Image
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Camera size={64} className="text-green-400 mb-4" />
                      <p className="text-gray-300 font-medium">{t.selectPrompt}</p>
                      <p className="text-sm text-gray-500 mt-1">{t.supportText}</p>
                    </>
                  )}
                </motion.div>

                {/* Buttons */}
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { icon: Camera, label: t.takePhoto, onClick: triggerFileInput },
                    { icon: Upload, label: t.uploadImage, onClick: triggerFileInput },
                    { icon: Mic, label: t.voiceNote, onClick: () => console.log("Voice Note") },
                  ].map(({ icon: Icon, label, onClick }, i) => (
                    <motion.button
                      key={i}
                      onClick={onClick}
                      className="flex flex-col items-center justify-center w-28 h-28 bg-gray-800 border border-gray-700 hover:border-green-700 rounded-2xl shadow-md"
                    >
                      <Icon size={28} className="text-green-300 mb-2" />
                      <span className="text-sm text-gray-300 font-medium">{label}</span>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={startDiagnosis}
                  className="w-full max-w-md py-4 bg-green-700 text-white text-lg font-bold rounded-2xl hover:bg-green-800 transition-colors shadow-xl"
                >
                  {t.startDiagnosis}
                </motion.button>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-3 gap-8 mt-24 border-t border-gray-700 pt-10">
              {[
                { title: t.instant, desc: t.instantDesc },
                { title: t.offline, desc: t.offlineDesc },
                { title: "98%", desc: t.accuracyDesc },
              ].map((item, i) => (
                <motion.div key={i} className="text-center">
                  <h3 className="text-3xl font-extrabold text-green-300 mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default App;