import React from "react";
import classnames from "classnames";
import { MenuItem } from "../types";

export const Menu = ({ selectedMenuItem }: {selectedMenuItem: MenuItem }) => {
  return (
    <div className="off-white-bg">
      <div className="ui container">
        <div
          className="ui secondary pointing menu"
          style={{ marginBottom: ".5rem" }}
        >
          <a
            className={classnames([
              "header",
              { active: selectedMenuItem == "home" },
              "item",
            ])}
            href="/"
          >
            z.i.t.n.r.
          </a>

          <div className="right menu">
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "map" },
                "item",
              ])}
              href="/map"
            >
              <i className="map icon"></i>
            </a>
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "calendar" },
                "item",
              ])}
              href="/calendar/miller-playfield"
            >
              <i className="calendar alternate icon"></i>
            </a>
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "quiz" },
                "item",
              ])}
              href="/quiz"
            >
              <i className="question circle icon"></i>
              <span className="ui red mini label" style={{ fontSize: "0.5em", padding: "2px 4px", marginLeft: "-4px", verticalAlign: "top" }}>NEW</span>
            </a>
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "shop" },
                "item",
              ])}
              href="/shop"
            >
              <i className="shop icon"></i>
            </a>
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "donate" },
                "item",
              ])}
              href="/donate"
            >
              <i className="beer icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
