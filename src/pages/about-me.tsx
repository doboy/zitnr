import React from "react";
import Layout from "../components/Layout";

const AboutMe = () => {
  return (
    <Layout
      title="About Me - z.i.t.n.r."
      selectedMenuItem="about"
      canonicalUrl="https://www.zitnr.com/about-me"
    >
      <div className="ui basic segment">
        <div className="ui center aligned text container">
          <h1 className="ui header">About Me</h1>
        </div>
      </div>

      <div className="ui divider" />
      <div className="ui basic segment">
        <div className="ui text container">
          <div className="ui center aligned basic segment">
            <img
              className="ui centered medium circular image"
              src="/profile.jpeg"
              alt="Zack"
            />
          </div>

          <p>
            Hi, I'm <strong>Zack</strong> — a web developer who loves building
            community and creating educational content.
          </p>

          <h2 className="ui header">The Story Behind z.i.t.n.r.</h2>
          <p>
            For years, a pickleball player named Randy used community donations
            to reserve courts for open play in Seattle. When Randy abruptly
            stepped away in 2024, there was a gap — no one organizing courts, no
            open play sessions. I decided to step up and become "the new Randy."
            That's how <strong>z.i.t.n.r.</strong> — <strong>Zack is the new
            Randy</strong> — was born.
          </p>
          <p>
            What started as simply keeping the courts reserved has grown into a
            community-driven effort with this website, a reservation calendar
            covering 40+ parks, and daily open play sessions at Miller Park.
          </p>

          <h2 className="ui header">Other Projects</h2>
          <div className="ui list">
            <div className="item">
              <img className="ui mini image" src="https://www.algoviz.xyz/favicon.ico" alt="algoviz" style={{ width: "1em", height: "1em", marginRight: "0.5em", verticalAlign: "middle", display: "inline" }} />
              <div className="content">
                <a href="https://www.algoviz.xyz" target="_blank" rel="noopener noreferrer">
                  <strong>algoviz.xyz</strong>
                </a>{" "}
                — Interactive visualizations of algorithms and data structures
              </div>
            </div>
            <div className="item">
              <img className="ui mini image" src="https://www.aloalgo.com/favicon.ico" alt="aloalgo" style={{ width: "1em", height: "1em", marginRight: "0.5em", verticalAlign: "middle", display: "inline" }} />
              <div className="content">
                <a href="https://www.aloalgo.com" target="_blank" rel="noopener noreferrer">
                  <strong>aloalgo.com</strong>
                </a>{" "}
                — Practice algorithms and data structures
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutMe;
