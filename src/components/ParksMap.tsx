import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Park } from "zitnr-utils";

import "leaflet/dist/leaflet.css";

// Fix default marker icon issue with webpack/next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

// Seattle center coordinates
const SEATTLE_CENTER: [number, number] = [47.6362, -122.3321];

interface ParksMapProps {
  parks: Park[];
}

const ParksMap = ({ parks }: ParksMapProps) => {
  const parksWithLocation = parks.filter(
    (park) => park.location?.latitude && park.location?.longitude
  );

  return (
    <div className="parks-map-container">
      <MapContainer
        center={SEATTLE_CENTER}
        zoom={11}
        style={{ height: "500px", width: "100%", borderRadius: "4px" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {parksWithLocation.map((park) => (
          <Marker
            key={park.id}
            position={[park.location!.latitude, park.location!.longitude]}
          >
            <Popup>
              <strong>{park.name}</strong>
              <br />
              {park.courts.length} court{park.courts.length !== 1 ? "s" : ""}
              <br />
              <a href={`/calendar/${park.slug}`}>View calendar</a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default ParksMap;
