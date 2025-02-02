"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Import react-leaflet components dynamically to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Fix missing marker icon by setting it manually
const defaultIcon = L.icon({
  iconUrl: "/icons/pin.png",
  iconSize: [25, 25], // Default Leaflet size
  iconAnchor: [12, 41], // Anchor point
});

const mapCenter: LatLngExpression = [37.7749, -122.4194]; // San Francisco as default center

const locations = [
  { lat: 40.7128, lng: -74.0060, name: "New York" },
  { lat: 34.0522, lng: -118.2437, name: "Los Angeles" },
  { lat: 41.8781, lng: -87.6298, name: "Chicago" },
  { lat: 29.7604, lng: -95.3698, name: "Houston" },
];

export default function MapLocations() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#464255]" style={{ fontFamily: '"Barlow", sans-serif' }}>
          Locations
        </h2>
        <a href="/map" className="text-[#75A957] hover:underline" style={{ fontFamily: '"Barlow", sans-serif' }}>
          Open map
        </a>
      </div>

      {/* Map */}
      <div className="h-60 w-full rounded-lg overflow-hidden">
        <MapContainer center={mapCenter} zoom={4} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc, index) => (
            <Marker key={index} position={[loc.lat, loc.lng] as LatLngExpression} icon={defaultIcon}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
