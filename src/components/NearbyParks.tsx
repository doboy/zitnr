import React from "react";

export interface NearbyPark {
  name: string;
  slug: string;
  distance: number;
  courtCount: number;
}

export const NearbyParks = ({ parks }: { parks: NearbyPark[] }) => {
  if (parks.length === 0) return null;

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <h5 className="ui small header">
        <i className="map marker alternate icon"></i>
        <div className="content">Nearby Parks</div>
      </h5>
      <div className="ui relaxed divided list">
        {parks.map((park) => (
          <a
            key={park.slug}
            className="item"
            href={`/calendar/${park.slug}`}
          >
            <div className="content">
              <div className="header">{park.name}</div>
              <div className="description">
                {park.distance.toFixed(1)} miles away &middot; {park.courtCount}{" "}
                {park.courtCount === 1 ? "court" : "courts"}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
