// src/data/coorgHotspots.js

// Mock data: [latitude, longitude, intensity (0.0 to 1.0)]
// Coordinates centered around Coorg (e.g., Madikeri, Virajpet, Somwarpet)

const coorgHotspots = [
  // High intensity (Disease Cluster 1: near Madikeri)
  [12.428, 75.740, 0.95], // Coffee Rust - Very High
  [12.425, 75.738, 0.88],
  [12.420, 75.742, 0.75],
  
  // Medium intensity (Disease Cluster 2: near Virajpet)
  [12.190, 75.830, 0.65], // Pepper Foot Rot - Medium
  [12.195, 75.835, 0.58],
  [12.201, 75.828, 0.50],
  
  // Low intensity / Scattered (General Alert)
  [12.500, 75.600, 0.30], 
  [12.300, 75.700, 0.20],
  [12.250, 75.800, 0.15],
  [12.150, 75.900, 0.10],
];

export default coorgHotspots;
