/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 text-gray-900">
   

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-28">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Empowering Farmers{" "}
            <span className="text-green-600">With AI Technology</span>
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
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
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              We believe every farmer deserves access to advanced agricultural
              technology. Our mission is to make plant disease detection
              accessible, affordable, and accurate for farmers worldwide.
            </p>
            <p className="text-gray-700">
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
            className="bg-green-100 rounded-3xl h-80 flex items-center justify-center shadow-lg"
          >
            <div className="w-24 h-24 border-8 border-green-400 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-green-500 rounded-full" />
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
          <h2 className="text-2xl font-bold mb-12">Our Values</h2>
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
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all"
              >
                <div className="w-16 h-16 bg-green-500 text-white text-3xl flex items-center justify-center rounded-full mx-auto mb-4">
                  {val.icon}
                </div>
                <h4 className="text-xl font-bold mb-2">{val.title}</h4>
                <p className="text-gray-600">{val.desc}</p>
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
          <h2 className="text-2xl font-bold mb-12">Our Technology</h2>
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
                className="bg-white border border-green-100 rounded-2xl p-8 text-left shadow-md hover:shadow-lg transition-all"
              >
                <h4 className="text-xl font-semibold text-green-700 mb-3">
                  {tech.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tech.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-10 mt-12 flex-wrap text-green-700 font-bold">
            <div>
              <span className="text-3xl">10,000+</span>
              <p className="text-gray-600 font-medium">Active Farmers</p>
            </div>
            <div>
              <span className="text-3xl">50,000+</span>
              <p className="text-gray-600 font-medium">Plants Diagnosed</p>
            </div>
            <div>
              <span className="text-3xl">98%</span>
              <p className="text-gray-600 font-medium">Accuracy Rate</p>
            </div>
            <div>
              <span className="text-3xl">24/7</span>
              <p className="text-gray-600 font-medium">Availability</p>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-green-600 text-white rounded-3xl py-16 px-8 text-center shadow-xl"
        >
          <h3 className="text-3xl font-bold mb-4">Join Our Community</h3>
          <p className="text-lg mb-8 opacity-90">
            Be part of the agricultural revolution. Start using CERESAI today
            and transform how you care for your crops.
          </p>
          <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-green-50 transition-transform hover:scale-105">
            Get Started Free
          </button>
        </motion.section>
      </main>

      {/* Footer */}
      
    </div>
  );
};

export default About;
