// src/components/CoorgDiseaseMap.jsx
import React, { useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { HeatmapLayer } from 'react-leaflet-heatmap-layer-v3';import { MapPin } from 'lucide-react'; 
import coorgHotspots from '../Data/hotspots';
import 'leaflet/dist/leaflet.css'; // Essential Leaflet CSS

const COORG_CENTER = [12.42, 75.74]; // Madikeri, Coorg center
const INITIAL_ZOOM = 10;

const CoorgDiseaseMap = () => {
    const points = useMemo(() => coorgHotspots, []);

    // Define the gradient for the heatmap: Green (Low) -> Yellow (Medium) -> Red (High)
    const gradient = {
        0.0: '#5A9C00', 
        0.5: '#FFEB3B', 
        1.0: '#E53935'  
    };

    return (
        <div className="p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                    <MapPin className="w-5 h-5 text-red-500 mr-2" />
                    Coorg Disease Watch (Live Map)
                </h3>
                <span className="text-sm text-green-400 font-semibold border border-green-700/50 px-3 py-1 rounded-full bg-gray-900">
                    {points.length} Active Hotspots
                </span>
            </div>
            
            <div className="flex-grow rounded-xl overflow-hidden border border-gray-600">
                <MapContainer 
                    center={COORG_CENTER} 
                    zoom={INITIAL_ZOOM} 
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    {/* Dark Mode Tile Layer */}
                    <TileLayer
                        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    />

                    {/* Heatmap Layer - Direct usage from the installed package */}
                    <HeatmapLayer
                        points={points}
                        // Data format: [latitude, longitude, intensity]
                        longitudeExtractor={m => m[1]} 
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={m => parseFloat(m[2])}
                        gradient={gradient}
                        radius={25} 
                        max={1.0}
                    />
                </MapContainer>
            </div>
        </div>
    );
}

export default CoorgDiseaseMap;