/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Leaf } from "lucide-react";

export default function Login() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex flex-col lg:flex-row transition-colors duration-500 bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        
        {/* Left Section - Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16 relative"
        >
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-6 bg-green-100 dark:bg-gray-700 text-green-700 dark:text-yellow-300 p-2 rounded-full shadow hover:shadow-lg transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Logo */}
          <div className="flex items-center mb-6 space-x-2">
            <Leaf className="text-green-600 dark:text-green-400" />
            <span className="text-xl font-semibold">CERESAI</span>
          </div>

          {/* Welcome Text */}
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Sign in to access your plant diagnosis dashboard
          </p>

          {/* Form */}
          <form className="w-full max-w-md space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="farmer@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              Sign In
            </motion.button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-green-50 dark:hover:bg-gray-800 transition"
            >
              Create Account
            </motion.button>
          </form>
        </motion.div>

        {/* Right Section - Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col justify-center px-12 py-16 bg-green-100 dark:bg-gray-800"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Leaf className="text-green-600 dark:text-green-400" />
            <span className="font-semibold text-green-700 dark:text-green-300">
              AI-Powered
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Diagnose Plant{" "}
            <span className="text-green-600 dark:text-green-400">
              Diseases Instantly
            </span>
          </h1>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            Access your personalized dashboard to track plant health, view
            diagnosis history, and get expert recommendations.
          </p>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {[
              "Instant offline AI diagnosis",
              "Detailed online expert analysis",
              "Complete diagnosis history",
              "Voice note support",
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-600 dark:text-green-400">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
