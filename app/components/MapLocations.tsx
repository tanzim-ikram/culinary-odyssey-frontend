"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

// Import react-leaflet components dynamically to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

interface MapLocationsProps {
  locations: string[]; // Array of location names
}

// Fix missing marker icon by setting it manually
const markerIcon = L.icon({
  iconUrl: "/icons/pin.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
});

// ✅ Dictionary of locations with lat/lng
const locationsDict: { [key: string]: LatLngExpression } = {
  "Dhaka": [23.8103, 90.4125],
  "Chattogram": [22.3569, 91.7832],
  "Khulna": [22.8456, 89.5403],
  "Barishal": [22.7010, 90.3535],
  "Sylhet": [24.8949, 91.8687],
  "Rajshahi": [24.3636, 88.6241],
  "Mymensingh": [24.7471, 90.4203],
  "Bogura": [24.8466, 89.3773],
  "Jashore": [23.1664, 89.2080],
};

// Default center position
const defaultCenter: LatLngExpression = [23.8103, 90.4125];

export default function MapLocations({ locations }: MapLocationsProps) {
  return (
    <div className="h-60 w-full rounded-lg overflow-hidden">
      <MapContainer center={defaultCenter} zoom={7} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* ✅ Place markers only for found locations */}
        {locations.map((location, index) => {
          const position = locationsDict[location];

          if (position) {
            return (
              <Marker key={index} position={position} icon={markerIcon}>
                <Popup>{location}</Popup>
              </Marker>
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  );
}
