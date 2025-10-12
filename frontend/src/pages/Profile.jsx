/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Edit, LogOut, Leaf, Camera } from "lucide-react"; // Added lucide icons for better visual consistency

const Profile = () => {
  return (
    // Set a consistent light background
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Adjusted for dark mode compatibility
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-green-200 dark:border-gray-700 p-8 sm:p-10"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center space-x-6">
              <div className="relative mb-4 sm:mb-0">
                {/* Profile Picture Placeholder - Using Leaf Icon for Branding */}
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-700 flex items-center justify-center text-green-700 dark:text-white text-4xl font-bold border-4 border-white dark:border-gray-800 shadow-md">
                  <Leaf className="w-12 h-12 text-green-700 dark:text-green-300" />
                </div>
                {/* Edit Photo Button */}
                <button 
                  className="absolute bottom-0 right-0 bg-green-700 text-white p-2 rounded-full shadow-lg hover:bg-green-800 transition transform hover:scale-105"
                  aria-label="Edit profile picture"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">John Farmer</h2>
                <p className="text-gray-600 dark:text-gray-400">john.farmer@example.com</p>
                <p className="text-gray-500 dark:text-gray-500">📍 California, USA</p>
                <p className="text-gray-400 dark:text-gray-600 text-sm">Joined January 2024</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0 w-full sm:w-auto">
              <button 
                // Updated to green-700, matching the theme
                className="flex items-center justify-center space-x-2 bg-green-700 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-green-800 transition transform hover:-translate-y-0.5"
              >
                <Edit size={18} />
                <span>Edit Profile</span>
              </button>
              <button 
                className="flex items-center justify-center space-x-2 bg-red-600 text-white px-5 py-2 rounded-xl shadow-lg hover:bg-red-700 transition transform hover:-translate-y-0.5"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
            {[
              { label: "Total Scans", value: "48" },
              { label: "Success Rate", value: "94%" },
              { label: "Farm Size", value: "50 acres" },
              { label: "Active Days", value: "23" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                // Adjusted for dark mode consistency
                className="bg-green-50 dark:bg-gray-700 rounded-2xl p-5 shadow-sm border border-green-100 dark:border-gray-600 cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-300">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Personal Info + Recent Activity */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left: Personal Info & Recent Activity */}
            <div className="md:col-span-2 space-y-10">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-200 border-l-4 border-green-700 pl-3">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    ["Full Name", "John Farmer"],
                    ["Email", "john.farmer@example.com"],
                    ["Location", "California, USA"],
                    ["Farm Size", "50 acres"],
                    ["Primary Crops", "Tomatoes, Wheat, Corn"],
                  ].map(([label, value], i) => (
                    <div key={i}>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
                      <input
                        type="text"
                        value={value}
                        readOnly
                        className="w-full mt-1 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-200 border-l-4 border-green-700 pl-3">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    ["Scanned Tomato Plant", "Healthy", "2 hours ago"],
                    ["Scanned Wheat Crop", "Issue Detected", "5 hours ago"],
                    ["Scanned Corn Stalk", "Healthy", "1 day ago"],
                    ["Updated Profile", "Completed", "3 days ago"],
                  ].map(([title, status, time], i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)" }}
                      // Adjusted for dark mode consistency
                      className="flex justify-between items-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-4 shadow-sm"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">{title}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
                      </div>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          status === "Healthy"
                            // Using green-700 for better visibility
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : status === "Issue Detected"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar (Optional: Add extra info or tips) */}
            <div className="space-y-6">
              <div 
                // Adjusted for dark mode consistency and theme color
                className="bg-green-100 dark:bg-green-900 p-5 rounded-2xl shadow-lg border border-green-200 dark:border-green-800"
              >
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-green-200 dark:border-green-800 pb-2">Pro Tips</h4>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-2">
                  <li>Scan plants regularly for better tracking.</li>
                  <li>Keep farm size data updated for accurate insights.</li>
                  <li>Use voice notes for quick field logging.</li>
                  <li>Check the **Dashboard** for predictive insights.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
