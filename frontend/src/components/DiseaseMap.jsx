/* eslint-disable no-unused-vars */
// // DiseaseMap.jsx
// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import pointerIconImg from "../assets/icon.png"; // use your pointer image

// // Custom pointer icon
// const pointerIcon = new L.Icon({
//   iconUrl: pointerIconImg,
//   iconSize: [30, 30],
//   iconAnchor: [15, 30],   // bottom middle of icon
//   popupAnchor: [0, -30],
// });

// const KarnatakaCenter = {
//   lat: 15.3173,  // latitude of Karnataka
//   lng: 75.7139,  // longitude of Karnataka
// };

// const CoorgDiseaseMap = ({ userCoords }) => {
//   // Use Karnataka center if userCoords not provided
//   const center = userCoords?.lat && userCoords?.lng ? userCoords : KarnatakaCenter;

//   return (
//     <MapContainer
//       center={[center.lat, center.lng]}
//       zoom={7}  // zoomed out to show whole Karnataka
//       style={{ height: "400px", width: "100%" }}
//       scrollWheelZoom={true}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//       />

//       {/* Show marker if userCoords are provided */}
//       {userCoords?.lat && userCoords?.lng && (
//         <Marker position={[userCoords.lat, userCoords.lng]} icon={pointerIcon}>
//           <Popup>
//             Your Farm Location <br />
//             Latitude: {userCoords.lat}, Longitude: {userCoords.lng}
//           </Popup>
//         </Marker>
//       )}
//     </MapContainer>
//   );
// };

// export default CoorgDiseaseMap;
// DiseaseMap.jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import pointerIconImg from "../assets/icon.png"; // use your pointer image

// Custom pointer icon
const pointerIcon = new L.Icon({
  iconUrl: pointerIconImg,
  iconSize: [30, 30],
  iconAnchor: [15, 30],   // bottom middle of icon
  popupAnchor: [0, -30],
});

const KarnatakaCenter = {
  lat: 15.3173,
  lng: 75.7139,
};

const RecenterMap = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords?.lat && coords?.lng) {
      map.setView([coords.lat, coords.lng], 15, { animate: true }); // smooth zoom to pointer
    }
  }, [coords, map]);

  return null;
};

const CoorgDiseaseMap = ({ userCoords }) => {
  const initialCenter = KarnatakaCenter;
  const initialZoom = 7; // show whole state initially

  return (
    <MapContainer
      center={[initialCenter.lat, initialCenter.lng]}
      zoom={initialZoom}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {/* Show marker if userCoords are provided */}
      {userCoords?.lat && userCoords?.lng && (
        <Marker position={[userCoords.lat, userCoords.lng]} icon={pointerIcon}>
          <Popup>
            Your Farm Location <br />
            Latitude: {userCoords.lat}, Longitude: {userCoords.lng}
          </Popup>
        </Marker>
      )}

      {/* Recenter and zoom to user farm if available */}
      {userCoords?.lat && userCoords?.lng && <RecenterMap coords={userCoords} />}
    </MapContainer>
  );
};

export default CoorgDiseaseMap;
