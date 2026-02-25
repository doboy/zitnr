import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";
import { PARKS } from "./calendar/[slug]";

const ParksMap = dynamic(() => import("../components/ParksMap"), {
  ssr: false,
  loading: () => (
    <div className="ui basic loading segment" style={{ minHeight: "400px" }} />
  ),
});

const MapPage = () => {
  return (
    <Layout
      title="Parks Map"
      selectedMenuItem="map"
      canonicalUrl="https://zitnr.com/map"
    >
      <div className="ui container">
        <h5
          className="ui small header"
          style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
        >
          <i className="map marker alternate icon"></i>
          <div className="content">
            Parks Map
            <div className="sub header">Pickleball courts around Seattle</div>
          </div>
        </h5>

        <ParksMap parks={PARKS} />
      </div>
    </Layout>
  );
};

export default MapPage;
