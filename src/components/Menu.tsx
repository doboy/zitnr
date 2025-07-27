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
                { active: selectedMenuItem == "donate" },
                "item",
              ])}
              href="/donate"
            >
              <i className="beer icon"></i>
            </a>
            <a
              target="_blank"
              href="https://docs.google.com/forms/d/e/1FAIpQLSd85TIFziQZHXxZm_9uQ4YDjJVCo4yyrhrvCESlu0ryS-ptZg/viewform?usp=sf_link"
              className={classnames(["header item"])}
            >
              <i className="mail icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
