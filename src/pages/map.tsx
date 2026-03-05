import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import ParksList from "../components/ParksList";
import { PARKS } from "./calendar/[slug]";

const ParksMap = dynamic(() => import("../components/ParksMap"), {
  ssr: false,
  loading: () => (
    <div className="ui basic loading segment" style={{ minHeight: "400px" }} />
  ),
});

export async function getServerSideProps() {
  const parks = PARKS.map((park) => ({
    id: park.id,
    name: park.name,
    slug: park.slug,
    courts: park.courts,
    location: park.location ?? null,
  }));

  return { props: { parks } };
}

const MapPage = ({ parks }) => {
  return (
    <Layout
      title="Parks Map"
      selectedMenuItem="map"
      canonicalUrl="https://www.zitnr.com/map"
    >
      <div className="ui container">
        <h5
          className="ui small header"
          style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        >
          <i className="map marker alternate icon"></i>
          <div className="content">
            Parks Map
            <div className="sub header">Pickleball / Tennis courts around Seattle</div>
          </div>
        </h5>

        <ParksMap parks={parks} />
        <ParksList parks={parks} />
      </div>
    </Layout>
  );
};

export default MapPage;
