import React from "react";
import Link from "next/link";

export interface NearbyPark {
  name: string;
  slug: string;
  distance: number;
  courtCount: number;
  pickleballCourtsCount: number;
}

const NearbyParkItem = ({ park }: { park: NearbyPark }) => (
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
);

export const NearbyParks = ({ parks }: { parks: NearbyPark[] }) => {
  if (parks.length === 0) return null;

  const pickleballParks = parks.filter((p) => p.pickleballCourtsCount > 0);
  const tennisOnlyParks = parks.filter((p) => p.pickleballCourtsCount === 0);

  return (
    <div>
      <h5 className="ui small header">
        <i className="map marker alternate icon"></i>
        <div className="content">Nearby Parks</div>
      </h5>
      <div className="ui two column grid">
        <div className="column">
          <h6 className="ui tiny header">Pickleball</h6>
          <div className="ui relaxed divided list">
            {pickleballParks.length > 0 ? (
              pickleballParks.map((park) => (
                <NearbyParkItem key={park.slug} park={park} />
              ))
            ) : (
              <div className="item" style={{ color: "grey" }}>
                None nearby
              </div>
            )}
          </div>
        </div>
        <div className="column">
          <h6 className="ui tiny header">Tennis</h6>
          <div className="ui relaxed divided list">
            {tennisOnlyParks.length > 0 ? (
              tennisOnlyParks.map((park) => (
                <NearbyParkItem key={park.slug} park={park} />
              ))
            ) : (
              <div className="item" style={{ color: "grey" }}>
                None nearby
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
