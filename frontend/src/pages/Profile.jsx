/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-900">
      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-lg border border-green-100 p-10"
        >
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-gray-100 pb-6 mb-8">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl font-bold">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <button className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full shadow hover:bg-green-600 transition">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536M9 13l6.293-6.293a1 1 0 011.414 0l1.586 1.586a1 1 0 010 1.414L12 16H9v-3z"
                    />
                  </svg>
                </button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">John Farmer</h2>
                <p className="text-gray-600">john.farmer@example.com</p>
                <p className="text-gray-500">📍 California, USA</p>
                <p className="text-gray-400 text-sm">Joined January 2024</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6 md:mt-0">
              <button className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition">
                Edit Profile
              </button>
              <button className="bg-red-500 text-white px-5 py-2 rounded-lg shadow hover:bg-red-600 transition">
                Log Out
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
                className="bg-green-50 rounded-2xl p-5 shadow-sm border border-green-100"
              >
                <h3 className="text-2xl font-bold text-green-700">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Personal Info + Recent Activity */}
          <div className="grid md:grid-cols-3 gap-10">
            {/* Left: Personal Info & Recent Activity */}
            <div className="md:col-span-2 space-y-10">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ["Full Name", "John Farmer"],
                    ["Email", "john.farmer@example.com"],
                    ["Location", "California, USA"],
                    ["Farm Size", "50 acres"],
                    ["Primary Crops", "Tomatoes, Wheat, Corn"],
                  ].map(([label, value], i) => (
                    <div key={i}>
                      <label className="text-sm font-medium text-gray-500">{label}</label>
                      <input
                        type="text"
                        value={value}
                        readOnly
                        className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-gray-700"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    ["Scanned Tomato Plant", "Healthy", "2 hours ago"],
                    ["Scanned Wheat Crop", "Issue Detected", "5 hours ago"],
                    ["Scanned Corn Stalk", "Healthy", "1 day ago"],
                    ["Updated Profile", "Completed", "3 days ago"],
                  ].map(([title, status, time], i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800">{title}</h4>
                        <p className="text-sm text-gray-500">{time}</p>
                      </div>
                      <span
                        className={`text-sm font-medium px-3 py-1 rounded-full ${
                          status === "Healthy"
                            ? "bg-green-100 text-green-700"
                            : status === "Issue Detected"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
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
              <div className="bg-green-50 p-5 rounded-2xl shadow-sm border border-green-100">
                <h4 className="font-semibold text-gray-700 mb-2">Tips</h4>
                <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                  <li>Scan plants regularly for better tracking</li>
                  <li>Keep farm size data updated</li>
                  <li>Use voice notes for quick logs</li>
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
