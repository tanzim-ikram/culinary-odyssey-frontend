"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

// Import react-leaflet components dynamically to prevent SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Fix missing marker icon by setting it manually
const markerIcon = L.icon({
  iconUrl: "/icons/pin.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
});

// ✅ Dictionary of locations with lat/lng
const locationsDict: { [key: string]: LatLngExpression } = {
  "Dhaka": [23.8103, 90.4125],
  "Gazipur": [23.9905, 90.3877],
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

export default function MapPage() {
  const [mapLocations, setMapLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        console.error("No access token found! Redirecting to login...");
        return;
      }

      setToken(accessToken); // ✅ Set token for Topbar

      try {
        const response = await axios.get("http://localhost:5000/dashboard", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        });

        // ✅ Extract locations from API response
        if (response.data?.mapLocations) {
          setMapLocations(response.data.mapLocations);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-xl font-semibold">Loading map...</p>;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* ✅ Pass token to Topbar */}
        {token && <Topbar token={token} />}

        {/* Map Container */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-[#464255] mb-4" style={{ fontFamily: '"Barlow", sans-serif' }}>
            Delivery Locations
          </h1>

          {/* Map Section */}
          <div className="flex-1 w-full rounded-lg overflow-hidden">
            <MapContainer center={defaultCenter} zoom={7} className="w-full h-[500px]">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* ✅ Place markers only for found locations */}
              {mapLocations.map((location, index) => {
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
        </div>
      </div>
    </div>
  );
}
