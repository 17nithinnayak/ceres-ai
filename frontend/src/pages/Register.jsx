/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Leaf } from "lucide-react";

export default function RegisterPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen flex transition-colors duration-500 bg-green-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-1/2 hidden lg:flex flex-col justify-center px-16 bg-green-100 dark:bg-gray-800"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Leaf className="text-green-600 dark:text-green-400" />
            <span className="font-semibold text-green-700 dark:text-green-300">
              Join CERESAI
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Start Protecting{" "}
            <span className="text-green-600 dark:text-green-400">
              Your Crops Today
            </span>
          </h1>
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            Create your free account and get instant access to AI-powered plant
            disease detection. Works offline and online.
          </p>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            {[
              "Free forever - no credit card required",
              "98% accurate AI diagnosis",
              "Works offline with TensorFlow Lite",
              "Expert analysis when online",
              "Complete diagnosis history",
            ].map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-green-600 dark:text-green-400">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16"
        >
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute top-6 right-6 bg-green-100 dark:bg-gray-700 text-green-700 dark:text-yellow-300 p-2 rounded-full shadow hover:shadow-lg transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="flex items-center mb-6 space-x-2">
            <Leaf className="text-green-600 dark:text-green-400" />
            <span className="text-xl font-semibold">CERESAI</span>
          </div>

          <h2 className="text-3xl font-bold mb-2">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start your journey with AI-powered farming
          </p>

          <form className="w-full max-w-md space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Farmer"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
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
              Create Account
            </motion.button>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-green-50 dark:hover:bg-gray-800 transition"
            >
              Sign In
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
