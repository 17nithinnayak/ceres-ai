/* eslint-disable no-unused-vars */

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Coffee, Truck, ArrowUp, ArrowDown } from "lucide-react";

const MOCK_MARKET_DATA = {
    coffeeRobusta: {
        currentPrice: 205.50, // Price in ₹ per kg
        unit: "₹/kg",
        trend: 4.2, // Percentage change over last week
        status: "UP",
        futures: [
            { month: "Dec '25", price: 208.00 },
            { month: "Jan '26", price: 204.50 },
            { month: "Feb '26", price: 211.50 },
        ],
        demand: "High - Export to Europe",
    },
    blackPepper: {
        currentPrice: 585.00, // Price in ₹ per kg
        unit: "₹/kg",
        trend: -1.5, // Percentage change over last week
        status: "DOWN",
        futures: [
            { month: "Dec '25", price: 580.00 },
            { month: "Jan '26", price: 595.00 },
            { month: "Feb '26", price: 590.00 },
        ],
        demand: "Moderate - Domestic Holiday Stocking",
    },
};

const MarketAnalysisPage = () => {
    
    const renderTrend = (trend) => {
        const color = trend > 0 ? "text-green-400" : trend < 0 ? "text-red-400" : "text-gray-400";
        const Icon = trend > 0 ? ArrowUp : trend < 0 ? ArrowDown : TrendingUp;
        return (
            <div className={`flex items-center font-bold ${color}`}>
                <Icon className="w-5 h-5 mr-1" />
                {Math.abs(trend).toFixed(1)}%
            </div>
        );
    };

    const renderFuturesChart = (futures) => (
        <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Futures Market Forecast (Next 3 Months)</h4>
            <div className="flex justify-between text-xs text-gray-200">
                {futures.map((f, index) => (
                    <div key={index} className="text-center">
                        <p className="font-bold">{f.price.toFixed(2)} {MOCK_MARKET_DATA.coffeeRobusta.unit.split('/')[0]}</p>
                        <p className="text-gray-400 mt-0.5">{f.month}</p>
                    </div>
                ))}
            </div>
        </div>
    );

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
                        Coorg Market Price Analysis
                    </h1>
                    <p className="text-gray-400 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1 text-blue-400" />
                        Real-time price trends and future forecasts for your crops.
                    </p>
                </motion.div>

                {/* --- MARKET CARDS CONTAINER --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* 1. COFFEE CARD */}
                    {Object.entries(MOCK_MARKET_DATA).map(([cropKey, data], index) => (
                        <motion.div
                            key={cropKey}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                            className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-700 hover:shadow-lg transition-shadow"
                        >
                            <div className="flex items-center justify-between border-b border-gray-700 pb-3 mb-4">
                                <h2 className="text-2xl font-bold text-white flex items-center capitalize">
                                    <Coffee className="w-6 h-6 mr-3 text-yellow-500" />
                                    {cropKey.includes("coffee") ? "Robusta Coffee" : "Black Pepper"} Price
                                </h2>
                                {renderTrend(data.trend)}
                            </div>

                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-sm text-gray-400">Current Mandi Price</p>
                                    <p className="text-5xl font-extrabold text-green-400 mt-1">
                                        ₹{data.currentPrice.toFixed(2)}
                                    </p>
                                    <p className="text-lg text-gray-400">{data.unit}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-400">Last Week Change</p>
                                    {renderTrend(data.trend)}
                                </div>
                            </div>
                            
                            {/* Demand and Logistics Info */}
                            <div className="mt-6 pt-4 border-t border-gray-700">
                                <div className="flex justify-between items-center text-sm text-gray-300">
                                    <span className="font-medium flex items-center">
                                        <Truck className="w-4 h-4 mr-2 text-blue-400" />
                                        Primary Demand Driver:
                                    </span>
                                    <span>{data.demand}</span>
                                </div>
                            </div>

                            {/* Futures Chart/Forecast */}
                            {renderFuturesChart(data.futures)}

                            <p className="text-xs text-gray-500 mt-4 text-center">
                                Data Source: Madikeri APMC Mandi, last updated 2 hours ago.
                            </p>

                        </motion.div>
                    ))}
                </div>

                {/* --- STRATEGIC ADVICE SECTION --- */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="mt-12 p-6 bg-yellow-900/40 rounded-xl border border-yellow-700/50 shadow-lg"
                >
                    <h2 className="text-2xl font-bold text-yellow-300 mb-3">
                        Strategic Advisory 📊
                    </h2>
                    <ul className="text-gray-200 list-disc list-inside space-y-2">
                        <li>
                            <strong className="text-yellow-100">Coffee:</strong> With a strong short-term trend and positive futures for February, **plan to hold 25% of your harvest** for a later sale in Q1 2026.
                        </li>
                        <li>
                            <strong className="text-yellow-100">Pepper:</strong> The price is currently dropping. If your storage costs are low, consider **delaying sales for 30-45 days**, as the January futures show a significant price recovery.
                        </li>
                        <li>
                            <strong className="text-yellow-100">Logistics:</strong> Demand for European export is strong for robusta. Coordinate with your cooperative now to secure **preferred freight rates** before peak season logistics bottlenecks occur.
                        </li>
                    </ul>
                </motion.div>
            </main>
        </div>
    );
};

export default MarketAnalysisPage;