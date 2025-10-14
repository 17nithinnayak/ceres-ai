// /* eslint-disable no-unused-vars */
// import React, { useState, useRef } from "react";
// import { Camera, Upload, Mic, Leaf, X, Loader, CheckCircle, AlertTriangle } from "lucide-react";
// import { motion } from "framer-motion";

// // Mock API endpoint (will be relative to the running environment)
// const API_BASE_URL = window.location.origin;

// // Mock data structure for a successful diagnosis result
// const mockAnalysisData = {
//     imageUrl: "https://placehold.co/400x300/15803d/ffffff?text=Analyzed+Leaf",
//     offlineResult: {
//         diseaseName: "Early Blight",
//         confidenceScore: 0.92,
//     },
//     onlineResult: {
//         diseaseName: "Tomato Early Blight (Alternaria solani)",
//         severity: "Moderate",
//         summary: "Early Blight is a common fungal disease affecting tomatoes and potatoes. It causes dark, concentric spots on older leaves, reducing photosynthesis and leading to premature defoliation.",
//         scientificReason: "Caused by the fungus Alternaria solani, the disease thrives in warm, humid conditions. Spores are spread by wind, water splash, insects, and contaminated tools, infecting lower leaves first.",
//         preventativeMeasures: [
//             "Rotate crops annually to avoid pathogen buildup in the soil.",
//             "Water at the base of the plant to keep leaves dry.",
//             "Apply a suitable fungicide (e.g., Chlorothalonil) at the first sign of disease.",
//             "Remove and destroy infected leaves immediately."
//         ]
//     }
// };

// // Main App component (renamed from Scan)
// const App = () => {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [analysisResult, setAnalysisResult] = useState(null);
//     const [error, setError] = useState(null);
//     const fileInputRef = useRef(null);

//     // --- Utility Functions ---

//     // Triggers the hidden file input to open the file selection dialog
//     const triggerFileInput = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     // Handles file selection and updates state/preview
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedFile(file);
//             setPreviewUrl(URL.createObjectURL(file));
//             setAnalysisResult(null); // Reset analysis when a new file is selected
//             setError(null);
//         }
//     };

//     // Clears the selected image and analysis
//     const clearSelection = () => {
//         setSelectedFile(null);
//         setPreviewUrl(null);
//         setAnalysisResult(null);
//         setError(null);
//         if (fileInputRef.current) {
//             fileInputRef.current.value = ""; // Clear file input value
//         }
//     };
    
//     // Simulates taking a photo (we'll just use the file uploader for simplicity)
//     const onCamera = () => {
//         // In a real app, this would open the device camera.
//         triggerFileInput();
//     };

//     // --- API and Diagnosis Logic (Mocked) ---

//     // Starts the diagnosis process by calling the mock backend
//     const startDiagnosis = async () => {
//         if (!selectedFile) return;

//         setIsLoading(true);
//         setAnalysisResult(null);
//         setError(null);

//         // Simulate API call with a delay and mock error handling
//         const maxRetries = 3;
//         for (let attempt = 0; attempt < maxRetries; attempt++) {
//             try {
//                 // Mock API call simulation
//                 await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency

//                 // Simulate a temporary network error (e.g., on the first attempt)
//                 if (attempt === 0 && Math.random() < 0.2) { // 20% chance of initial failure
//                     throw new Error("Temporary network timeout.");
//                 }

//                 // Simulate a successful response
//                 const mockResponse = {
//                     ok: true,
//                     json: async () => mockAnalysisData,
//                     status: 200,
//                 };

//                 const data = await mockResponse.json();
//                 setAnalysisResult(data);
//                 setIsLoading(false);
//                 return; // Success, exit retry loop
//             } catch (err) {
//                 console.error(`Diagnosis attempt ${attempt + 1} failed (Retrying...):`, err.message);
//                 if (attempt === maxRetries - 1) {
//                     setError("Failed to complete the analysis. Check connection and try again.");
//                     setIsLoading(false);
//                     return; // Max retries reached
//                 }
//                 // Wait for exponential backoff before retrying (1s, 2s, 4s)
//                 await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
//             }
//         }
//     };

//     // --- Sub Components ---

//     const AnalysisResultDisplay = ({ result }) => {
//         const onlineResult = result.onlineResult;
//         const offlineResult = result.offlineResult;
        
//         // Placeholder image if the mock image URL fails
//         const fallbackImageUrl = "https://placehold.co/400x300/a7f3d0/10b981?text=Plant+Image";

//         return (
//             <motion.div 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-green-200 dark:border-gray-700"
//             >
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
//                     <h2 className="text-3xl font-extrabold text-green-700 dark:text-green-300 flex items-center mb-4 sm:mb-0">
//                         <Leaf size={32} className="mr-3"/> Analysis Complete
//                     </h2>
//                     <button 
//                         onClick={clearSelection}
//                         className="p-3 text-gray-500 hover:text-red-500 transition-colors rounded-full bg-gray-100 dark:bg-gray-700"
//                     >
//                         <X size={20} />
//                     </button>
//                 </div>

//                 <div className="grid lg:grid-cols-2 gap-8">
//                     {/* Image and Offline Result */}
//                     <div className="space-y-6">
//                         <img 
//                             src={previewUrl || result.imageUrl || fallbackImageUrl} 
//                             onError={(e) => { e.target.onerror = null; e.target.src = fallbackImageUrl; }}
//                             alt="Analyzed Plant Leaf" 
//                             className="w-full h-auto rounded-xl object-cover shadow-lg border border-gray-100"
//                         />
//                         <div className="bg-green-50 dark:bg-gray-700 p-4 rounded-xl border border-green-200 dark:border-green-800">
//                             <h4 className="font-semibold text-lg mb-1 text-green-800 dark:text-green-200">
//                                 Offline (Instant) Diagnosis
//                             </h4>
//                             <p className="text-sm">
//                                 Disease: <span className="font-bold">{offlineResult.diseaseName}</span>
//                             </p>
//                             <p className="text-sm">
//                                 Confidence: <span className="font-bold">{(offlineResult.confidenceScore * 100).toFixed(0)}%</span>
//                             </p>
//                         </div>
//                     </div>

//                     {/* Online Details */}
//                     <div className="space-y-6">
//                         <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-xl border border-green-300 dark:border-green-900">
//                              <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-2">
//                                  {onlineResult.diseaseName}
//                             </h3>
//                             <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 font-medium">
//                                 <AlertTriangle size={18} />
//                                 <span>Severity: {onlineResult.severity}</span>
//                             </div>
//                         </div>

//                         <div className="space-y-4">
//                             <h4 className="text-xl font-semibold border-b border-green-200 dark:border-gray-700 pb-1 text-green-700 dark:text-green-300">Summary</h4>
//                             <p className="text-gray-700 dark:text-gray-300 italic">{onlineResult.summary}</p>

//                             <h4 className="text-xl font-semibold border-b border-green-200 dark:border-gray-700 pb-1 text-green-700 dark:text-green-300">Scientific Reason</h4>
//                             <p className="text-gray-700 dark:text-gray-300">{onlineResult.scientificReason}</p>

//                             <h4 className="text-xl font-semibold border-b border-green-200 dark:border-gray-700 pb-1 text-green-700 dark:text-green-300">Preventative Measures</h4>
//                             <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 pl-4">
//                                 {onlineResult.preventativeMeasures.map((measure, index) => (
//                                     <li key={index}>{measure}</li>
//                                 ))}
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//         );
//     };

//     // --- Motion Variants ---
//     const containerVariants = {
//         hidden: { opacity: 0, y: 40 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: { staggerChildren: 0.2, duration: 0.8 },
//         },
//     };

//     const itemVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//     };

//     // --- Main Render ---

//     return (
//         <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
//             <motion.main
//                 className="max-w-4xl mx-auto px-4 sm:px-8 py-16"
//                 initial="hidden"
//                 animate="visible"
//                 variants={containerVariants}
//             >
//                 {/* Conditionally render Analysis Results or Scan Interface */}
//                 {analysisResult ? (
//                     <AnalysisResultDisplay result={analysisResult} />
//                 ) : (
//                     <motion.div>
//                         {/* Header */}
//                         <motion.div className="text-center mb-12" variants={itemVariants}>
//                             <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
//                                 Scan Your <span className="text-green-700 dark:text-green-300">Plant</span>
//                             </h1>
//                             <p className="text-gray-600 dark:text-gray-400 text-lg">
//                                 Capture an image and let AI diagnose plant health instantly
//                             </p>
//                         </motion.div>

//                         {/* Hidden File Input */}
//                         <input
//                             type="file"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             accept="image/*"
//                             className="hidden"
//                         />

//                         {/* Loading State */}
//                         {isLoading && (
//                             <motion.div 
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="w-full max-w-md mx-auto h-80 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 border-green-500 dark:border-green-600"
//                             >
//                                 <Loader size={48} className="text-green-600 animate-spin" />
//                                 <p className="mt-4 text-xl font-semibold text-gray-700 dark:text-gray-300">Analyzing Image...</p>
//                                 <p className="text-sm text-gray-500 mt-1">Please wait for the expert review.</p>
//                             </motion.div>
//                         )}
                        
//                         {/* Error State */}
//                         {error && (
//                             <motion.div 
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 className="w-full max-w-md mx-auto p-8 h-80 flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/30 rounded-3xl shadow-xl border-2 border-red-500"
//                             >
//                                 <AlertTriangle size={48} className="text-red-600" />
//                                 <p className="mt-4 text-xl font-semibold text-red-700 dark:text-red-400">Error</p>
//                                 <p className="text-sm text-red-500 dark:text-red-400 mt-1 text-center max-w-xs">{error}</p>
//                                 <button onClick={clearSelection} className="mt-4 text-sm text-blue-600 hover:underline font-medium">Clear & Try Again</button>
//                             </motion.div>
//                         )}

//                         {/* Scan Box / Image Preview (Visible when not loading/error) */}
//                         {!isLoading && !error && (
//                             <motion.div
//                                 className="flex flex-col items-center gap-8"
//                                 variants={itemVariants}
//                             >
//                                 <motion.div
//                                     className={`w-full max-w-md h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors shadow-xl ${
//                                         selectedFile 
//                                         ? 'border-green-700 bg-green-50/50 dark:bg-gray-700/50 relative'
//                                         : 'border-green-400 dark:border-green-600 bg-white dark:bg-gray-800 hover:border-green-700 hover:bg-green-50 dark:hover:bg-gray-700'
//                                     }`}
//                                     onClick={selectedFile ? null : triggerFileInput}
//                                     whileHover={{ scale: selectedFile ? 1 : 1.03 }}
//                                     whileTap={{ scale: selectedFile ? 1 : 0.97 }}
//                                 >
//                                     {previewUrl ? (
//                                         <>
//                                             <img src={previewUrl} alt="Selected Leaf Preview" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80"/>
//                                             <div className="z-10 text-center p-4 rounded-xl backdrop-blur-sm bg-black/40">
//                                                 <p className="text-white font-medium">{selectedFile.name}</p>
//                                                 <button onClick={(e) => { e.stopPropagation(); clearSelection(); }} className="mt-2 text-sm text-red-400 hover:text-red-300 flex items-center mx-auto">
//                                                     <X size={16} className="mr-1"/> Remove Image
//                                                 </button>
//                                             </div>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Camera size={64} className="text-green-500 dark:text-green-400 mb-4" />
//                                             <p className="text-gray-700 dark:text-gray-300 font-medium">Click to capture or upload image</p>
//                                             <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Supports high-res photos up to 10MB</p>
//                                         </>
//                                     )}
//                                 </motion.div>

//                                 {/* Action Buttons */}
//                                 <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
//                                     {[
//                                         { icon: Camera, label: "Take Photo", onClick: onCamera, disabled: !!selectedFile },
//                                         { icon: Upload, label: "Upload Image", onClick: triggerFileInput, disabled: !!selectedFile },
//                                         { icon: Mic, label: "Voice Note", onClick: () => console.log("Voice Note clicked"), disabled: !!selectedFile }
//                                     ].map(
//                                         ({ icon: Icon, label, onClick, disabled }, idx) => (
//                                             <motion.button
//                                                 key={idx}
//                                                 onClick={onClick}
//                                                 disabled={disabled}
//                                                 className={`flex flex-col items-center justify-center w-28 h-28 border rounded-2xl transition-all shadow-md 
//                                                     ${disabled 
//                                                         ? 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-400 cursor-not-allowed'
//                                                         : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-700 hover:shadow-lg'
//                                                     }`}
//                                                 whileHover={{ scale: disabled ? 1 : 1.05 }}
//                                                 whileTap={{ scale: disabled ? 1 : 0.95 }}
//                                                 variants={itemVariants}
//                                             >
//                                                 <Icon size={28} className={`${disabled ? 'text-gray-400' : 'text-green-700 dark:text-green-300'} mb-2`} />
//                                                 <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</span>
//                                             </motion.button>
//                                         )
//                                     )}
//                                 </motion.div>

//                                 {/* Start Diagnosis Button */}
//                                 <motion.button
//                                     className="w-full max-w-md py-4 bg-green-700 text-white text-lg font-bold rounded-2xl hover:bg-green-800 transition-colors shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
//                                     whileHover={{ scale: selectedFile ? 1.03 : 1 }}
//                                     whileTap={{ scale: selectedFile ? 0.97 : 1 }}
//                                     variants={itemVariants}
//                                     onClick={startDiagnosis}
//                                     disabled={!selectedFile || isLoading}
//                                 >
//                                     Start Diagnosis
//                                 </motion.button>
//                             </motion.div>
//                         )}


//                         {/* Features */}
//                         <motion.div
//                             className="grid grid-cols-3 gap-8 mt-24 border-t border-gray-200 dark:border-gray-700 pt-10"
//                             variants={containerVariants}
//                         >
//                             {[
//                                 { title: "Instant", desc: "Results in seconds" },
//                                 { title: "Offline", desc: "Works without internet" },
//                                 { title: "98%", desc: "Accuracy rate" },
//                             ].map((item, idx) => (
//                                 <motion.div
//                                     key={idx}
//                                     className="text-center"
//                                     whileHover={{ scale: 1.05 }}
//                                     variants={itemVariants}
//                                 >
//                                     <h3 className="text-3xl font-extrabold text-green-700 dark:text-green-300 mb-2">
//                                         {item.title}
//                                     </h3>
//                                     <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
//                     </motion.div>
//                 )}
//             </motion.main>
//         </div>
//     );
// };

// export default App;
/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import { Camera, Upload, Mic, Leaf, X, Loader, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

// Mock API endpoint (will be relative to the running environment)
const API_BASE_URL = window.location.origin;

// Mock data structure for a successful diagnosis result
const mockAnalysisData = {
    imageUrl: "https://placehold.co/400x300/15803d/ffffff?text=Analyzed+Leaf",
    offlineResult: {
        diseaseName: "Early Blight",
        confidenceScore: 0.92,
    },
    onlineResult: {
        diseaseName: "Tomato Early Blight (Alternaria solani)",
        severity: "Moderate",
        summary: "Early Blight is a common fungal disease affecting tomatoes and potatoes. It causes dark, concentric spots on older leaves, reducing photosynthesis and leading to premature defoliation.",
        scientificReason: "Caused by the fungus Alternaria solani, the disease thrives in warm, humid conditions. Spores are spread by wind, water splash, insects, and contaminated tools, infecting lower leaves first.",
        preventativeMeasures: [
            "Rotate crops annually to avoid pathogen buildup in the soil.",
            "Water at the base of the plant to keep leaves dry.",
            "Apply a suitable fungicide (e.g., Chlorothalonil) at the first sign of disease.",
            "Remove and destroy infected leaves immediately."
        ]
    }
};

// Main App component
const App = () => {
    // Removed theme state, toggle, and effects for permanent dark mode

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    // --- Utility Functions ---

    // Triggers the hidden file input to open the file selection dialog
    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // Handles file selection and updates state/preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setAnalysisResult(null); // Reset analysis when a new file is selected
            setError(null);
        }
    };

    // Clears the selected image and analysis
    const clearSelection = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setAnalysisResult(null);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear file input value
        }
    };
    
    // Simulates taking a photo (we'll just use the file uploader for simplicity)
    const onCamera = () => {
        // In a real app, this would open the device camera.
        triggerFileInput();
    };

    // --- API and Diagnosis Logic (Mocked) ---

    // Starts the diagnosis process by calling the mock backend
    const startDiagnosis = async () => {
        if (!selectedFile) return;

        setIsLoading(true);
        setAnalysisResult(null);
        setError(null);

        // Simulate API call with a delay and mock error handling
        const maxRetries = 3;
        for (let attempt = 0; attempt < maxRetries; attempt++) {
            try {
                // Mock API call simulation
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network latency

                // Simulate a temporary network error (e.g., on the first attempt)
                // Use a proper exponential backoff retry mechanism.
                if (attempt === 0 && Math.random() < 0.2) { // 20% chance of initial failure
                    throw new Error("Temporary network timeout.");
                }

                // Simulate a successful response
                const mockResponse = {
                    ok: true,
                    json: async () => mockAnalysisData,
                    status: 200,
                };

                const data = await mockResponse.json();
                setAnalysisResult(data);
                setIsLoading(false);
                return; // Success, exit retry loop
            } catch (err) {
                console.error(`Diagnosis attempt ${attempt + 1} failed (Retrying...):`, err.message);
                if (attempt === maxRetries - 1) {
                    setError("Failed to complete the analysis. Check connection and try again.");
                    setIsLoading(false);
                    return; // Max retries reached
                }
                // Wait for exponential backoff before retrying (1s, 2s, 4s)
                await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
            }
        }
    };

    // --- Sub Components ---

    const AnalysisResultDisplay = ({ result }) => {
        const onlineResult = result.onlineResult;
        const offlineResult = result.offlineResult;
        
        // Placeholder image if the mock image URL fails
        const fallbackImageUrl = "https://placehold.co/400x300/a7f3d0/10b981?text=Plant+Image";

        return (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                // Permanent Dark Mode Styling applied here
                className="bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-700"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-gray-700 pb-4">
                    <h2 className="text-3xl font-extrabold text-green-300 flex items-center mb-4 sm:mb-0">
                        <Leaf size={32} className="mr-3"/> Analysis Complete
                    </h2>
                    <button 
                        onClick={clearSelection}
                        className="p-3 text-gray-400 hover:text-red-400 transition-colors rounded-full bg-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Image and Offline Result */}
                    <div className="space-y-6">
                        <img 
                            src={previewUrl || result.imageUrl || fallbackImageUrl} 
                            onError={(e) => { e.target.onerror = null; e.target.src = fallbackImageUrl; }}
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
                                Confidence: <span className="font-bold">{(offlineResult.confidenceScore * 100).toFixed(0)}%</span>
                            </p>
                        </div>
                    </div>

                    {/* Online Details */}
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
                            <h4 className="text-xl font-semibold border-b border-gray-700 pb-1 text-green-300">Summary</h4>
                            <p className="text-gray-300 italic">{onlineResult.summary}</p>

                            <h4 className="text-xl font-semibold border-b border-gray-700 pb-1 text-green-300">Scientific Reason</h4>
                            <p className="text-gray-300">{onlineResult.scientificReason}</p>

                            <h4 className="text-xl font-semibold border-b border-gray-700 pb-1 text-green-300">Preventative Measures</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-300 pl-4">
                                {onlineResult.preventativeMeasures.map((measure, index) => (
                                    <li key={index}>{measure}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    };

    // --- Motion Variants ---
    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 0.8 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    // --- Main Render ---

    return (
        // Set root styling to permanent dark mode
        <div className="min-h-screen font-sans">
            <div className="bg-gray-900 text-gray-100 min-h-screen">
            
                {/* Theme Toggle Button REMOVED */}

                <motion.main
                    className="max-w-4xl mx-auto px-4 sm:px-8 py-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Conditionally render Analysis Results or Scan Interface */}
                    {analysisResult ? (
                        <AnalysisResultDisplay result={analysisResult} />
                    ) : (
                        <motion.div>
                            {/* Header */}
                            <motion.div className="text-center mb-12" variants={itemVariants}>
                                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-100 mb-4">
                                    Scan Your <span className="text-green-300">Plant</span>
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    Capture an image and let AI diagnose plant health instantly
                                </p>
                            </motion.div>

                            {/* Hidden File Input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                className="hidden"
                            />

                            {/* Loading State */}
                            {isLoading && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    // Permanent Dark Mode Styling
                                    className="w-full max-w-md mx-auto h-80 flex flex-col items-center justify-center bg-gray-800 rounded-3xl shadow-xl border-2 border-green-600"
                                >
                                    <Loader size={48} className="text-green-600 animate-spin" />
                                    <p className="mt-4 text-xl font-semibold text-gray-300">Analyzing Image...</p>
                                    <p className="text-sm text-gray-500 mt-1">Please wait for the expert review.</p>
                                </motion.div>
                            )}
                            
                            {/* Error State */}
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    // Permanent Dark Mode Styling
                                    className="w-full max-w-md mx-auto p-8 h-80 flex flex-col items-center justify-center bg-red-900/30 rounded-3xl shadow-xl border-2 border-red-500"
                                >
                                    <AlertTriangle size={48} className="text-red-400" />
                                    <p className="mt-4 text-xl font-semibold text-red-400">Error</p>
                                    <p className="text-sm text-red-400 mt-1 text-center max-w-xs">{error}</p>
                                    <button onClick={clearSelection} className="mt-4 text-sm text-blue-400 hover:underline font-medium">Clear & Try Again</button>
                                </motion.div>
                            )}

                            {/* Scan Box / Image Preview (Visible when not loading/error) */}
                            {!isLoading && !error && (
                                <motion.div
                                    className="flex flex-col items-center gap-8"
                                    variants={itemVariants}
                                >
                                    <motion.div
                                        className={`w-full max-w-md h-80 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors shadow-xl ${
                                            selectedFile 
                                            // Permanent Dark Mode Styling
                                            ? 'border-green-700 bg-gray-700/50 relative'
                                            : 'border-green-600 bg-gray-800 hover:border-green-400 hover:bg-gray-700'
                                        }`}
                                        onClick={selectedFile ? null : triggerFileInput}
                                        whileHover={{ scale: selectedFile ? 1 : 1.03 }}
                                        whileTap={{ scale: selectedFile ? 1 : 0.97 }}
                                    >
                                        {previewUrl ? (
                                            <>
                                                <img src={previewUrl} alt="Selected Leaf Preview" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-80"/>
                                                <div className="z-10 text-center p-4 rounded-xl backdrop-blur-sm bg-black/40">
                                                    <p className="text-white font-medium">{selectedFile.name}</p>
                                                    <button onClick={(e) => { e.stopPropagation(); clearSelection(); }} className="mt-2 text-sm text-red-400 hover:text-red-300 flex items-center mx-auto">
                                                        <X size={16} className="mr-1"/> Remove Image
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Camera size={64} className="text-green-400 mb-4" />
                                                <p className="text-gray-300 font-medium">Click to capture or upload image</p>
                                                <p className="text-sm text-gray-500 mt-1">Supports high-res photos up to 10MB</p>
                                            </>
                                        )}
                                    </motion.div>

                                    {/* Action Buttons */}
                                    <motion.div className="flex flex-wrap justify-center gap-4" variants={itemVariants}>
                                        {[
                                            { icon: Camera, label: "Take Photo", onClick: onCamera, disabled: !!selectedFile },
                                            { icon: Upload, label: "Upload Image", onClick: triggerFileInput, disabled: !!selectedFile },
                                            { icon: Mic, label: "Voice Note", onClick: () => console.log("Voice Note clicked"), disabled: !!selectedFile }
                                        ].map(
                                            ({ icon: Icon, label, onClick, disabled }, idx) => (
                                                <motion.button
                                                    key={idx}
                                                    onClick={onClick}
                                                    disabled={disabled}
                                                    // Permanent Dark Mode Styling
                                                    className={`flex flex-col items-center justify-center w-28 h-28 border rounded-2xl transition-all shadow-md 
                                                        ${disabled 
                                                            ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed'
                                                            : 'bg-gray-800 border-gray-700 hover:border-green-700 hover:shadow-lg'
                                                        }`}
                                                    whileHover={{ scale: disabled ? 1 : 1.05 }}
                                                    whileTap={{ scale: disabled ? 1 : 0.95 }}
                                                    variants={itemVariants}
                                                >
                                                    <Icon size={28} className={`${disabled ? 'text-gray-400' : 'text-green-300'} mb-2`} />
                                                    <span className="text-sm text-gray-300 font-medium">{label}</span>
                                                </motion.button>
                                            )
                                        )}
                                    </motion.div>

                                    {/* Start Diagnosis Button */}
                                    <motion.button
                                        className="w-full max-w-md py-4 bg-green-700 text-white text-lg font-bold rounded-2xl hover:bg-green-800 transition-colors shadow-xl disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                                        whileHover={{ scale: selectedFile ? 1.03 : 1 }}
                                        whileTap={{ scale: selectedFile ? 0.97 : 1 }}
                                        variants={itemVariants}
                                        onClick={startDiagnosis}
                                        disabled={!selectedFile || isLoading}
                                    >
                                        Start Diagnosis
                                    </motion.button>
                                </motion.div>
                            )}


                            {/* Features */}
                            <motion.div
                                className="grid grid-cols-3 gap-8 mt-24 border-t border-gray-700 pt-10"
                                variants={containerVariants}
                            >
                                {[
                                    { title: "Instant", desc: "Results in seconds" },
                                    { title: "Offline", desc: "Works without internet" },
                                    { title: "98%", desc: "Accuracy rate" },
                                ].map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        className="text-center"
                                        whileHover={{ scale: 1.05 }}
                                        variants={itemVariants}
                                    >
                                        <h3 className="text-3xl font-extrabold text-green-300 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </motion.main>
            </div>
        </div>
    );
};

export default App;
