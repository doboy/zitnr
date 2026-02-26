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
              src="/zack-profile.jpg"
              alt="Zack"
            />
          </div>

          <p>
            Hi, I'm <strong>Zack</strong> — a web developer who loves building
            community and creating educational content. I also have a deep
            passion for pickleball, which inspired me to create{" "}
            <strong>z.i.t.n.r.</strong>
          </p>

          <h2 className="ui header">Other Projects</h2>
          <div className="ui list">
            <div className="item">
              <img className="ui mini image" src="https://algoviz.xyz/favicon.ico" alt="algoviz" style={{ width: "1em", height: "1em", marginRight: "0.5em", verticalAlign: "middle", display: "inline" }} />
              <div className="content">
                <a href="https://algoviz.xyz" target="_blank" rel="noopener noreferrer">
                  <strong>algoviz.xyz</strong>
                </a>{" "}
                — Interactive visualizations of algorithms and data structures
              </div>
            </div>
            <div className="item">
              <img className="ui mini image" src="https://aloalgo.com/favicon.ico" alt="aloalgo" style={{ width: "1em", height: "1em", marginRight: "0.5em", verticalAlign: "middle", display: "inline" }} />
              <div className="content">
                <a href="https://aloalgo.com" target="_blank" rel="noopener noreferrer">
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
