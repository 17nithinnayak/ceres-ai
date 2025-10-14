

/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react"; 

// IMPORT the custom components
import DiseaseRiskWidget from '../components/DiseaseRiskWidget'; 
import CoorgDiseaseMap from '../components/DiseaseMap.jsx'; 


const Dashboard = () => {
  const stats = [
    { label: "Total Scans (Plot 1)", value: 48, change: "+12%" },
    { label: "Healthy Plants", value: 42, change: "+8%" },
    { label: "Issues Detected", value: 6, change: "-15%" },
    { label: "Success Rate", value: "94%", change: "+5%" },
  ];

  const scans = [
    { name: "Coffee - Plot 1A", time: "2 hours ago", status: "Healthy", color: "green" },
    { name: "Pepper - Plot 2B", time: "5 hours ago", status: "Leaf Spot", color: "red" },
    { name: "Coffee - Plot 1A", time: "1 day ago", status: "Healthy", color: "green" },
    { name: "Pepper - Plot 2B", time: "2 days ago", status: "Foot Rot", color: "red" },
  ];

  const tips = [
    "**Coorg Alert:** High humidity is spiking Leaf Rust risk in the North zone.",
    "Ensure proper drainage in pepper plots to prevent Foot Rot.",
    "Apply bio-fertilizers post-monsoon for maximum yield.",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 font-inter">
      
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-extrabold text-white mb-2">
            Welcome back, <span className="text-green-400">Coorg Farmer!</span>
          </h1>
          <p className="text-gray-400">
            Monitoring Coffee & Pepper Health in the Western Ghats
          </p>
        </motion.div>

        {/* --- 1. FEATURE INTEGRATION: DISEASE RISK WIDGET (Feature 1: Proactive AI) --- */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mb-12"
        >
            <DiseaseRiskWidget userLocation="Madikeri, Coorg" />
        </motion.div>
        
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-700 hover:shadow-green-500/30 hover:scale-[1.02] transition-all"
            >
              <h2 className="text-4xl font-bold text-green-400 mb-2">
                {s.value}
              </h2>
              <p className="text-gray-400 font-medium">{s.label}</p>
              <p
                className={`text-sm font-semibold mt-2 ${
                  s.change.includes("+") ? "text-green-400" : "text-red-400" 
                }`}
              >
                {s.change}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Scans + Quick Actions + MAP */}
        <div className="grid md:grid-cols-3 gap-10">
            {/* --- 2. FEATURE INTEGRATION: DISEASE MAP (Feature 3: Geo-Tagging & Aggregation) --- */}
            <div className="md:col-span-2 order-2 md:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                    className="mb-8"
                >
                    {/* The working map component is used here */}
                    <CoorgDiseaseMap />
                </motion.div>
                
                {/* Recent Scans (Below the map/chart area - Feature 2: Real-time Diagnostics) */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">Latest Farm Scans</h3>
                    <a
                      href="/history"
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
                        className="bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-md border border-gray-700 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                              scan.color === "green"
                                ? "bg-green-900/50 text-green-300"
                                : "bg-red-900/50 text-red-300"
                            }`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">
                              {scan.name}
                            </h4>
                            <p className="text-gray-400 text-sm">{scan.time}</p>
                          </div>
                        </div>
                        <span
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

            {/* Quick Actions (Column 2) */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 md:order-2"
            >
                <h3 className="text-xl font-bold mb-4 text-white">Quick Actions</h3>
                <button 
                  // Connect this button to the /scan route from your Layout
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-green-600/30 mb-3 transition-transform hover:scale-[1.02]">
                  New Scan: Coffee/Pepper Leaf
                </button>
                <button className="w-full border border-green-600 text-green-400 hover:bg-green-900/50 font-semibold py-3 rounded-lg transition-colors">
                  View Full History
                </button>

                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2 text-white">Local CERES Tips</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                      {tips.map((tip, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <svg className="w-4 h-4 mt-1 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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