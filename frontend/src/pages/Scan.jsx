
// export default App;
import React, { useState, useRef } from "react";
import axios from "axios";
import { Camera, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Translation dictionary
const translations = {
  en: {
    title: "Scan Your Plant",
    subtitle: "Capture an image and let AI diagnose plant health instantly",
    startDiagnosis: "Start Diagnosis",
    analyzing: "Analyzing Image...",
    pleaseWait: "Please wait for the expert review.",
    tryAgain: "Clear & Try Again",
    selectPrompt: "Click to capture or upload image",
    supportText: "Supports high-res photos up to 10MB",
  },
  kn: {
    title: "ನಿಮ್ಮ ಸಸಿಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    subtitle: "ಚಿತ್ರವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ, ಮತ್ತು AI ತಕ್ಷಣವೇ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ ನೀಡುತ್ತದೆ",
    startDiagnosis: "ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
    analyzing: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    pleaseWait: "ದಯವಿಟ್ಟು ತಜ್ಞರ ಪರಿಶೀಲನೆಗಾಗಿ ಕಾಯಿರಿ.",
    tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
    selectPrompt: "ಚಿತ್ರವನ್ನು ಸೆರೆಹಿಡಿಯಲು ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    supportText: "10MB ವರೆಗೆ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಚಿತ್ರಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ",
  },
};

// StatusDisplay component
const StatusDisplay = ({ status, message }) => (
  <div
    className={`w-full max-w-md p-4 rounded-xl text-white text-center ${
      status === "loading" ? "bg-green-700" : "bg-red-700"
    }`}
  >
    {message}
  </div>
);

const App = ({ lang = "en" }) => {
  const t = translations[lang];

  // --- State variables ---
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  const [farm_id, setFarmId] = useState("1"); // keep as string initially, convert before sending
  const [user_id, setUserId] = useState("1");
  const [user_query, setUserQuery] = useState("Yellow spots on leaves.");
  const language_code = lang; // directly taken from props

  const fileInputRef = useRef(null);

  // --- Handlers ---
  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setAnalysisResult(null);
    setError(null);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // --- Diagnosis function ---
  const startDiagnosis = async () => {
    if (!selectedFile || !farm_id || !user_id || !user_query) return;

    setIsLoading(true);
    setAnalysisResult(null);
    setError(null);

    try {
      // Convert file to Base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
          // Strip the prefix if backend expects raw Base64
          const rawBase64 = reader.result.split(",")[1];
          resolve(rawBase64);
        };
        reader.onerror = (err) => reject(err);
      });

      // ✅ Build payload matching FastAPI model
      const payload = {
        image: base64Image,
        user_query: user_query.trim(), // ensure no accidental empty string
        language_code: language_code,
        farm_id: Number(farm_id),
        user_id: Number(user_id),
      };

      // Validate numeric IDs
      if (isNaN(payload.farm_id) || isNaN(payload.user_id)) {
        setError("Farm ID and User ID must be valid numbers");
        setIsLoading(false);
        return;
      }

      console.log("Sending payload:", payload);

      // POST to FastAPI
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/analyze",
        payload
      );

      setAnalysisResult(data);
    } catch (err) {
      console.error("Analysis API Call Error:", err.response || err);
      let errorMsg = err.message;
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          errorMsg = detail.map((d) => d.msg || JSON.stringify(d)).join(", ");
        } else {
          errorMsg = JSON.stringify(detail);
        }
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
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
          <div>
            <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
            <pre className="bg-gray-800 p-4 rounded-xl">
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
            <button
              onClick={clearSelection}
              className="mt-4 px-4 py-2 bg-red-600 rounded-xl"
            >
              {t.tryAgain}
            </button>
          </div>
        ) : (
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-4">
              {t.title}
            </h1>
            <p className="text-gray-400 text-lg">{t.subtitle}</p>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="mt-12 flex flex-col items-center gap-8 w-full">
              {isLoading || error ? (
                <StatusDisplay
                  status={isLoading ? "loading" : "error"}
                  message={isLoading ? t.pleaseWait : error || ""}
                />
              ) : (
                <>
                  {/* Farm and User Inputs */}
                  <div className="flex w-full max-w-md space-x-4">
                    <input
                      type="text"
                      placeholder="Farm ID"
                      value={farm_id}
                      onChange={(e) => setFarmId(e.target.value)}
                      className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500"
                    />
                    <input
                      type="text"
                      placeholder="User ID"
                      value={user_id}
                      onChange={(e) => setUserId(e.target.value)}
                      className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500"
                    />
                  </div>

                  {/* Issue Description */}
                  <textarea
                    placeholder="Describe the issue"
                    value={user_query}
                    onChange={(e) => setUserQuery(e.target.value)}
                    rows={2}
                    className="w-full max-w-md p-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500"
                  />

                  {/* Image Upload / Preview */}
                  <motion.div
                    className={`relative w-full max-w-md h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors shadow-xl ${
                      selectedFile
                        ? "border-green-700 bg-gray-700/50"
                        : "border-green-600 bg-gray-800 hover:border-green-400 hover:bg-gray-700"
                    }`}
                    onClick={selectedFile ? undefined : triggerFileInput}
                  >
                    {previewUrl ? (
                      <>
                        <img
                          src={previewUrl}
                          alt="Selected Leaf Preview"
                          className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80"
                        />
                        <div className="z-10 text-center p-4 rounded-xl backdrop-blur-sm bg-black/40">
                          <p className="text-white font-medium">
                            {selectedFile?.name}
                          </p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              clearSelection();
                            }}
                            className="mt-2 text-sm text-red-400 hover:text-red-300 flex items-center mx-auto"
                          >
                            <X size={16} className="mr-1" />
                            Remove Image
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <Camera size={64} className="text-green-400 mb-4" />
                        <p className="text-gray-300 font-medium">
                          {t.selectPrompt}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {t.supportText}
                        </p>
                      </>
                    )}
                  </motion.div>

                  {/* Start Diagnosis Button */}
                  <motion.button
                    onClick={startDiagnosis}
                    disabled={!selectedFile || !farm_id || !user_id || !user_query}
                    className={`w-full max-w-md py-4 text-white text-lg font-bold rounded-2xl shadow-xl transition-colors ${
                      selectedFile && farm_id && user_id && user_query
                        ? "bg-green-700 hover:bg-green-800"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {t.startDiagnosis}
                  </motion.button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.main>
    </div>
  );
};

export default App;
