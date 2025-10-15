/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Leaf } from "lucide-react";

// Counter hook
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
      if (percentage < 1) requestAnimationFrame(animate);
    };
    controls.start(() => requestAnimationFrame(animate));
    return () => { startTime = null; };
  }, [endValue, duration, controls]);

  return count;
};

// Metric Card component
const MetricCard = ({ icon: Icon, value, label, delay }) => {
  const displayedValue = useCounter(value);
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

// 🔹 Home Component receives language as prop
const Home = ({ lang }) => {
  const translations = {
    en: {
      hero: {
        subtitle: "AI-Powered Plant Diagnosis",
        title: "Protect Your Crops with AI Technology",
        description: "Instantly diagnose plant diseases using your smartphone. Works offline with TensorFlow Lite and provides expert analysis when online.",
        cta1: "Get Started Free →",
        cta2: "Learn More",
      },
      why: {
        subtitle: "Innovative. Accurate. Reliable.",
        title: "Why Choose CERESAI?",
        description: "Powerful features designed specifically for modern farmers",
        cards: [
          { icon: "⚡", title: "Instant Results", desc: "Get plant diagnosis in seconds using offline AI." },
          { icon: "🎯", title: "98% Accuracy", desc: "Advanced ML ensures precise disease detection." },
          { icon: "📱", title: "Works Offline", desc: "TensorFlow Lite enables diagnosis without internet." },
        ]
      },
      how: {
        title: "How It Works",
        steps: [
          { step: "Capture Image", desc: "Take a photo of your plant" },
          { step: "Add Voice Note", desc: "Describe symptoms via voice" },
          { step: "AI Analysis", desc: "Get instant offline diagnosis" },
          { step: "Expert Review", desc: "Receive expert online review" },
        ]
      },
      ctaSection: {
        title: "Ready to Transform Your Farming?",
        description: "Join thousands of farmers using AI to protect their crops and increase yields.",
        button: "Start Free Today"
      },
    },
    kn: {
      hero: {
        subtitle: "ಎಐ ಶಕ್ತಿಯ ಹೊಂದಿರುವ ಸಸ್ಯ ರೋಗ ನಿರ್ಣಯ",
        title: "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ಎಐ ತಂತ್ರಜ್ಞಾನದಿಂದ ರಕ್ಷಿಸಿ",
        description: "ನಿಮ್ಮ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಬಳಸಿ ತಕ್ಷಣ ಸಸ್ಯ ರೋಗಗಳನ್ನು ನಿರ್ಣಯಿಸಿ. ಟೆನ್ಸರ್‌ಫ್ಲೋ ಲೈಟ್ ಬಳಸಿ ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ ಮತ್ತು ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ತಜ್ಞ ವಿಶ್ಲೇಷಣೆ ನೀಡುತ್ತದೆ.",
        cta1: "ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ →",
        cta2: "ಹೆಚ್ಚು ತಿಳಿದುಕೊಳ್ಳಿ",
      },
      why: {
        subtitle: "ನವೀನ. ನಿಖರ. ನಂಬಿಗಸ್ತ.",
        title: "ಯಾಕೆ CERESAI ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
        description: "ಆಧುನಿಕ ರೈತರಿಗೆ ವಿಶೇಷವಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಶಕ್ತಿಶಾಲಿ ವೈಶಿಷ್ಟ್ಯಗಳು",
        cards: [
          { icon: "⚡", title: "ತಕ್ಷಣ ಫಲಿತಾಂಶಗಳು", desc: "ಆಫ್‌ಲೈನ್ ಎಐ ಬಳಸಿ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ಸಸ್ಯ ನಿರ್ಣಯ ಪಡೆಯಿರಿ." },
          { icon: "🎯", title: "98% ನಿಖರತೆ", desc: "ಆಧುನಿಕ ಎಂಎಲ್ ನಿಖರ ರೋಗ ಪತ್ತೆ ಖಚಿತಪಡಿಸುತ್ತದೆ." },
          { icon: "📱", title: "ಆಫ್‌ಲೈನ್‌ನಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ", desc: "ಟೆನ್ಸರ್‌ಫ್ಲೋ ಲೈಟ್ ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ನಿರ್ಣಯವನ್ನು ಅನುಮತಿಸುತ್ತದೆ." },
        ]
      },
      how: {
        title: "ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ",
        steps: [
          { step: "ಚಿತ್ರ ಸೆರೆಹಿಡಿ", desc: "ನಿಮ್ಮ ಸಸ್ಯದ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ" },
          { step: "ವಾಯ್ಸ್ ನೋಟ್ ಸೇರಿಸಿ", desc: "ಲಕ್ಷಣಗಳನ್ನು ವಾಯ್ಸ್ ಮೂಲಕ ವರ್ಣಿಸಿ" },
          { step: "ಎಐ ವಿಶ್ಲೇಷಣೆ", desc: "ತಕ್ಷಣ ಆಫ್‌ಲೈನ್ ನಿರ್ಣಯ ಪಡೆಯಿರಿ" },
          { step: "ತಜ್ಞ ವಿಮರ್ಶೆ", desc: "ಆನ್‌ಲೈನ್ ತಜ್ಞ ವಿಮರ್ಶೆ ಪಡೆಯಿರಿ" },
        ]
      },
      ctaSection: {
        title: "ನಿಮ್ಮ ಕೃಷಿಯನ್ನು ರೂಪಾಂತರಿಸಲು ಸಿದ್ಧವೇ?",
        description: "ನಿಮ್ಮ ಬೆಳೆಗಳನ್ನು ರಕ್ಷಿಸಲು ಮತ್ತು ಉತ್ಪಾದನೆ ಹೆಚ್ಚಿಸಲು ಎಐ ಬಳಕೆ ಮಾಡುವ ಸಾವಿರಾರು ರೈತರೊಂದಿಗೆ ಸೇರಿ.",
        button: "ಇಂದೇ ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ"
      },
    },
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200">
      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center bg-gray-800 text-green-400 px-4 py-2 rounded-full font-semibold text-sm mb-6">
            <Leaf className="w-4 h-4 mr-2" /> {t.hero.subtitle}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-white">{t.hero.title}</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">{t.hero.description}</p>
          <div className="flex justify-center space-x-4">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-transform hover:shadow-green-500/50">
              {t.hero.cta1}
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              {t.hero.cta2}
            </motion.button>
          </div>
        </motion.div>

        {/* Why Choose Section */}
        <section className="py-12 md:py-16 bg-gray-950/50 rounded-3xl mb-20 border border-gray-800 shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <p className="text-green-500 font-semibold mb-3 uppercase tracking-widest text-sm">{t.why.subtitle}</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">{t.why.title}</h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">{t.why.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {t.why.cards.map((item, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.03 }}
                className="bg-gray-800 rounded-2xl p-8 transition-all duration-300 border border-gray-700 shadow-lg hover:shadow-xl hover:shadow-green-600/40 hover:-translate-y-1">
                <div className="w-16 h-16 bg-green-600 text-white text-2xl flex items-center justify-center rounded-full mx-auto mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold mb-2 text-white">{item.title}</h4>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="text-center mb-20">
          <h3 className="text-3xl font-bold mb-8 text-white">{t.how.title}</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {t.how.steps.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }} whileHover={{ scale: 1.03 }}
                className="bg-gray-800 rounded-xl p-6 transition-all duration-300 border border-gray-700 shadow-lg hover:shadow-lg hover:shadow-green-600/30 hover:-translate-y-1">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">{`0${i + 1}`}</div>
                <h4 className="font-semibold text-lg mb-2 text-white">{item.step}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-800 text-white rounded-3xl py-16 px-8 text-center shadow-xl border border-green-700/50">
          <h3 className="text-3xl font-bold mb-4">{t.ctaSection.title}</h3>
          <p className="text-lg mb-8 opacity-80">{t.ctaSection.description}</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-transform shadow-lg shadow-green-600/30">
            {t.ctaSection.button}
          </motion.button>
        </section>
      </main>
    </div>
  );
};

export default Home;