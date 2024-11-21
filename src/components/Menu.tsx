import React from "react";
import classnames from "classnames";

import { CalendarTab } from "./CalendarTab";
import { TransactionsTab } from "./TransactionsTab";
import { DonateTab } from "./DonateTab";
import { HomeTab } from "./HomeTab";
import CourtStatusReportTab from "./CourtStatusReportTab";

export const Menu = ({ selectedMenuItem, setSelectedMenuItem }) => {
  return (
    <div className="ui container">
      <div className="ui secondary pointing menu" style={{marginBottom: ".5rem"}}>
        <a href="#zitnr" className={classnames(["header", { active: selectedMenuItem == "#zitnr" || selectedMenuItem == "" }, "item"])} onClick={() => { setSelectedMenuItem("#zitnr") }}>
          z.i.t.n.r.
        </a>

        <div className="right menu">
          <a href="#calendar" className={classnames(["header", { active: selectedMenuItem == "#calendar" }, "item"])} onClick={() => { setSelectedMenuItem("#calendar") }}>
            <i className="calendar alternate icon"></i>
          </a>
          <a href="#reservations" className={classnames(["header", { active: selectedMenuItem == "#reservations" }, "item"])} onClick={() => { setSelectedMenuItem("#reservations") }}>
            <i className="file alternate icon"></i>
          </a>
          <a href="#donate" className={classnames(["header", { active: selectedMenuItem == "#donate" }, "item"])} onClick={() => { setSelectedMenuItem("#donate") }}>
            <i className="money bill alternate icon"></i>
          </a>
          <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSd85TIFziQZHXxZm_9uQ4YDjJVCo4yyrhrvCESlu0ryS-ptZg/viewform?usp=sf_link" className={classnames(["header item"])}>
            <i className="mail icon"></i>
          </a>
          <a href="#court-status" className={classnames(["header", { active: selectedMenuItem == "#court-status" }, "item"])} onClick={() => { setSelectedMenuItem("#court-status") }}>
            <i className="stack exchange icon"></i>
          </a>
        </div>
      </div>
      {(() => {
        if (selectedMenuItem === "#calendar") {
          return <CalendarTab />;
        } else if (selectedMenuItem === "#reservations") {
          return <TransactionsTab />;
        } else if (selectedMenuItem === "#donate") {
          return <DonateTab />
        } else if(selectedMenuItem === "#court-status") {
          return <CourtStatusReportTab />;
        }
        else {
          return <HomeTab />;
        }
      })()}
    </div>
  )
}