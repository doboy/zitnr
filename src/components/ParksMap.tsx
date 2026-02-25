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

const REGIONS: { name: string; slugs: string[] }[] = [
  {
    name: "NorthWest",
    slugs: [
      "bitter-lake-playfield",
      "ingraham-hs",
      "ballard-hs",
      "soundview-playfield",
      "froula-playground",
      "rogers-playfield",
    ],
  },
  {
    name: "NorthEast",
    slugs: [
      "green-lake-park-east",
      "green-lake-park-west",
      "lower-woodland-playfield",
      "lower-woodland-playfield-tennis",
      "wallingford-playfield",
      "bryant-playground",
      "laurelhurst-playfield",
      "meadowbrook-playfield",
    ],
  },
  {
    name: "Magnolia & Queen Anne",
    slugs: ["magnolia-park", "magnolia-playfield", "discovery-park"],
  },
  {
    name: "Central",
    slugs: [
      "miller-playfield",
      "volunteer-park",
      "montlake-playfield",
      "madrona-playground",
      "madison-park",
      "garfield-playfield",
      "observatory-park",
      "aytc-outdoor",
    ],
  },
  {
    name: "Downtown",
    slugs: ["sam-smith-park", "dearborn-park", "david-rodgers-park"],
  },
  {
    name: "SouthEast",
    slugs: [
      "beacon-hill-playfield",
      "mount-baker-park",
      "rainier-beach-playfield",
      "jefferson-park-lid",
      "rainier-playfield",
      "seward-park",
      "brighton-playfield",
      "gilman-playfield",
    ],
  },
  {
    name: "West & Delridge",
    slugs: [
      "alki-playfield",
      "delridge-playfield",
      "hiawatha-playfield",
      "riverview-playfield",
      "walt-hundley-playfield",
      "solstice-park",
      "sealth-hs-complex",
    ],
  },
];

interface ParksMapProps {
  parks: Park[];
}

const ParksMap = ({ parks }: ParksMapProps) => {
  const parksWithLocation = parks.filter(
    (park) => park.location?.latitude && park.location?.longitude
  );

  const parksBySlug: Record<string, Park> = {};
  parks.forEach((p) => {
    parksBySlug[p.slug] = p;
  });

  return (
    <div>
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

      <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <h1 className="ui header">All Parks</h1>
        <div className="ui three column stackable grid">
          {REGIONS.map((region) => {
            const regionParks = region.slugs
              .map((slug) => parksBySlug[slug])
              .filter(Boolean)
              .sort((a, b) => a.name.localeCompare(b.name));

            if (regionParks.length === 0) return null;

            return (
              <div className="column" key={region.name}>
                <h5
                  className="ui tiny header"
                  style={{ marginBottom: ".25rem", color: "#555" }}
                >
                  {region.name}
                </h5>
                <div className="ui list" style={{ marginTop: 0 }}>
                  {regionParks.map((park) => (
                    <div className="item" key={park.id}>
                      <i className="map pin icon"></i>
                      <div className="content">
                        <a href={`/calendar/${park.slug}`}>{park.name}</a>
                        <span style={{ color: "#888", marginLeft: "0.5rem" }}>
                          ({park.courts.length} court
                          {park.courts.length !== 1 ? "s" : ""})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParksMap;
