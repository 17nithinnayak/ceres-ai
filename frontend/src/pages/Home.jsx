/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

// Renamed the component from 'Home' to 'App' to conform to single-file React app convention.
const App = () => {
    const images = [
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80", // coffee beans close-up
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80", // coffee berries on branch
      "https://images.unsplash.com/photo-1587574293340-e04ec70b0b6b?auto=format&fit=crop&w=1200&q=80", // pepper vines
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80", // Coorg farmer in plantation
      "https://images.unsplash.com/photo-1562887088-9a4c0e4b8b52?auto=format&fit=crop&w=1200&q=80", // hand holding coffee branch
      "https://images.unsplash.com/photo-1615486365653-9f4a50d48c2f?auto=format&fit=crop&w=1200&q=80", // coffee plantation aerial
      "https://images.unsplash.com/photo-1605810230434-763b1b5a1e6f?auto=format&fit=crop&w=1200&q=80", // AI + agriculture theme
      "https://images.unsplash.com/photo-1622662922773-0b45bb5fbbab?auto=format&fit=crop&w=1200&q=80", // pepper drying
];
    return (
      
      // 1. Changed primary gradient to be lighter and more subtle, though the image mostly looks white.
      <div className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-white text-gray-900">
        

        {/* Main */}
       <main className="max-w-7xl mx-auto px-6 py-16">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Pill Badge: Using a very light background and a darker text shade */}
            <div className="inline-flex items-center bg-green-50 text-green-700 px-4 py-2 rounded-full font-semibold text-sm mb-6">
              🌿 AI-Powered Plant Diagnosis
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-3">
              Protect Your Crops{" "}
              {/* 2. Changed accent green to a darker shade for better visual match */}
              <span className="text-green-700">with AI Technology</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Instantly diagnose plant diseases using your smartphone. Works
              offline with TensorFlow Lite and provides expert analysis when
              online.
            </p>
            <div className="flex justify-center space-x-4">
              {/* 3. Changed main button color to the darker, more vibrant green */}
              <button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform hover:scale-105">
                Get Started Free →
              </button>
              {/* 4. Changed 'Learn More' button border/text to match new accent shade */}
              <button className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>

          {/* Image Carousel - Shadow on Hover */}
          <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto mb-20"
      >
        <div 
          // Removed static shadow, added transition and hover shadow
          className="bg-white/80 backdrop-blur-md rounded-3xl border border-green-100 p-8 overflow-hidden transition-shadow hover:shadow-xl hover:shadow-green-700/50"
        >
          {/* Continuous horizontal scroll */}
          <motion.div
            className="flex gap-8"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
          >
            {/* Duplicate array for infinite effect */}
            {[...images, ...images].map((src, index) => (
              <div
                key={index}
                className="min-w-[280px] h-[200px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0 border border-green-200 hover:shadow-green-300/50 transition-all duration-500"
              >
                <img
                  src={src}
                  alt={`ceres-ai-img-${index}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
            
          


          {/* Features - Realistic Effect Added */}
          <section className="text-center mb-20">
            <h3 className="text-3xl font-bold mb-6">
              Why Choose <span className="text-green-700">CERESAI?</span>
            </h3>
            <p className="text-gray-600 mb-12">
              Powerful features designed specifically for modern farmers
            </p>

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
                  // Added slight scale and lift on hover
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-2xl p-8 transition-all duration-300 border border-green-200 shadow-sm hover:shadow-xl hover:shadow-green-700/40 hover:-translate-y-1"
                >
                  {/* 5. Changed accent circle background to the darker green */}
                  <div className="w-16 h-16 bg-green-700 text-white text-2xl flex items-center justify-center rounded-full mx-auto mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How It Works - Realistic Effect Added */}
          <section className="text-center mb-20">
            <h3 className="text-3xl font-bold mb-8">How It Works</h3>
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
                  // Added slight scale and lift on hover
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-xl p-6 transition-all duration-300 border border-green-200 shadow-sm hover:shadow-lg hover:shadow-green-700/30 hover:-translate-y-1"
                >
                  {/* 6. Changed accent number circle background to the darker green */}
                  <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {`0${i + 1}`}
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{title}</h4>
                  <p className="text-gray-600 text-sm">
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
          {/* 7. Changed CTA section background to the darker green */}
          <section className="bg-green-700 text-white rounded-3xl py-16 px-8 text-center shadow-xl">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Farming?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of farmers using AI to protect their crops and
              increase yields.
            </p>
            {/* 8. Changed button text to match new accent shade */}
            <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-transform hover:scale-105">
              Start Free Today
            </button>
          </section>
        </main>

      
        
      </div>
    
    );
};

export default App;
