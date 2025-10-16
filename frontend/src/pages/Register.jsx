import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      // Step 1️⃣ — Register the user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(`Registration failed: ${error.message}`);
        return;
      }

      console.log("User registered:", data);

      // Step 2️⃣ — Immediately sign them in (Supabase doesn’t auto-login after signup)
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) {
        alert(`Login failed after signup: ${loginError.message}`);
        return;
      }

      console.log("Login success:", loginData);

      // Step 3️⃣ — Save Bearer token locally
      const token = loginData.session?.access_token;
      if (token) {
        localStorage.setItem("token", token);
        console.log("✅ Token saved:", token);
      } else {
        console.warn("⚠️ No token received from Supabase");
      }

      // Step 4️⃣ — Navigate to next page (authenticated route)
      alert("Account created successfully!");
      navigate("/farmsetup");
    } catch (err) {
      console.error("Error signing up:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-200">
      <div className="absolute top-8 left-8 flex items-center space-x-2">
        <Leaf className="text-green-500" />
        <span className="text-xl font-semibold text-white">CERESAI</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gray-800 rounded-3xl shadow-2xl shadow-green-900/50 border border-green-800 w-full max-w-md p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-green-400">
          Create Your Account
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Start your journey with AI-powered plant health monitoring
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
            <input
              name="email"
              type="email"
              placeholder="farmer@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
