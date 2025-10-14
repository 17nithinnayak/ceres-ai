/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { IndianRupee, MapPin, Bell, ExternalLink, Coffee, Search } from "lucide-react";

const mockFarmerProfile = {
    name: "Coorg Farmer",
    location: "Madikeri, Kodagu District",
    primaryCrop: "Coffee (Robusta)",
    secondaryCrop: "Black Pepper",
    totalAcreage: 15,
    diseaseStatus: "HIGH_RISK_LEAF_RUST"
};

const SubsidyCheckerPage = () => {
    
    const schemes = [
        { 
            id: 1,
            name: "Weather-Based Crop Insurance (PMFBY)", 
            eligibility: mockFarmerProfile.diseaseStatus.includes("RISK") ? 'ELIGIBLE' : 'CHECKING',
            amount: "Claim Filing Alert",
            detail: "Our diagnostics suggest an event (Leaf Rust Spike) that may qualify for an immediate loss claim.",
            link: "https://mocklink.gov.in/PMFBY",
            icon: Bell,
            color: "text-red-400 border-red-700/50"
        },
        { 
            id: 2,
            name: "Horticulture Equipment Subsidy (Sprayers)", 
            eligibility: 'ELIGIBLE', 
            amount: "15% Grant (Max ₹5,000)",
            detail: "State subsidy for purchasing new spraying equipment for disease management.",
            link: "https://mocklink.gov.in/HortiEquip",
            icon: IndianRupee,
            color: "text-green-400 border-green-700/50"
        },
        { 
            id: 3,
            name: "Black Pepper Replanting Grant", 
            eligibility: mockFarmerProfile.secondaryCrop.includes("Pepper") ? 'ELIGIBLE' : 'NOT_APPLICABLE',
            amount: "₹10,000 per Acre",
            detail: "Central scheme for replanting and rejuvenation of pepper vines affected by Foot Rot.",
            link: "https://mocklink.gov.in/PepperReplant",
            icon: Coffee,
            color: "text-green-400 border-green-700/50"
        },
        { 
            id: 4,
            name: "Bio-Fertilizer Procurement Grant", 
            eligibility: 'CHECKING', 
            amount: "Varies by Supplier",
            detail: "Subsidy for promoting the use of organic bio-fertilizers post-monsoon.",
            link: "https://mocklink.gov.in/BioFert",
            icon: Search,
            color: "text-yellow-400 border-yellow-700/50"
        },
    ];

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
                        Financial Schemes & Support
                    </h1>
                    <p className="text-gray-400 flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-red-500" />
                        Personalized eligibility for {mockFarmerProfile.location}.
                    </p>
                </motion.div>

                {/* Farmer Profile Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 mb-10 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    <div className="border-r border-gray-700 pr-4">
                        <p className="text-sm font-medium text-gray-400">Primary Crop</p>
                        <p className="text-lg font-semibold text-white">{mockFarmerProfile.primaryCrop}</p>
                    </div>
                    <div className="border-r border-gray-700 pr-4">
                        <p className="text-sm font-medium text-gray-400">Total Area</p>
                        <p className="text-lg font-semibold text-white">{mockFarmerProfile.totalAcreage} Acres</p>
                    </div>
                    <div className="border-r border-gray-700 pr-4">
                        <p className="text-sm font-medium text-gray-400">Current Alert</p>
                        <p className="text-lg font-semibold text-red-400">{mockFarmerProfile.diseaseStatus.replace(/_/g, ' ')}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400">Next Review</p>
                        <p className="text-lg font-semibold text-green-400">Jan 15, 2026</p>
                    </div>
                </motion.div>

                {/* Scheme List */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white border-b border-green-600/50 pb-2">
                        Your Available Financial Support ({schemes.filter(s => s.eligibility === 'ELIGIBLE').length} Schemes Active)
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
                                    {scheme.name}
                                </h3>
                                <p className="text-lg font-semibold mt-2">
                                    <span className={scheme.color}>
                                        {scheme.amount}
                                    </span>
                                </p>
                                <p className="text-gray-400 text-sm mt-1">{scheme.detail}</p>
                            </div>

                            <div className="flex-shrink-0 ml-6 text-right">
                                <div 
                                    className={`px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                                        scheme.eligibility === 'ELIGIBLE' ? 'bg-green-700/30 text-green-300' :
                                        scheme.eligibility === 'CHECKING' ? 'bg-yellow-700/30 text-yellow-300' :
                                        'bg-gray-700/30 text-gray-300'
                                    }`}
                                >
                                    {scheme.eligibility === 'ELIGIBLE' ? '✅ Eligible' : 
                                     scheme.eligibility === 'CHECKING' ? '⏳ Checking' : 
                                     '✖️ N/A'}
                                </div>
                                <a 
                                    href={scheme.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center justify-end font-medium transition-colors"
                                >
                                    View & Apply
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