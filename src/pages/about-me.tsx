import React from "react";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout
      title="About - z.i.t.n.r."
      selectedMenuItem="about"
      canonicalUrl="https://www.zitnr.com/about-me"
    >
      <div className="ui basic segment">
        <div className="ui center aligned text container">
          <h1 className="ui header">About z.i.t.n.r.</h1>
          <p>
            <strong>z.i.t.n.r.</strong> stands for <strong>Zack is the new Randy</strong> — a community-driven
            non-profit dedicated to keeping pickleball courts available for open play in Seattle.
          </p>
        </div>
      </div>

      <div className="ui divider" />
      <div className="ui basic segment">
        <div className="ui text container">
          <h2 className="ui header">Our Mission</h2>
          <p>
            We use community donations to reserve public pickleball courts so that
            everyone can enjoy open play — no reservation required. Our goal is to
            make pickleball accessible, social, and fun for players of all skill levels.
          </p>

          <h2 className="ui header">What We Do</h2>
          <div className="ui list">
            <div className="item">
              <i className="calendar alternate icon"></i>
              <div className="content">
                <strong>Reserve Courts</strong> — We book courts at Miller Park and other locations for daily open play sessions.
              </div>
            </div>
            <div className="item">
              <i className="users icon"></i>
              <div className="content">
                <strong>Build Community</strong> — Open play brings together players of all levels for fun, competitive games.
              </div>
            </div>
            <div className="item">
              <i className="map icon"></i>
              <div className="content">
                <strong>Provide Tools</strong> — Our free reservation calendar covers 40+ parks so you can plan your sessions.
              </div>
            </div>
          </div>

          <h2 className="ui header">Open Play Schedule</h2>
          <p>
            Join us at <strong>Miller Park, Capitol Hill</strong>:
          </p>
          <div className="ui list">
            <div className="item"><strong>Monday - Friday:</strong> 5:45 - 8:15 PM</div>
            <div className="item"><strong>Monday, Wednesday, Friday:</strong> 10:00 AM - 12:00 PM</div>
          </div>

          <h2 className="ui header">How You Can Help</h2>
          <p>
            It costs <strong>$37.50 per day</strong> to reserve courts for open play. Every
            donation helps keep the games going. Visit our{" "}
            <a href="/donate">donation page</a> to contribute.
          </p>

          <h2 className="ui header">Get in Touch</h2>
          <p>
            Have questions or feedback? {" "}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd85TIFziQZHXxZm_9uQ4YDjJVCo4yyrhrvCESlu0ryS-ptZg/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact us
            </a>{" "}
            — we'd love to hear from you.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
