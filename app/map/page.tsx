"use client";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom Marker Icon
const markerIcon = new L.Icon({
  iconUrl: "/icons/pin.png", // Ensure you have a marker image in public folder
  iconSize: [25, 25], // Default Leaflet size
  iconAnchor: [12, 41], // Anchor point
});

// Service Locations (Latitude & Longitude)
const locations = [
  { id: 1, name: "Kuratoli", lat: 40.7128, lng: -74.006 },
  { id: 2, name: "Bashundhara", lat: 40.7328, lng: -73.996 },
  { id: 3, name: "Khilkhet", lat: 40.6928, lng: -74.016 },
  { id: 4, name: "Nikunjo", lat: 40.7428, lng: -73.956 },
  { id: 5, name: "Badda", lat: 40.7628, lng: -73.936 },
  { id: 6, name: "Uttara", lat: 40.7528, lng: -73.986 },
  { id: 7, name: "Dhanmondi", lat: 40.7828, lng: -73.926 },
  { id: 8, name: "Mirpur", lat: 40.7228, lng: -73.966 },
  { id: 9, name: "Mohammadpur", lat: 40.7728, lng: -73.906 },
];

export default function MapPage() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Topbar Component */}
        <Topbar />

        {/* Map Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg" style={{ fontFamily: '"Barlow", sans-serif' }}>
        <h1 className="text-2xl font-bold text-[#464255] mb-6">Map</h1>
          <MapContainer
            center={[40.7128, -74.006]} // Default center (New York)
            zoom={12}
            className="w-full h-[500px] rounded-lg"
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc) => (
              <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={markerIcon}>
                <Popup>{loc.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
