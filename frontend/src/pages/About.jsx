/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    // Updated: Dark background gradient and light text for the entire page
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200">
      
      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-28">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
            Empowering Farmers{" "}
            {/* Updated to text-green-400 for contrast */}
            <span className="text-green-400">With AI Technology</span>
          </h1>
          {/* Updated text color */}
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            CERESAI combines cutting-edge artificial intelligence with
            practical farming needs to help farmers detect plant diseases early
            and take action quickly.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
            {/* Updated text color */}
            <p className="text-gray-400 mb-4">
              We believe every farmer deserves access to advanced agricultural
              technology. Our mission is to make plant disease detection
              accessible, affordable, and accurate for farmers worldwide.
            </p>
            {/* Updated text color */}
            <p className="text-gray-400">
              By leveraging TensorFlow Lite for offline capabilities and
              cloud-based AI for detailed analysis, we provide the best of both
              worlds — instant results even without internet, and expert
              insights when connected.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            // Updated: Dark background for the visual element container
            className="bg-gray-900 rounded-3xl h-80 flex items-center justify-center shadow-lg border border-green-700/50"
          >
            {/* Updated border and inner circle colors for dark theme contrast */}
            <div className="w-24 h-24 border-8 border-green-600/50 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-green-400 rounded-full" />
            </div>
          </motion.div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-12 text-white">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "⚡",
                title: "Innovation",
                desc: "We push the boundaries of what's possible with AI in agriculture.",
              },
              {
                icon: "🌍",
                title: "Accessibility",
                desc: "Making advanced technology available to all farmers, everywhere.",
              },
              {
                icon: "🎯",
                title: "Accuracy",
                desc: "Delivering reliable diagnoses farmers can trust and act on.",
              },
            ].map((val, i) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={i}
                // Updated: Dark card background and prominent shadow effect
                className="bg-gray-800 rounded-2xl shadow-xl p-8 transition-all border border-gray-700 hover:shadow-2xl hover:shadow-green-600/40"
              >
                {/* Updated icon background to green-600 */}
                <div className="w-16 h-16 bg-green-600 text-white text-3xl flex items-center justify-center rounded-full mx-auto mb-4">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold mb-2 text-white">{val.title}</h4>
                {/* Updated description text color */}
                <p className="text-gray-400">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-12 text-white">Our Technology</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Offline AI",
                desc: "Using TensorFlow Lite, our app runs sophisticated AI models directly on your device, enabling instant diagnoses even in remote areas without connectivity.",
              },
              {
                title: "Cloud Analysis",
                desc: "When online, images are analyzed via our backend API for deeper insights, treatment recommendations, and expert advice.",
              },
            ].map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                // Updated: Dark card background and border
                className="bg-gray-800 border border-gray-700 rounded-2xl p-8 text-left shadow-md hover:shadow-lg transition-all"
              >
                {/* Updated title color to green-400 */}
                <h4 className="text-xl font-semibold text-green-400 mb-3">
                  {tech.title}
                </h4>
                {/* Updated description text color */}
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-10 mt-12 flex-wrap text-green-400 font-bold">
            <div>
              <span className="text-3xl">10,000+</span>
              <p className="text-gray-500 font-medium">Active Farmers</p>
            </div>
            <div>
              <span className="text-3xl">50,000+</span>
              <p className="text-gray-500 font-medium">Plants Diagnosed</p>
            </div>
            <div>
              <span className="text-3xl">98%</span>
              <p className="text-gray-500 font-medium">Accuracy Rate</p>
            </div>
            <div>
              <span className="text-3xl">24/7</span>
              <p className="text-gray-500 font-medium">Availability</p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          // Updated: Dark CTA background with a strong accent border
          className="bg-gray-800 text-white rounded-3xl py-16 px-8 text-center shadow-xl border border-green-700/50"
        >
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-lg mb-8 opacity-80">
            Be part of the agricultural revolution. Start using CERESAI today
            and transform how you care for your crops.
          </p>
          {/* Updated button to primary green style */}
          <button className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-transform hover:scale-105 shadow-lg shadow-green-600/30">
            Get Started Free
          </button>
        </motion.section>
      </main>
    </div>
  );
};

export default About;
