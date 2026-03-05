import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Park } from "zitnr-utils";
import { isTennisPark } from "../utils/parkTypes";

import "leaflet/dist/leaflet.css";

const createColoredIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const pickleballIcon = createColoredIcon("blue");
const tennisIcon = createColoredIcon("green");

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
        {parksWithLocation.map((park) => {
          const tennis = isTennisPark(park);
          return (
            <Marker
              key={park.id}
              position={[park.location!.latitude, park.location!.longitude]}
              icon={tennis ? tennisIcon : pickleballIcon}
            >
              <Popup>
                <strong>{park.name}</strong>
                <br />
                {park.courts.length} {tennis ? "tennis" : "pickleball"} court
                {park.courts.length !== 1 ? "s" : ""}
                <br />
                <a href={`/calendar/${park.slug}`}>View calendar</a>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <div
        style={{
          display: "flex",
          gap: "1.5rem",
          marginTop: "0.5rem",
          fontSize: "0.9em",
        }}
      >
        <span>
          <img
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
            alt=""
            style={{ height: 16, verticalAlign: "middle", marginRight: 4 }}
          />
          Pickleball
        </span>
        <span>
          <img
            src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
            alt=""
            style={{ height: 16, verticalAlign: "middle", marginRight: 4 }}
          />
          Tennis
        </span>
      </div>
    </div>
  );
};

export default ParksMap;
