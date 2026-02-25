import React, { useMemo } from "react";
import { Park, PARKS } from "zitnr-utils";
import { calculateDistanceBetweenCoordsInMiles } from "../utils/calculateDistanceBetweenCoordsInMiles";

const NUM_NEARBY = 5;

export const NearbyParks = ({ currentPark }: { currentPark: Park }) => {
  const nearbyParks = useMemo(() => {
    if (!currentPark.location) return [];

    return PARKS.filter((p) => p.id !== currentPark.id && p.location)
      .map((p) => ({
        park: p,
        distance: calculateDistanceBetweenCoordsInMiles(
          currentPark.location!.latitude,
          currentPark.location!.longitude,
          p.location!.latitude,
          p.location!.longitude
        ),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, NUM_NEARBY);
  }, [currentPark]);

  if (nearbyParks.length === 0) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h5 className="ui small header">
        <i className="map marker alternate icon"></i>
        <div className="content">Nearby Parks</div>
      </h5>
      <div className="ui relaxed divided list">
        {nearbyParks.map(({ park, distance }) => (
          <a
            key={park.id}
            className="item"
            href={`/calendar/${park.slug}`}
          >
            <div className="content">
              <div className="header">{park.name}</div>
              <div className="description">
                {distance.toFixed(1)} miles away &middot; {park.courts.length}{" "}
                {park.courts.length === 1 ? "court" : "courts"}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
