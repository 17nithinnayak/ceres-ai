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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-900">
   

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome back, <span className="text-green-600">Farmer!</span>
          </h1>
          <p className="text-gray-500">
            Here's an overview of your plant health monitoring
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center border border-green-100 hover:shadow-lg hover:scale-105 transition-all"
            >
              <h2 className="text-4xl font-bold text-green-700 mb-2">
                {s.value}
              </h2>
              <p className="text-gray-600 font-medium">{s.label}</p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  s.change.includes("+") ? "text-green-500" : "text-red-500"
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
              <h3 className="text-xl font-bold">Recent Scans</h3>
              <a
                href="#"
                className="text-green-600 font-medium hover:underline"
              >
                View All
              </a>
            </div>
            <div className="space-y-4">
              {scans.map((scan, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 flex justify-between items-center shadow-sm border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        scan.color === "green"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
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
                      <h4 className="font-semibold text-gray-800">
                        {scan.name}
                      </h4>
                      <p className="text-gray-500 text-sm">{scan.time}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      scan.color === "green"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
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
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          >
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-lg shadow-md mb-3 transition-transform hover:scale-105">
              New Scan
            </button>
            <button className="w-full border border-green-500 text-green-700 hover:bg-green-50 font-semibold py-3 rounded-lg transition-colors">
              View History
            </button>

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Health Tips</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                {tips.map((tip, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <svg
                      className="w-4 h-4 text-green-500"
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
