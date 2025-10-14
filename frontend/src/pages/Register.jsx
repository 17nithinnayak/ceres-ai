/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Attempting account creation...");
  };

  return (
    // Dark theme background with subtle gradient for depth (deep gray to black)
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-200 ">
      
      {/* Logo Header (Top Left) */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <Leaf className="text-green-500" />
        <span className="text-xl font-semibold text-white">CERESAI</span>
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        // Card is dark gray, rounded, with a subtle border and shadow
        className="bg-gray-800 rounded-3xl shadow-2xl shadow-green-900/50 border border-green-800 w-full max-w-md p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-green-400">
          Create Your Account
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Start your journey with AI-powered plant health monitoring
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Full Name</label>
            <input
              type="text"
              placeholder="John Farmer"
              // Dark input field style
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input
              type="email"
              placeholder="farmer@example.com"
              // Dark input field style
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              // Dark input field style
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              // Dark input field style
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            // Vibrant primary green button
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all duration-300"
          >
            Create Account
          </motion.button>

          <div className="text-center text-sm text-gray-500 pt-2">
            Already have an account?
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            // Secondary button with border accent
            className="w-full py-3 border border-green-700 rounded-xl hover:bg-gray-700 text-green-400 font-medium transition"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>

      {/* Footer Info */}
      <div className="mt-8 text-sm text-gray-600 text-center">
        © 2025 CeresAI – Empowering Smart Farming with AI
      </div>
    </div>
  );
}
