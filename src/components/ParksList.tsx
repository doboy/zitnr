import React from "react";
import { Park } from "zitnr-utils";

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

const ParksList = ({ parks }: ParksListProps) => {
  const parksBySlug: Record<string, Park> = {};
  parks.forEach((p) => {
    parksBySlug[p.slug] = p;
  });

  return (
    <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <style>{`
        @media only screen and (max-width: 767.98px) {
          .parks-list-grid.ui.stackable.grid > .row > .column {
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
      <div className="ui stackable grid parks-list-grid">
        {REGIONS.map((region) => {
          const regionParks = region.slugs
            .map((slug) => parksBySlug[slug])
            .filter(Boolean)
            .sort((a, b) => a.name.localeCompare(b.name));

          if (regionParks.length === 0) return null;

          // Split parks into pairs for 2-column rows
          const rows: Park[][] = [];
          for (let i = 0; i < regionParks.length; i += 2) {
            rows.push(regionParks.slice(i, i + 2));
          }

          return (
            <React.Fragment key={region.name}>
              <div className="row" style={{ paddingBottom: 0 }}>
                <div className="sixteen wide column" style={{ paddingBottom: 0 }}>
                  <h5
                    className="ui tiny header"
                    style={{ marginBottom: 0, color: "#555" }}
                  >
                    {region.name}
                  </h5>
                </div>
              </div>
              {rows.map((row, i) => (
                <div className="row" key={i} style={{ paddingTop: 0, paddingBottom: 0 }}>
                  {row.map((park) => (
                    <div className="eight wide column" key={park.id} style={{ paddingTop: 0 }}>
                      <div className="ui list" style={{ marginTop: 0, marginBottom: 0 }}>
                        <div className="item">
                          <i className="map pin icon"></i>
                          <div className="content">
                            <a href={`/calendar/${park.slug}`}>{park.name}</a>
                            <span style={{ color: "#888", marginLeft: "0.5rem" }}>
                              ({park.courts.length} court
                              {park.courts.length !== 1 ? "s" : ""})
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className="row" style={{ paddingTop: 0, paddingBottom: 0 }}>
                <div className="sixteen wide column" style={{ paddingTop: 0, paddingBottom: 0 }}>
                  <div className="ui divider"></div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ParksList;
