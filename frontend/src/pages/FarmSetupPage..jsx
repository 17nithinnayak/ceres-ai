/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion} from "framer-motion";
import { MapPin, Leaf } from "lucide-react";

export default function FarmSetupPage() {
  const [farmData, setFarmData] = useState({
    name: "",
    crop: "",
    location: "",
  });

  const crops = ["Robusta Coffee", "Arabica Coffee", "Black Pepper", "Arecanut", "Cardamom"];

  const handleChange = (e) => {
    setFarmData({ ...farmData, [e.target.name]: e.target.value });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setFarmData({ ...farmData, location: `${latitude}, ${longitude}` });
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Saving farm details:", farmData);
    // Example POST request
    await fetch("/api/v1/farms/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(farmData),
    });
    alert("Farm setup complete! 🎉");
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
          Let’s Set Up Your First Farm
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Personalize your CeresAI experience with your farm details
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Farm Name</label>
            <input
              name="name"
              value={farmData.name}
              onChange={handleChange}
              placeholder="Ponnampet Estate"
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white shadow-inner focus:border-green-600 focus:ring-1 focus:ring-green-600 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Primary Crop</label>
            <select
              name="crop"
              value={farmData.crop}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white focus:border-green-600 focus:ring-1 focus:ring-green-600"
              required
            >
              <option value="">Select Crop</option>
              {crops.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">Location</label>
            <div className="flex space-x-2">
              <input
                name="location"
                value={farmData.location}
                onChange={handleChange}
                placeholder="Latitude, Longitude"
                className="w-full px-4 py-3 rounded-xl border border-gray-700 bg-gray-900 text-white focus:border-green-600 focus:ring-1 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={handleLocation}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white flex items-center space-x-1"
              >
                <MapPin className="w-4 h-4" />
                <span>Use My Location</span>
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-600/30 transition-all duration-300"
          >
            Save & Continue →
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
