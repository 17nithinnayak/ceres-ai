/* eslint-disable no-unused-vars */
import React from "react";
import { Camera, Upload, Mic } from "lucide-react";
import { motion } from "framer-motion";

const Scan = (props) => {
  const {
    onScan = () => {},
    onCamera = () => {},
    onUpload = () => {},
    onVoiceNote = () => {},
  } = props;

  // Motion variants
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
            {[{ icon: Camera, label: "Camera", onClick: onCamera },
              { icon: Upload, label: "Upload", onClick: onUpload },
              { icon: Mic, label: "Voice Note", onClick: onVoiceNote }].map(
              ({ icon: Icon, label, onClick }, idx) => (
                <motion.button
                  key={idx}
                  onClick={onClick}
                  className="flex flex-col items-center justify-center w-28 h-28 bg-white border border-gray-200 rounded-2xl hover:border-gray-300 hover:shadow-md transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={itemVariants}
                >
                  <Icon size={28} className="text-gray-700 mb-2" />
                  <span className="text-sm text-gray-700">{label}</span>
                </motion.button>
              )
            )}
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
