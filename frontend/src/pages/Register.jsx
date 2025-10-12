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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-900">
      {/* Logo Header */}
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <Leaf className="text-green-700" />
        <span className="text-xl font-semibold text-green-800">CERESAI</span>
      </div>

      {/* Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-lg border border-green-100 w-full max-w-md p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-green-800">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Start your journey with AI-powered plant health monitoring
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Farmer"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="farmer@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Create Account
          </motion.button>

          <div className="text-center text-sm text-gray-500">
            Already have an account?
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 border border-green-200 rounded-xl hover:bg-green-50 text-green-700 font-medium transition"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>

      {/* Footer Info */}
      <div className="mt-8 text-sm text-gray-500 text-center">
        © 2025 CeresAI – Empowering Smart Farming with AI
      </div>
    </div>
  );
}
