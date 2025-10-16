import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, Leaf, X, Loader, AlertTriangle, Mic, Volume2, VolumeX } from "lucide-react";

const translations = {
  en: {
    title: "Scan Your Plant",
    subtitle: "Capture an image and let AI diagnose plant health instantly",
    takePhoto: "Take Photo",
    uploadImage: "Upload Image",
    startDiagnosis: "Start Diagnosis",
    analyzing: "Analyzing Image...",
    selectPrompt: "Click to capture or upload image",
    supportText: "Supports high-res photos up to 10MB",
    queryPlaceholder: "Describe the problem (optional)",
    lblLang: "Language",
    lblEnglish: "English",
    lblKannada: "Kannada",
    voiceInput: "Voice Input",
    listening: "Listening...",
    speak: "Read Aloud",
    stopSpeaking: "Stop Reading",
  },
  kn: {
    title: "ನಿಮ್ಮ ಸಸಿಯನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    subtitle: "ಚಿತ್ರವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ, ಮತ್ತು AI ತಕ್ಷಣವೇ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ ನೀಡುತ್ತದೆ",
    takePhoto: "ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ",
    uploadImage: "ಚಿತ್ರವನ್ನು ಅಪ್ಲೋಡ್ ಮಾಡಿ",
    startDiagnosis: "ವಿಶ್ಲೇಷಣೆ ಪ್ರಾರಂಭಿಸಿ",
    analyzing: "ಚಿತ್ರವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
    selectPrompt: "ಚಿತ್ರವನ್ನು ಸೆರೆಹಿಡಿಯಲು ಅಥವಾ ಅಪ್ಲೋಡ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    supportText: "10MB ವರೆಗೆ ಉತ್ತಮ ಗುಣಮತ್ತದ ಚಿತ್ರಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ",
    queryPlaceholder: "ಸಮಸ್ಯೆಯನ್ನು ವಿವರಣೆಯಾಗಿ ಹೇಳಿ (ಐಚ್ಛಿಕ)",
    lblLang: "ಭಾಷೆ",
    lblEnglish: "ಇಂಗ್ಲಿಷ್",
    lblKannada: "ಕನ್ನಡ",
    voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    listening: "ಕೇಳುತ್ತಿದೆ...",
    speak: "ಓದಿ",
    stopSpeaking: "ನಿಲ್ಲಿಸಿ",
  },
};

const App = ({ initialLang = "en" }) => {
  const [lang, setLang] = useState(initialLang);
  const t = translations[lang] || translations.en;

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [userQuery, setUserQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [onlineResult, setOnlineResult] = useState(null);
  const [error, setError] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const synthesisRef = useRef(window.speechSynthesis);

  const fileInputRef = useRef(null);
  const API_BASE = "http://localhost:8000";

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setUserQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setError('Voice recognition failed. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Speech to Text function
  const startListening = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition not supported in your browser');
      return;
    }

    try {
      // Set language based on current selection
      recognitionRef.current.lang = lang === 'kn' ? 'kn-IN' : 'en-US';
      recognitionRef.current.start();
      setIsListening(true);
      setError(null);
    } catch (err) {
      console.error('Error starting recognition:', err);
      setError('Could not start voice recognition');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Text to Speech function
  const speakText = (text) => {
    if (!text) return;

    // Stop any ongoing speech
    synthesisRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'kn' ? 'kn-IN' : 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      setError('Text-to-speech failed');
    };

    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    synthesisRef.current.cancel();
    setIsSpeaking(false);
  };

  // Read out the analysis result
  const speakResult = () => {
    if (!onlineResult) return;

    const textToSpeak = `
      ${onlineResult.diseaseName}. 
      ${lang === 'kn' ? 'ತೀವ್ರತೆ' : 'Severity'}: ${onlineResult.severity}. 
      ${onlineResult.summary}. 
      ${onlineResult.scientificReason || ''}
    `;

    speakText(textToSpeak);
  };

  // Check if already logged in on mount
  useState(() => {
    const token = localStorage.getItem("backend_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginToBackend = async (e) => {
    e?.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Try form-data format first (common for OAuth2)
      const formData = new URLSearchParams();
      formData.append('username', loginForm.email); // OAuth2 uses 'username' field even for email
      formData.append('password', loginForm.password);

      const response = await fetch(`${API_BASE}/api/v1/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMsg = errorData?.detail || `Status ${response.status}`;
        
        if (response.status === 401) {
          throw new Error(`Invalid credentials: ${errorMsg}. Please check your email and password.`);
        }
        throw new Error(`Login failed: ${errorMsg}`);
      }

      const data = await response.json();
      
      // Store the token - adjust based on your API response structure
      const token = data.access_token || data.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("backend_token", token);
      setIsLoggedIn(true);
      setShowLogin(false);
      setLoginForm({ email: "", password: "" });
      console.log("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("backend_token");
    setIsLoggedIn(false);
    clearSelection();
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    setError(null);
    setOnlineResult(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("File too large. Please select an image <= 10MB.");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUserQuery("");
    setOnlineResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const fileToDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const startDiagnosis = async () => {
    setError(null);
    setOnlineResult(null);

    if (!selectedFile) {
      setError("Please select or take a photo first.");
      return;
    }

    // Check for backend token (not Supabase token)
    let token = localStorage.getItem("backend_token")?.trim();
    
    if (!token) {
      setError("Please login to the backend API first.");
      setShowLogin(true);
      return;
    }

    // Remove "Bearer " prefix if it exists (we'll add it back)
    token = token.replace(/^Bearer\s+/i, '');

    console.log("Token found:", token ? "YES" : "NO");
    console.log("Token length:", token.length);
    console.log("Token preview:", token.substring(0, 30) + "...");
    console.log("API endpoint:", `${API_BASE}/api/v1/analyze`);
    
    // Try to decode JWT to check expiry
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        console.log("Token payload:", payload);
        console.log("Token issuer:", payload.iss || "No issuer");
        if (payload.exp) {
          const expiry = new Date(payload.exp * 1000);
          const now = new Date();
          console.log("Token expires:", expiry.toLocaleString());
          console.log("Current time:", now.toLocaleString());
          console.log("Token expired:", now > expiry);
        }
      }
    } catch (e) {
      console.log("Could not decode token:", e);
    }

    setIsLoading(true);
    try {
      const imageDataUrl = await fileToDataUrl(selectedFile);

      const payload = {
        image: imageDataUrl,
        userQuery: userQuery || "",
        languageCode: lang === "kn" ? "kn" : "en",
        location: {
          latitude: 0,
          longitude: 0
        }
      };

      const resp = await fetch(`${API_BASE}/api/v1/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", resp.status);
      console.log("Response headers:", Object.fromEntries(resp.headers.entries()));

      if (!resp.ok) {
        if (resp.status === 401) {
          const errorBody = await resp.text().catch(() => "");
          console.error("401 Error body:", errorBody);
          console.error("Token that failed:", token.substring(0, 30) + "...");
          
          // Don't auto-clear tokens yet - let user see the error
          throw new Error(`Authentication failed: ${errorBody}. Check console for details.`);
        }
        const text = await resp.text().catch(() => "");
        throw new Error(`Server returned ${resp.status}: ${text}`);
      }

      const body = await resp.json();
      if (!body?.onlineResult) throw new Error("Invalid response from server.");

      setOnlineResult(body.onlineResult);
    } catch (err) {
      console.error("Analyze error:", err);
      setError(err.message || "Analysis failed");
    } finally {
      setIsLoading(false);
    }
  };

  const AnalysisResultDisplay = ({ result }) => {
    if (!result) return null;
    const {
      diseaseName,
      severity,
      summary,
      recommendedActions = [],
      scientificReason,
      preventativeMeasures = [],
    } = result;

    return (
      <div className="bg-gray-800 p-6 sm:p-8 rounded-3xl shadow-2xl border border-gray-700 animate-fade-in">
        <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-green-300 flex items-center">
            <Leaf size={28} className="mr-2" /> {diseaseName}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={isSpeaking ? stopSpeaking : speakResult}
              className="p-2 text-gray-400 hover:text-green-400 rounded-full transition"
              title={isSpeaking ? t.stopSpeaking : t.speak}
            >
              {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
            <button
              onClick={clearSelection}
              className="p-2 text-gray-400 hover:text-red-400 rounded-full transition"
              title="Close"
            >
              <X />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-red-300 font-medium mb-2">
            <AlertTriangle size={16} className="inline mr-2" />
            Severity: {severity}
          </div>
          <p className="italic text-gray-300 mb-3">{summary}</p>
        </div>

        {scientificReason && (
          <div className="mb-4">
            <h4 className="font-semibold text-green-200">Scientific Reason</h4>
            <p className="text-gray-300">{scientificReason}</p>
          </div>
        )}

        {recommendedActions.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-green-200">Recommended Actions</h4>
            <ol className="list-decimal pl-6 text-gray-300 space-y-1">
              {recommendedActions.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ol>
          </div>
        )}

        {preventativeMeasures.length > 0 && (
          <div>
            <h4 className="font-semibold text-green-200">Preventative Measures</h4>
            <ul className="list-disc pl-6 text-gray-300 space-y-1">
              {preventativeMeasures.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12">
        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-3xl p-8 max-w-md w-full border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-green-300">Login to Backend</h2>
                <button
                  onClick={() => setShowLogin(false)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={loginToBackend} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
                {error && (
                  <div className="bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-xl text-sm">
                    <AlertTriangle className="inline mr-2" size={16} />
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {onlineResult ? (
          <AnalysisResultDisplay result={onlineResult} />
        ) : (
          <div className="text-center">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 bg-gray-800 rounded-full p-1">
                <button
                  onClick={() => setLang("en")}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    lang === "en" ? "bg-green-500 text-white" : "text-gray-400"
                  }`}
                >
                  {t.lblEnglish}
                </button>
                <button
                  onClick={() => setLang("kn")}
                  className={`px-4 py-2 rounded-full text-sm transition ${
                    lang === "kn" ? "bg-green-500 text-white" : "text-gray-400"
                  }`}
                >
                  {t.lblKannada}
                </button>
              </div>
              
              <div>
                {isLoggedIn ? (
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full text-sm transition"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-sm transition"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>

            <h1 className="text-4xl font-extrabold mb-2">
              <span className="text-green-400">
                <Leaf className="inline mb-1" size={36} />
              </span>{" "}
              {t.title}
            </h1>
            <p className="text-gray-400 mb-8">{t.subtitle}</p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onClick={!previewUrl ? triggerFileInput : undefined}
              className={`w-full max-w-md h-80 mx-auto border-2 border-dashed rounded-3xl flex items-center justify-center overflow-hidden ${
                previewUrl
                  ? "border-green-500 bg-gray-800"
                  : "border-gray-600 bg-gray-800/50 cursor-pointer hover:border-green-500 hover:bg-gray-800/70"
              } transition-all`}
            >
              {previewUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      clearSelection();
                    }}
                    className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Upload size={48} className="mx-auto mb-4 text-green-400" />
                  <p className="text-lg font-medium mb-2">{t.selectPrompt}</p>
                  <p className="text-sm text-gray-500">{t.supportText}</p>
                </div>
              )}
            </div>

            {previewUrl && (
              <div className="max-w-md mx-auto mt-6 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder={t.queryPlaceholder}
                    className="w-full px-4 py-3 pr-12 bg-gray-800 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-100"
                  />
                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition ${
                      isListening 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white'
                    }`}
                    title={isListening ? t.listening : t.voiceInput}
                  >
                    <Mic size={20} />
                  </button>
                </div>

                <button
                  onClick={startDiagnosis}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin" size={20} />
                      {t.analyzing}
                    </>
                  ) : (
                    <>
                      <Camera size={20} />
                      {t.startDiagnosis}
                    </>
                  )}
                </button>
              </div>
            )}

            {error && (
              <div className="max-w-md mx-auto mt-6 bg-red-900/30 border border-red-500 text-red-300 px-4 py-3 rounded-2xl">
                <AlertTriangle className="inline mr-2" size={18} />
                {error}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;