
// /* eslint-disable no-unused-vars */
// import React from "react";
// import { motion } from "framer-motion";
// import { Leaf } from "lucide-react";

// export default function Login() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Attempting sign in...");
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-200">
      
//       <div className="absolute top-8 left-8 flex items-center space-x-2">
//         <Leaf className="text-green-500" />
//         <span className="text-xl font-semibold text-white">CERESAI</span>
//       </div>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="bg-gray-800 rounded-3xl shadow-2xl shadow-green-900/50 border border-green-800 w-full max-w-md p-10"
//       >
//         <h2 className="text-3xl font-bold text-center mb-2 text-green-400">
//           Welcome Back, Farmer!
//         </h2>
//         <p className="text-center text-gray-400 mb-8">
//           Sign in to access your plant health dashboard
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-300">Email</label>
//             <input
//               type="email"
//               placeholder="farmer@example.com"
//               className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1 text-gray-300">Password</label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 focus:outline-none transition"
//               required
//             />
//           </div>

//           <motion.button
//             type="submit"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all duration-300"
//           >
//             Sign In
//           </motion.button>

//           <div className="text-center text-sm text-gray-500 pt-2">
//             Don't have an account?
//           </div>

//           <motion.button
//             type="button"
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             className="w-full py-3 border border-green-700 rounded-xl hover:bg-gray-700 text-green-400 font-medium transition"
//           >
//             Create Account
//           </motion.button>
//         </form>
//       </motion.div>
//       <div className="mt-8 text-sm text-gray-600 text-center">
//         © 2025 CeresAI – AI-powered crop health monitoring
//       </div>
//     </div>
//   );
// }

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import supabase from "../supabaseClient"; // make sure path is correct
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Attempting sign in...", formData);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
      console.log("Attempting login with:", formData.email, formData.password);

    setLoading(false);
    

    if (error) {
      console.error("Login error:", error);
      alert(`Login failed: ${error.message}`);
    } else {
      console.log("Login success:", data);
      // redirect to your dashboard or farm setup page
      navigate("/");
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
          Welcome Back, Farmer!
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Sign in to access your plant health dashboard
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

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all duration-300"
          >
            {loading ? "Signing in..." : "Sign In"}
          </motion.button>

          <div className="text-center text-sm text-gray-500 pt-2">
            Don't have an account?
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/register")}
            className="w-full py-3 border border-green-700 rounded-xl hover:bg-gray-700 text-green-400 font-medium transition"
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
      <div className="mt-8 text-sm text-gray-600 text-center">
        © 2025 CeresAI – AI-powered crop health monitoring
      </div>
    </div>
  );
}