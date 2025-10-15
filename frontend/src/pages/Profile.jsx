/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Leaf, LogOut, Edit, X } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Example user data (can be fetched dynamically)
  const [userData, setUserData] = useState({
    name: "John Farmer",
    email: "john.farmer@example.com",
  });

  const [editedData, setEditedData] = useState(userData);

  const handleLogout = () => {
    localStorage.removeItem("supabase.auth.token");
    setIsOpen(false);
    navigate("/login");
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData(userData);
  };

  const handleSaveChanges = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 font-inter">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800 rounded-3xl shadow-xl border border-gray-700 p-10 hover:shadow-green-500/30 transition-shadow"
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:justify-between border-b border-gray-700 pb-6 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-green-900/50 flex items-center justify-center border-4 border-gray-800 shadow-md">
                <Leaf className="w-12 h-12 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                <p className="text-gray-400">{userData.email}</p>
              </div>
            </div>

            <div className="flex flex-row gap-3 mt-6 sm:mt-0">
              {/* Edit Button */}
              <button
                onClick={handleEditClick}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-xl shadow-lg shadow-green-600/30 hover:bg-green-700 transition transform hover:-translate-y-0.5"
              >
                <Edit size={18} />
                <span>Edit</span>
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-xl shadow-lg shadow-red-600/30 hover:bg-red-700 transition transform hover:-translate-y-0.5"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
            {[
              { label: "Total Scans", value: "48" },
              { label: "Accuracy", value: "94%" },
              { label: "Farm Size", value: "50 acres" },
              { label: "Active Days", value: "23" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-700 rounded-2xl p-5 shadow-sm border border-gray-600 cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-green-400">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="font-semibold text-xl mb-4 text-white border-l-4 border-green-600 pl-3">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                ["Tomato Scan", "Healthy", "2 hours ago"],
                ["Wheat Scan", "Issue", "5 hours ago"],
                ["Corn Scan", "Healthy", "1 day ago"],
              ].map(([title, status, time], i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center bg-gray-700 border border-gray-600 rounded-xl p-4 shadow-sm"
                >
                  <div>
                    <h4 className="font-medium text-gray-200">{title}</h4>
                    <p className="text-sm text-gray-400">{time}</p>
                  </div>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      status === "Healthy"
                        ? "bg-green-900/50 text-green-300"
                        : "bg-yellow-900/50 text-yellow-300"
                    }`}
                  >
                    {status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-2xl border border-gray-700 p-8 shadow-lg max-w-md w-full text-gray-200"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-green-400">
                Edit Profile
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-red-400 transition"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-gray-400">Name</label>
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-gray-400">Email</label>
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) =>
                    setEditedData({ ...editedData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Profile;