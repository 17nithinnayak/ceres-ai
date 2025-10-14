import React, { useState, useEffect } from "react";
import { Camera, Upload, Mic } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Scan = (props) => {
  const {
    onScan = () => {},
    onCamera = () => {},
    onUpload = () => {},
    onVoiceNote = () => {},
  } = props;

  const [isRecording, setIsRecording] = useState(false);

  const handleMicClick = () => {
    setIsRecording((prev) => !prev);
    onVoiceNote();
  };

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

  return (
    <div className="min-h-screen bg-white">
      <motion.main
        className="max-w-4xl mx-auto px-8 py-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Scan Your <span className="text-green-600">Plant</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Capture an image and let AI diagnose plant health instantly
          </p>
        </motion.div>

        {/* Scan box */}
        <motion.div
          className="flex flex-col items-center gap-8"
          variants={itemVariants}
        >
          <motion.div
            className="w-full max-w-md h-80 border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-100 transition-colors"
            onClick={onScan}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Camera size={64} className="text-gray-400 mb-4" />
            <p className="text-gray-600">Click to capture or upload image</p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div className="flex gap-4" variants={itemVariants}>
            {/* Camera */}
            <motion.button
              onClick={onCamera}
              className="flex flex-col items-center justify-center w-28 h-28 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Camera size={28} className="text-gray-700 mb-2" />
              <span className="text-sm text-gray-700">Camera</span>
            </motion.button>

            {/* Upload */}
            <motion.button
              onClick={onUpload}
              className="flex flex-col items-center justify-center w-28 h-28 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Upload size={28} className="text-gray-700 mb-2" />
              <span className="text-sm text-gray-700">Upload</span>
            </motion.button>

            {/* Voice Note with Sound Wave Animation */}
            <motion.button
              onClick={handleMicClick}
              className={`relative flex flex-col items-center justify-center w-28 h-28 rounded-2xl border transition-all ${
                isRecording
                  ? "bg-green-50 border-green-400 shadow-lg"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Waves */}
              <AnimatePresence>
                {isRecording && (
                  <>
                    {[...Array(3)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute w-20 h-20 border-2 border-green-400 rounded-full"
                        initial={{ scale: 0.6, opacity: 0.8 }}
                        animate={{
                          scale: 1.8,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.4,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>

              {/* Mic Icon */}
              <Mic
                size={28}
                className={`mb-2 z-10 transition-colors ${
                  isRecording ? "text-green-600" : "text-gray-700"
                }`}
              />
              <span
                className={`text-sm z-10 ${
                  isRecording ? "text-green-600 font-semibold" : "text-gray-700"
                }`}
              >
                {isRecording ? "Listening..." : "Voice Note"}
              </span>
            </motion.button>
          </motion.div>

          {/* Start Diagnosis */}
          <motion.button
            className="w-full max-w-md py-4 bg-green-600 text-white text-lg font-semibold rounded-2xl hover:bg-green-700 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            variants={itemVariants}
          >
            Start Diagnosis
          </motion.button>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-3 gap-8 mt-24"
          variants={itemVariants}
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
            >
              <h3 className="text-3xl font-bold text-green-600 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Scan;
