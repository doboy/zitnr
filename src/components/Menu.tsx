import React from "react";
import classnames from "classnames";

import { CalendarTab } from "./CalendarTab";
import { TransactionsTab } from "./TransactionsTab";
import { DonateTab } from "./DonateTab";
import { HomeTab } from "./HomeTab";
import CourtStatusReportTab from "./CourtStatusReportTab";
import { LedgerTab } from "./LedgerTab";
import { FundraiserPage } from "./FundraiserPage";

export const Menu = ({ selectedMenuItem, handlePageChange }) => {
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
              { active: selectedMenuItem == "#zitnr" || selectedMenuItem == "" },
              "item",
            ])}
            onClick={() => {
              handlePageChange("#zitnr");
            }}
          >
            z.i.t.n.r.
          </a>

          <div className="right menu">
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "#calendar" },
                "item",
              ])}
              onClick={() => {
                handlePageChange("#calendar");
              }}
            >
              <i className="calendar alternate icon"></i>
            </a>
            {/* <a href="#fundraiser" className={classnames(["header", { active: selectedMenuItem == "#fundraiser" }, "item"])} onClick={() => { handlePageChange("#fundraiser") }}>
              <i className="bomb icon"></i>
              <div className="floating ui red label" style={{left: "70%", top: "2.5rem" }}>new</div>
            </a> */}
            <a
              className={classnames([
                "header",
                { active: selectedMenuItem == "#donate" },
                "item",
              ])}
              onClick={() => {
                handlePageChange("#donate");
              }}
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

      {(() => {
          if (selectedMenuItem === "#calendar" || selectedMenuItem == "#cal") {
            return <CalendarTab handlePageChange={handlePageChange} />;
          } else if (selectedMenuItem === "#reservations") {
            return <TransactionsTab />;
          } else if (selectedMenuItem === "#ledger") {
            return <LedgerTab />;
          } else if (selectedMenuItem === "#donate") {
            return <DonateTab handlePageChange={handlePageChange} />;
          } else if (selectedMenuItem === "#court-status") {
            return <CourtStatusReportTab />;
          } else if (selectedMenuItem === "#fundraiser") {
            return <FundraiserPage />;
          } else {
            return <HomeTab handlePageChange={handlePageChange} />;
          }
        })()}
    </div>
  );
};
