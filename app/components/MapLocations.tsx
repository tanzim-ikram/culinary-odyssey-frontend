"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useState } from "react";

// Import react-leaflet components dynamically to prevent SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// Fix missing marker icon by setting it manually
const defaultIcon = L.icon({
  iconUrl: "/icons/pin.png",
  iconSize: [25, 25], // Default Leaflet size
  iconAnchor: [12, 41], // Anchor point
});

// Dictionary of known locations with lat/lng
const locationsDictionary: Record<string, LatLngExpression> = {
  Dhaka: [23.8103, 90.4125],
  Chattogram: [22.3569, 91.7832],
  Sylhet: [24.8949, 91.8687],
  Rajshahi: [24.3745, 88.6042],
  Khulna: [22.8456, 89.5403],
  Barishal: [22.701, 90.3535],
  Jashore: [23.1664, 89.2081],
  Mymensingh: [24.7471, 90.4203],
  Bogura: [24.8481, 89.3724],
};

interface MapLocationsProps {
  locations: string[]; // Expecting an array of location names
}

export default function MapLocations({ locations }: MapLocationsProps) {
  const [validLocations, setValidLocations] = useState<
    { name: string; latLng: LatLngExpression }[]
  >([]);

  useEffect(() => {
    const filteredLocations = locations
      .map((loc) => ({
        name: loc,
        latLng: locationsDictionary[loc],
      }))
      .filter((loc) => loc.latLng !== undefined);

    setValidLocations(filteredLocations);
  }, [locations]);

  return (
    <div>
      {/* Map */}
      <div className="h-60 w-full rounded-lg overflow-hidden">
        <MapContainer
          center={[23.8103, 90.4125]}
          zoom={6}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {validLocations.map((loc, index) => (
            <Marker key={index} position={loc.latLng} icon={defaultIcon}>
              <Popup>{loc.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
