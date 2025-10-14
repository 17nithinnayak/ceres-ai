/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const History = () => {
  const scans = [
    {
      name: "Tomato Plant",
      date: "2024-01-15",
      time: "10:30 AM",
      confidence: 94,
      status: "Healthy",
      color: "green",
    },
    {
      name: "Wheat Crop",
      date: "2024-01-14",
      time: "2:45 PM",
      confidence: 89,
      status: "Rust Detected",
      color: "red",
    },
    {
      name: "Corn Stalk",
      date: "2024-01-13",
      time: "9:15 AM",
      confidence: 96,
      status: "Healthy",
      color: "green",
    },
    {
      name: "Rice Plant",
      date: "2024-01-12",
      time: "4:20 PM",
      confidence: 87,
      status: "Leaf Blight",
      color: "red",
    },
    {
      name: "Soybean",
      date: "2024-01-11",
      time: "11:00 AM",
      confidence: 92,
      status: "Healthy",
      color: "green",
    },
    {
      name: "Cotton Plant",
      date: "2024-01-10",
      time: "3:30 PM",
      confidence: 95,
      status: "Healthy",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 font-inter">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Updated header color to white */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Scan History
          </h1>
          {/* Updated secondary text color */}
          <p className="text-gray-400">
            View all your previous plant diagnoses
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 text-gray-700">
          {["Date Range", "Status", "All Plants"].map((filter, i) => (
            <button
              key={i}
              // Updated: Dark button background, subtle border, and text color
              className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-gray-400 hover:bg-gray-700 transition-all shadow-md"
            >
              <svg
                // Updated filter icon color to green-400
                className="w-4 h-4 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    i === 0
                      ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      : i === 1
                      ? "M3 4a1 1 0 011-1h16a1 1 0 011 1v3H3V4zm0 5h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z"
                      : "M19 9l-7 7-7-7"
                  }
                />
              </svg>
              {filter}
            </button>
          ))}
        </div>

        {/* Grid of Scans */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scans.map((scan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(134, 239, 172, 0.2)" }}
              // Updated: Dark card background, darker border, and strong shadow on hover
              className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg hover:shadow-green-500/30 transition-all p-6 relative overflow-hidden"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                  // Updated badge colors for dark theme contrast
                  scan.color === "green"
                    ? "bg-green-700/30 text-green-300"
                    : "bg-red-700/30 text-red-300"
                }`}
              >
                {scan.status}
              </span>

              {/* Icon */}
              <div
                // Updated icon container background
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  scan.color === "green" ? "bg-green-900/50" : "bg-red-900/50"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    // Updated icon color for contrast
                    scan.color === "green"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 2C8.134 2 5 5.134 5 9v5a7 7 0 0014 0V9c0-3.866-3.134-7-7-7z"
                  />
                </svg>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-1 text-white">{scan.name}</h3>
              <p className="text-sm text-gray-400 mb-3">
                📅 {scan.date} • 🕒 {scan.time}
              </p>

              {/* Confidence Bar */}
              <div className="mb-1 text-sm font-medium text-gray-300">
                Confidence
              </div>
              {/* Updated confidence bar track to dark gray */}
              <div className="w-full bg-gray-700 h-2 rounded-full">
                <div
                  // Updated confidence bar fill colors
                  className={`h-2 rounded-full ${
                    scan.color === "green" ? "bg-green-600" : "bg-red-600"
                  }`}
                  style={{ width: `${scan.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {scan.confidence}% confidence
              </p>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-12 flex justify-center"
        >
          {/* Updated button to solid green with hover effect */}
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg shadow-green-600/30 transition">
            Load More
          </button>
        </motion.div>
      </main>
      
    </div>
  );
};

export default History;
