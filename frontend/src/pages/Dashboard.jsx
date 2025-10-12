/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = [
    { label: "Total Scans", value: 48, change: "+12%" },
    { label: "Healthy Plants", value: 42, change: "+8%" },
    { label: "Issues Detected", value: 6, change: "-15%" },
    { label: "Success Rate", value: "94%", change: "+5%" },
  ];

  const scans = [
    { name: "Tomato Plant", time: "2 hours ago", status: "Healthy", color: "green" },
    { name: "Wheat Crop", time: "5 hours ago", status: "Rust Detected", color: "red" },
    { name: "Corn Stalk", time: "1 day ago", status: "Healthy", color: "green" },
    { name: "Rice Plant", time: "2 days ago", status: "Leaf Blight", color: "red" },
  ];

  const tips = [
    "Water your plants early morning for best results",
    "Check leaves regularly for early disease detection",
    "Maintain proper spacing between plants",
  ];

  return (
    // Updated: Dark background gradient and light text for the entire page
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 font-inter">
      
      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          {/* Updated text color to white and accent to green-400 */}
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Welcome back, <span className="text-green-400">Farmer!</span>
          </h1>
          {/* Updated text color for secondary text */}
          <p className="text-gray-400">
            Here's an overview of your plant health monitoring
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              // Dark card background, prominent shadow, and border
              className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-700 hover:shadow-green-500/30 hover:scale-[1.02] transition-all"
            >
              {/* Updated value color to bright green */}
              <h2 className="text-4xl font-bold text-green-400 mb-2">
                {s.value}
              </h2>
              {/* Updated label color */}
              <p className="text-gray-400 font-medium">{s.label}</p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  // Updated green for better dark contrast
                  s.change.includes("+") ? "text-green-400" : "text-red-400" 
                }`}
              >
                {s.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Scans + Quick Actions */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Recent Scans */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              {/* Updated header text color */}
              <h3 className="text-xl font-bold text-white">Recent Scans</h3>
              {/* Updated link color */}
              <a
                href="#"
                className="text-green-400 font-medium hover:underline" 
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {scans.map((scan, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  // Dark card background and border
                  className="bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-md border border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      // Updated badge colors for dark theme contrast
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        scan.color === "green"
                          ? "bg-green-900/50 text-green-300"
                          : "bg-red-900/50 text-red-300"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 2a10 10 0 100 20 10 10 0 000-20z"
                        />
                      </svg>
                    </div>
                    <div>
                      {/* Updated text color */}
                      <h4 className="font-semibold text-white">
                        {scan.name}
                      </h4>
                      {/* Updated secondary text color */}
                      <p className="text-gray-400 text-sm">{scan.time}</p>
                    </div>
                  </div>
                  <span
                    // Updated badge colors for dark theme contrast
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      scan.color === "green"
                        ? "bg-green-700/30 text-green-300"
                        : "bg-red-700/30 text-red-300"
                    }`}
                  >
                    {scan.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            // Dark card background and border
            className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700"
          >
            {/* Updated header text color */}
            <h3 className="text-xl font-bold mb-4 text-white">Quick Actions</h3>
            {/* New Scan button: Bright green */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-green-600/30 mb-3 transition-transform hover:scale-[1.02]">
              New Scan
            </button>
            {/* View History button: Outline style */}
            <button className="w-full border border-green-600 text-green-400 hover:bg-green-900/50 font-semibold py-3 rounded-lg transition-colors">
              View History
            </button>

            <div className="mt-6">
              {/* Updated header text color */}
              <h4 className="text-lg font-semibold mb-2 text-white">Health Tips</h4>
              {/* Updated list item text color */}
              <ul className="space-y-2 text-gray-400 text-sm">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <svg
                      // Updated check icon color
                      className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" 
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
