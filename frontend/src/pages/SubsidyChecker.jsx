/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { IndianRupee, MapPin, Bell, ExternalLink, Coffee, Search, Leaf, TrendingUp } from "lucide-react";

// The JSON data you provided, mapped to include necessary display properties
const realSchemes = [
    {
        id: 1,
        crop: "coffee",
        title: "Integrated Coffee Development Project (ICDP)",
        description: "Implemented during the 15th Finance Commission cycle, this scheme supports farm mechanization, export/freight assistance, value addition, and R&G / curing units.",
        link: "https://coffeeboard.gov.in/15th-comission.html",
        icon: Leaf, // General development icon
        eligibility: 'ELIGIBLE', // Assume eligible for all schemes in this static list
        amount: "Varied Subsidies",
        color: "text-green-400 border-green-700/50"
    },
    {
        id: 2,
        crop: "coffee",
        title: "Support for Value Addition: R & G Units",
        description: "Provides subsidy support for establishing Roast & Ground (R&G) units and other value-addition machinery for coffee.",
        link: "https://coffeeboard.gov.in/Schemes/NotificationandmodalitiesforSupport%20of%20RUunits.pdf",
        icon: Coffee, // Specific coffee icon
        eligibility: 'ELIGIBLE',
        amount: "Subsidy Support",
        color: "text-green-400 border-green-700/50"
    },
    {
        id: 3,
        crop: "coffee",
        title: "Development Support for Coffee in Traditional Areas",
        description: "Scheme to improve production and productivity in traditional coffee growing areas through support and interventions.",
        link: "https://www.myscheme.gov.in/schemes/dsctar",
        icon: TrendingUp, // Productivity focus icon
        eligibility: 'ELIGIBLE',
        amount: "Targeted Support",
        color: "text-green-400 border-green-700/50"
    },
    {
        id: 4,
        crop: "pepper",
        title: "Post Harvest Improvement Programme (Spices Board)",
        description: "Provides subsidy (50%) for pepper cleaning/grading machines, ladders, and other post-harvest infrastructure up to specified ceilings.",
        link: "https://www.indianspices.com/post-harvest-improvement-programme.html",
        icon: IndianRupee, // Financial focus icon
        eligibility: 'ELIGIBLE',
        amount: "50% Subsidy",
        color: "text-green-400 border-green-700/50"
    },
    {
        id: 5,
        crop: "pepper",
        title: "Export Oriented Production & Post-Harvest Improvement",
        description: "Offers financial assistance for pepper cleaning / grading machines (50% subsidy, max ₹35,000) and ladders (50% cost, max ₹5,000).",
        link: "https://commerce.gov.in/wp-content/uploads/2020/03/Export-Oriented-Production-and-Postharvest-improvement.pdf",
        icon: IndianRupee,
        eligibility: 'ELIGIBLE',
        amount: "Max ₹35,000 Grant",
        color: "text-green-400 border-green-700/50"
    },
    {
        id: 6,
        crop: "pepper",
        title: "SPICED Scheme (Spices Board)",
        description: "‘Sustainability in Spice Sector...’ supports productivity, post-harvest quality, export promotion, capacity building over 2023–26.",
        link: "https://www.indianspices.com/box5_programmes_schemes.html",
        icon: Search, // General program icon
        eligibility: 'ELIGIBLE',
        amount: "Capacity Building",
        color: "text-green-400 border-green-700/50"
    }
];


const SubsidyCheckerPage = () => {
    // Use the new, clean scheme data
    const schemes = realSchemes;
    
    // Static details for a non-personalized summary
    const staticSummary = {
        primaryCrop: "Coffee",
        secondaryCrop: "Black Pepper",
        schemesFound: schemes.length
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-200 font-inter">
            <main className="max-w-7xl mx-auto px-6 py-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-extrabold text-white mb-2">
                        Agricultural Financial Schemes & Support
                    </h1>
                    <p className="text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-green-500" />
                        Schemes relevant to **Coffee** and **Black Pepper** cultivation in India.
                    </p>
                </motion.div>

                {/* Crop Focus Summary - Simplified due to removal of mockFarmerProfile */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 mb-10 grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                    <div className="border-r border-gray-700 pr-4">
                        <p className="text-sm font-medium text-gray-400">Primary Focus</p>
                        <p className="text-lg font-semibold text-white flex items-center"><Coffee className="w-5 h-5 mr-2 text-green-400" /> {staticSummary.primaryCrop}</p>
                    </div>
                    <div className="border-r border-gray-700 pr-4">
                        <p className="text-sm font-medium text-gray-400">Secondary Focus</p>
                        <p className="text-lg font-semibold text-white flex items-center"><Leaf className="w-5 h-5 mr-2 text-green-400" /> {staticSummary.secondaryCrop}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Total Schemes Listed</p>
                        <p className="text-lg font-semibold text-green-400">{staticSummary.schemesFound}</p>
                    </div>
                </motion.div>

                {/* Scheme List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white border-b border-green-600/50 pb-2">
                        Available Financial Support for Coffee & Pepper ({schemes.length} Schemes)
                    </h2>

                    {schemes.map((scheme, i) => (
                        <motion.div
                            key={scheme.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            className={`bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 ${scheme.color} flex justify-between items-start hover:shadow-green-500/20 transition-all`}
                        >
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <scheme.icon className={`w-5 h-5 mr-3 ${scheme.color}`} />
                                    {scheme.title}
                                </h3>
                                <div className="mt-2 text-sm font-medium text-gray-400 uppercase tracking-wider">
                                    Scheme Focus: <span className="text-white">{scheme.crop}</span>
                                </div>
                                <p className="text-lg font-semibold mt-2">
                                    <span className={scheme.color}>
                                        {scheme.amount}
                                    </span>
                                </p>
                                <p className="text-gray-400 text-sm mt-1">{scheme.description}</p>
                            </div>

                            <div className="flex-shrink-0 ml-6 text-right">
                                {/* Since there's no farmer profile, we'll mark all as generally applicable */}
                                <div 
                                    className={`px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-green-700/30 text-green-300`}
                                >
                                    ✅ Generally Applicable
                                </div>
                                <a 
                                    href={scheme.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center justify-end font-medium transition-colors"
                                >
                                    View Details & Apply
                                    <ExternalLink className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default SubsidyCheckerPage;