import React from "react";
import Link from "next/link";

export interface NearbyPark {
  name: string;
  slug: string;
  distance: number;
  courtCount: number;
}

export const NearbyParks = ({ parks }: { parks: NearbyPark[] }) => {
  if (parks.length === 0) return null;

  return (
    <div>
      <h5 className="ui small header">
        <i className="map marker alternate icon"></i>
        <div className="content">Nearby Parks</div>
      </h5>
      <div className="ui relaxed divided list">
        {parks.map((park) => (
          <div key={park.slug} className="item">
            <div className="content">
              <Link className="header" href={`/calendar/${park.slug}`}>
                {park.name}
              </Link>
              <div className="description">
                {park.distance.toFixed(1)} miles away &middot; {park.courtCount}{" "}
                {park.courtCount === 1 ? "court" : "courts"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
