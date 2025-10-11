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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-900">
    
    

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Scan History
          </h1>
          <p className="text-gray-600">
            View all your previous plant diagnoses
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 text-gray-700">
          {["Date Range", "Status", "All Plants"].map((filter, i) => (
            <button
              key={i}
              className="flex items-center gap-2 bg-white border border-green-200 rounded-xl px-4 py-2 hover:shadow-md transition-all"
            >
              <svg
                className="w-4 h-4 text-green-600"
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

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {scans.map((scan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl border border-green-100 shadow hover:shadow-lg transition-all p-6 relative overflow-hidden"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                  scan.color === "green"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {scan.status}
              </span>

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  scan.color === "green" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    scan.color === "green"
                      ? "text-green-600"
                      : "text-red-600"
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
              <h3 className="text-xl font-semibold mb-1">{scan.name}</h3>
              <p className="text-sm text-gray-500 mb-3">
                📅 {scan.date} • 🕒 {scan.time}
              </p>

              {/* Confidence Bar */}
              <div className="mb-1 text-sm font-medium text-gray-700">
                Confidence
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div
                  className={`h-2 rounded-full ${
                    scan.color === "green" ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${scan.confidence}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
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
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition">
            Load More
          </button>
        </motion.div>
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default History;
