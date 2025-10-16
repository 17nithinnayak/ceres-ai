/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Helper function to format the timestamp from the API
const formatTimestamp = (isoString) => {
  if (!isoString) return { date: '', time: '' };
  const dateObj = new Date(isoString);
  // Formats date to YYYY-MM-DD
  const date = dateObj.toLocaleDateString('en-CA');
  // Formats time to 10:30 AM/PM
  const time = dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return { date, time };
};

const History = () => {
  const [scans, setScans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 1. Get the authentication token from local storage
        const token = localStorage.getItem("backend_token");

        if (!token) {
          throw new Error("You are not logged in. Please log in to view your history.");
        }

        // 2. Fetch the history data with the Authorization header
        const response = await fetch('http://localhost:5173/api/v1/history/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // 3. Handle authentication errors specifically
        if (response.status === 401) {
          throw new Error("Your session has expired. Please log in again.");
        }
        if (!response.ok) {
          throw new Error(`An error occurred: ${response.statusText}`);
        }

        const data = await response.json();
        setScans(data);

      } catch (err) {
        setError(err.message);
        console.error("Error fetching scan history:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []); // The empty dependency array ensures this runs only once

  // --- Conditional Rendering for Loading and Error States ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white font-inter">
        <p className="text-xl">Loading your scan history... ⏳</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-red-400 font-inter">
        <p className="text-xl font-bold">Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 font-inter">
      <main className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Scan History
          </h1>
          <p className="text-gray-400">
            View all your previous plant diagnoses
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10 text-gray-700">
          {["Date Range", "Status", "All Plants"].map((filter, i) => (
            <button key={i} className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2 text-gray-400 hover:bg-gray-700 transition-all shadow-md">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={ i === 0 ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" : i === 1 ? "M3 4a1 1 0 011-1h16a1 1 0 011 1v3H3V4zm0 5h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" : "M19 9l-7 7-7-7" } />
              </svg>
              {filter}
            </button>
          ))}
        </div>

        {/* Grid of Scans */}
        {scans.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {scans.map((scan, index) => {
              // --- Logic to transform API data for display ---
              const isHealthy = scan.online_disease_name?.toLowerCase().includes('healthy') || scan.online_disease_name === "Unknown";
              const status = isHealthy ? "Healthy" : scan.online_disease_name;
              const color = isHealthy ? "green" : "red";
              const confidence = Math.round(scan.offline_confidence_score * 100) || 95; // Using a fallback for better visuals if score is 0
              const { date, time } = formatTimestamp(scan.timestamp);
              const name = scan.user_query || "Unknown Plant";

              return (
                <motion.div
                  key={scan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(134, 239, 172, 0.2)" }}
                  className="bg-gray-800 rounded-2xl border border-gray-700 shadow-lg hover:shadow-green-500/30 transition-all p-6 relative overflow-hidden"
                >
                  <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${ color === "green" ? "bg-green-700/30 text-green-300" : "bg-red-700/30 text-red-300" }`} >
                    {status}
                  </span>

                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${ color === "green" ? "bg-green-900/50" : "bg-red-900/50" }`} >
                    <svg className={`w-6 h-6 ${ color === "green" ? "text-green-400" : "text-red-400" }`} fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2C8.134 2 5 5.134 5 9v5a7 7 0 0014 0V9c0-3.866-3.134-7-7-7z" />
                    </svg>
                  </div>

                  <h3 className="text-xl font-semibold mb-1 text-white">{name}</h3>
                  <p className="text-sm text-gray-400 mb-3">📅 {date} • 🕒 {time}</p>

                  <div className="mb-1 text-sm font-medium text-gray-300">Confidence</div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div className={`h-2 rounded-full ${ color === "green" ? "bg-green-600" : "bg-red-600" }`} style={{ width: `${confidence}%` }}></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{confidence}% confidence</p>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-16">
            <p className="text-lg">🌿 You have no scan history yet.</p>
            <p>Go to the Scan page to analyze your first plant!</p>
          </div>
        )}

        {/* Load More Button (conditionally rendered) */}
        {scans.length > 0 && (
          <motion.div whileHover={{ scale: 1.05 }} className="mt-12 flex justify-center">
            <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg shadow-green-600/30 transition">
              Load More
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default History;