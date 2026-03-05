import React from "react";
import Link from "next/link";
import { Park } from "zitnr-utils";
import { isPickleballPark, isTennisPark } from "../utils/parkTypes";

const REGIONS: { name: string; slugs: string[] }[] = [
  {
    name: "North West Seattle",
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
    name: "North East Seattle",
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
    name: "Magnolia & Queen Anne Seattle",
    slugs: ["magnolia-park", "magnolia-playfield", "discovery-park"],
  },
  {
    name: "Central Seattle",
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
    name: "Downtown Seattle",
    slugs: ["sam-smith-park", "dearborn-park", "david-rodgers-park"],
  },
  {
    name: "South East Seattle",
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
    name: "West Seattle & Delridge",
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

interface ParksListProps {
  parks: Park[];
}

const ParkItem = ({ park, courtType }: { park: Park; courtType: "pickleball" | "tennis" }) => {
  const count = courtType === "pickleball" ? park.pickleballCourtsCount : park.tennisCourtsCount;
  const label = courtType === "pickleball" ? "pickleball" : "tennis";
  return (
    <div className="item">
      <div className="content">
        <Link className="header" href={`/calendar/${park.slug}`}>
          {park.name}
        </Link>
        <div className="description">
          {count} {label} court{count !== 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
};

const ParksList = ({ parks }: ParksListProps) => {
  const parksBySlug: Record<string, Park> = {};
  parks.forEach((p) => {
    parksBySlug[p.slug] = p;
  });

  return (
    <div style={{ marginTop: "1rem" }}>
      {REGIONS.map((region) => {
        const regionParks = region.slugs
          .map((slug) => parksBySlug[slug])
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name));

        if (regionParks.length === 0) return null;

        const pickleballParks = regionParks.filter(isPickleballPark);
        const tennisParks = regionParks.filter(isTennisPark);

        return (
          <div key={region.name} style={{ marginBottom: "3rem" }}>
            <h5 className="ui small header">
              <i className="map marker alternate icon"></i>
              <div className="content">{region.name}</div>
            </h5>
            <div className="ui two column grid">
              <div className="column">
                <h6 className="ui tiny header">Pickleball</h6>
                <div className="ui relaxed divided list">
                  {pickleballParks.map((park) => (
                    <ParkItem key={park.id} park={park} courtType="pickleball" />
                  ))}
                </div>
              </div>
              <div className="column">
                <h6 className="ui tiny header">Tennis</h6>
                <div className="ui relaxed divided list">
                  {tennisParks.length > 0 ? (
                    tennisParks.map((park) => (
                      <ParkItem key={park.id} park={park} courtType="tennis" />
                    ))
                  ) : (
                    <div className="item" style={{ color: "grey" }}>
                      None
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ParksList;
