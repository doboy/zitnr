import React from "react";
import Link from "next/link";

export interface NearbyPark {
  name: string;
  slug: string;
  distance: number;
  tennisCourtsCount: number;
  pickleballCourtsCount: number;
}

const NearbyParkItem = ({ park, courtType }: { park: NearbyPark; courtType: "pickleball" | "tennis" }) => {
  const count = courtType === "pickleball" ? park.pickleballCourtsCount : park.tennisCourtsCount;
  const label = courtType === "pickleball" ? "pickleball" : "tennis";
  return (
    <div key={park.slug} className="item">
      <div className="content">
        <Link className="header" href={`/calendar/${park.slug}`}>
          {park.name}
        </Link>
        <div className="description">
          {park.distance.toFixed(1)} miles away &middot; {count} {label} court{count !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

export const NearbyParks = ({ pickleball, tennis }: { pickleball: NearbyPark[]; tennis: NearbyPark[] }) => {
  if (pickleball.length === 0 && tennis.length === 0) return null;

  const pickleballParks = pickleball;
  const tennisOnlyParks = tennis;

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
                <NearbyParkItem key={park.slug} park={park} courtType="pickleball" />
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
                <NearbyParkItem key={park.slug} park={park} courtType="tennis" />
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
