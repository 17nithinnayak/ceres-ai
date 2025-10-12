/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Leaf, TrendingUp, Monitor, Zap, Droplet, Thermometer, Sprout, CloudSun, Cpu, Shield, Globe } from "lucide-react";

// --- HOOKS AND HELPER COMPONENTS ---

// Hook for counter animation (simulates data loading)
const useCounter = (endValue, duration = 2000) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTime;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const currentValue = Math.floor(percentage * endValue);
      setCount(currentValue);

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    controls.start(() => requestAnimationFrame(animate));
    
    // Cleanup function to stop animation loop
    return () => {
        // Stop the animation if the component unmounts
        startTime = null; 
    };

  }, [endValue, duration, controls]);

  return count;
};

// Component for a single animated metric card
const MetricCard = ({ icon: Icon, value, label, delay }) => {
  const displayedValue = useCounter(value);
  // Determines suffix based on label content
  const suffix = label.includes('Increase') ? '%' : (label.includes('Accuracy') ? '%' : '+');

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, delay: delay, ease: "easeOut" } }
  };

  return (
    <motion.div
      variants={cardVariants}
      className="flex flex-col items-center p-6 sm:p-8 bg-gray-800 rounded-2xl border border-green-700/50 shadow-xl shadow-gray-900/50 hover:shadow-green-600/30 transition-all duration-500 cursor-default"
    >
      <div className="p-3 rounded-full bg-green-600/20 text-green-400 mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tighter">
        {displayedValue.toLocaleString()}
        <span className="text-green-500 text-3xl ml-1">{suffix}</span>
      </div>
      <p className="text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider">{label}</p>
    </motion.div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  // Removed 'images' array

  return (
    // Dark theme with a subtle dark green gradient
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200">
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Pill Badge: Dark background, light text */}
          <div className="inline-flex items-center bg-gray-800 text-green-400 px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <Leaf className="w-4 h-4 mr-2" /> AI-Powered Plant Diagnosis
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-white">
            Protect Your Crops{" "}
            <span className="text-green-400">with AI Technology</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Instantly diagnose plant diseases using your smartphone. Works
            offline with TensorFlow Lite and provides expert analysis when
            online.
          </p>
          <div className="flex justify-center space-x-4">
            {/* Main button: Vibrant green, with a lift and shadow on hover */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform hover:shadow-green-500/50">
              Get Started Free →
            </motion.button>
            {/* Learn More button: Subtle outline with hover effect */}
            <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Learn More
            </motion.button>
          </div>
        </motion.div>
       <section className="py-12 md:py-16 bg-gray-950/50 rounded-3xl mb-20 border border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <p className="text-green-500 font-semibold mb-3 uppercase tracking-widest text-sm">
        Innovative. Accurate. Reliable.
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
        Why Choose <span className="text-green-400">CERESAI?</span>
      </h2>
      <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
        Powerful features designed specifically for modern farmers
      </p>
    </motion.div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-3 gap-10">
      {[
        {
          icon: "⚡",
          title: "Instant Results",
          desc: "Get plant diagnosis in seconds using offline AI.",
        },
        {
          icon: "🎯",
          title: "98% Accuracy",
          desc: "Advanced ML ensures precise disease detection.",
        },
        {
          icon: "📱",
          title: "Works Offline",
          desc: "TensorFlow Lite enables diagnosis without internet.",
        },
      ].map((item, idx) => (
        <motion.div
          key={idx}
          whileHover={{ scale: 1.03 }}
          className="bg-gray-800 rounded-2xl p-8 transition-all duration-300 border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-1"
        >
          <div className="w-16 h-16 bg-green-600 text-white text-2xl flex items-center justify-center rounded-full mx-auto mb-4">
            {item.icon}
          </div>
          <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
          <p className="text-gray-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>

  </div>
</section>




       
        {/* Features - Realistic Effect Added */}
        

        {/* How It Works - Realistic Effect Added */}
        <section className="text-center mb-20">
          <h3 className="text-3xl font-bold mb-8 text-white">How It Works</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              "Capture Image",
              "Add Voice Note",
              "AI Analysis",
              "Expert Review",
            ].map((title, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800 rounded-xl p-6 transition-all duration-300 border border-gray-700 shadow-lg hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {`0${i + 1}`}
                </div>
                <h4 className="font-semibold text-lg mb-2 text-white">{title}</h4>
                <p className="text-gray-400 text-sm">
                  {[
                    "Take a photo of your plant",
                    "Describe symptoms via voice",
                    "Get instant offline diagnosis",
                    "Receive expert online review",
                  ][i]}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gray-800 text-white rounded-3xl py-16 px-8 text-center shadow-xl border border-green-700/50">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Farming?
          </h3>
          <p className="text-lg mb-8 opacity-80">
            Join thousands of farmers using AI to protect their crops and
            increase yields.
          </p>
          <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-transform shadow-lg shadow-green-600/30">
            Start Free Today
          </motion.button>
        </section>
      </main>
    </div>
  );
};

export default App;
