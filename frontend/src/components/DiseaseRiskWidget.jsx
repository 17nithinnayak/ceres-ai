import React, { useState, useEffect, useCallback } from "react";
import { Zap, AlertTriangle, CheckCircle, Droplet, Sun, Cloud } from "lucide-react";

// --- Utility: Mock Data Fetching ---
// In a real app, this would be an API call to a weather service and your ML model backend.
const fetchRiskData = async (location) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500)); 

  // Mock data for Coorg: Risk is high when humidity is high or temp is low (ideal for rust/rot)
  const isHighHumidity = Math.random() > 0.6; // 40% chance of high humidity
  const isLowTemp = Math.random() < 0.3; // 30% chance of low temp
  
  let riskLevel = "LOW";
  let alertMessage = "Current conditions are favorable. Continue monitoring.";

  if (isHighHumidity && isLowTemp) {
    riskLevel = "HIGH";
    alertMessage = "High risk! Prolonged high humidity and cool temp increase **Coffee Rust** and **Pepper Foot Rot** probability. Take preventative action now!";
  } else if (isHighHumidity || isLowTemp) {
    riskLevel = "MEDIUM";
    alertMessage = "Moderate risk detected. High moisture in the air. Prioritize drainage and avoid overhead watering.";
  }

  return {
    riskLevel: riskLevel, // HIGH, MEDIUM, LOW
    alertMessage: alertMessage,
    location: location,
    currentTemp: (20 + Math.random() * 5).toFixed(1), // 20.0 to 25.0 °C
    currentHumidity: (75 + Math.random() * 20).toFixed(0), // 75% to 95%
    forecast: "Rain likely in the afternoon",
  };
};

const DiseaseRiskWidget = ({ userLocation = "Somwarpet, Coorg" }) => {
  const [riskData, setRiskData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Define colors and icons based on risk level
  const getRiskStyles = (level) => {
    switch (level) {
      case "HIGH":
        return { color: "text-red-400", bg: "bg-red-900/50", icon: AlertTriangle, border: "border-red-500" };
      case "MEDIUM":
        return { color: "text-yellow-400", bg: "bg-yellow-900/50", icon: AlertTriangle, border: "border-yellow-500" };
      case "LOW":
      default:
        return { color: "text-green-400", bg: "bg-green-900/50", icon: CheckCircle, border: "border-green-500" };
    }
  };

  const loadRiskData = useCallback(async () => {
    setIsLoading(true);
    const data = await fetchRiskData(userLocation);
    setRiskData(data);
    setIsLoading(false);
  }, [userLocation]);

  useEffect(() => {
    loadRiskData();
  }, [loadRiskData]);

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 animate-pulse flex flex-col justify-center items-center h-64">
        <Zap className="w-8 h-8 text-green-500 mb-4" />
        <p className="text-gray-400 font-medium">Calculating **Coorg Disease Risk Index**...</p>
        <p className="text-gray-500 text-sm mt-1">Based on hyper-local weather conditions.</p>
      </div>
    );
  }

  if (!riskData) {
    return <div className="p-6 text-red-500">Error loading risk data.</div>;
  }

  const { color, bg, icon: RiskIcon, border } = getRiskStyles(riskData.riskLevel);
  
  return (
    <div className={`p-6 ${bg} rounded-2xl shadow-2xl border-2 ${border} transition-all duration-500`}>
      
      {/* Header and Risk Level */}
      <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Zap className="w-6 h-6 mr-2 text-green-500" />
          Coorg Disease Risk Index
        </h2>
        <div className={`px-4 py-1 rounded-full font-extrabold text-lg ${color} border ${border}`}>
          {riskData.riskLevel}
        </div>
      </div>

      {/* Location and Last Update */}
      <p className="text-sm text-gray-400 mb-4">
        Monitoring Plot: <span className="font-semibold text-white">{riskData.location}</span>
      </p>

      {/* Detailed Weather Factors */}
      <div className="grid grid-cols-2 gap-4 text-white mb-6">
        <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
          <Sun className="w-5 h-5 text-yellow-400" />
          <span className="text-sm text-gray-300">Temp:</span>
          <span className="font-bold text-lg">{riskData.currentTemp}°C</span>
        </div>
        <div className="flex items-center space-x-2 bg-gray-800 p-3 rounded-lg">
          <Droplet className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-gray-300">Humidity:</span>
          <span className="font-bold text-lg">{riskData.currentHumidity}%</span>
        </div>
      </div>
      
      {/* Alert Message/Advice */}
      <div className="p-4 bg-gray-900 rounded-lg flex items-start space-x-3 border border-gray-700">
        <RiskIcon className={`w-6 h-6 flex-shrink-0 mt-0.5 ${color}`} />
        <div>
          <h3 className={`font-semibold text-lg ${color}`}>Proactive Advisory:</h3>
          <p className="text-gray-300 text-sm mt-1">
            {riskData.alertMessage}
          </p>
        </div>
      </div>

      {/* Forecast Hint */}
      <p className="text-xs text-gray-500 mt-4 text-right">
        Weather Forecast: {riskData.forecast}
      </p>

    </div>
  );
};

export default DiseaseRiskWidget;