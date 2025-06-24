import React from "react";

export const FundraiserPage = () => {
  return (
    <div className="ui container">
      <div className="ui basic segment">
        <div className="">
          <h1 className="ui center aligned header">
            🎾 Pickleball Fundraiser for Open Play
          </h1>
          <p><strong>Wednesday, July 9th · 6:00 PM</strong><br />Miller Park, Capitol Hill</p>

          <p>Join us for an evening of fun, food, and friendly competition — all to help fund open play court reservations at Miller Park! All skill levels are welcome.</p>

          <h2>🔧 What to Expect:</h2>
          <ul>
            <li><span className="highlight">Grip Tape Station</span> – Rewrap your paddle with fresh grip tape</li>
            <li><span className="highlight">Food & Drinks</span> – Enjoy light refreshments with your donation</li>
            <li><span className="highlight">Open Play for All Levels</span> – Casual games, welcoming atmosphere</li>
            <li><span className="highlight">🎟 Raffle Prizes</span> – Win awesome prizes including:
              <ul>
                <li>A <strong>Red Selkirk Invikta Paddle</strong></li>
                <li>A <strong>Private Coaching Clinic with Coach Daniel Stein</strong> (4.6 DUPR)</li>
              </ul>
            </li>
          </ul>

          <h2>💬 Why It Matters:</h2>
          <p>This fundraiser supports our mission to reserve courts for weekday open play. Every dollar helps make pickleball more accessible to our community.</p>

          <h2>🎟 Entry:</h2>
          <p>No set fee — <strong>donate what you can</strong>. All donations support open play access.</p>

          <p className="footer">Come rally with us for a great cause. See you on the courts!</p>

          <span>
            <div className="ui medium images">
              <img
                className="ui bordered image" src="./public/fundraiser-7-9.png" />
              <img
                className="ui bordered image" src="./public/prize-paddle.jpg" />
            </div>
          </span>
        </div>
      </div>

    </div>
  );
};

