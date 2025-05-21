import React, { useMemo } from "react";
import { HandlePageChangeType, TransactionRecord } from "../types";
import { BalanceStats } from "./BalanceStats";
import { useTransactions } from "../hooks/useTransactions";

export const HomeTab = ({ handlePageChange }: { handlePageChange: HandlePageChangeType }) => {
  const [_, totalCost, totalDonations] = useTransactions();

  return (
    <>
      <div className="ui basic segment">
        <div className="ui center aligned text container">
          <h1 className="ui header">
            Welcome to z.i.t.n.r.!
          </h1>
          <div>
            A non-profit project aiming to enhance Seattle's Pickleball experience. <br />
            Donations are used to reserve courts for open play at <strong>Capitol Hill, Miller Park</strong>.
          </div>
          <br />
          <button onClick={() => handlePageChange("#donate")} className="ui black button">DONATE</button>
        </div>
      </div>

      <div className="white-bg">
        <div className="ui divider" />
        <div className="ui basic center aligned segment">
          <div className="ui center aligned text container">
            <h1 className="ui header">
              Check reservation schedule
            </h1>
            <div>
              Plan your next session with our <strong>FREE</strong> easy to use calendar view. <br />
              See when courts are available for open play in <strong>40+ parks</strong>.<br />
            </div>
            <br />
            <span>
              <img
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handlePageChange("#calendar");
                }} className="ui segment medium centered image" src="./public/reservation-calendar.png" />
            </span>
            <br />
            <button onClick={() => handlePageChange("#calendar")} className="ui black button">View Calendar</button>
          </div>
        </div>

        <div className="ui divider" />
        <div className="ui basic center aligned segment">
          <div className="ui center aligned text container">
            <h1 className="ui header">
              Open Play - Capitol Hill
            </h1>
            <div>
              Donations are used to reserve courts for open play at <strong>Capitol Hill, Miller Park</strong>.
            </div>
            <br />

            <div className="ui stackable two column grid">
              <div className="column">
                <BalanceStats totalCost={totalCost} totalDonations={totalDonations} />
              </div>
              <div className="column">
                <div>
                  <img
                    className="ui medium centered image" src="./public/miller-park.png" />
                </div>
              </div>
            </div>

            <br />
            <button className="ui black button">DONATE</button>
          </div>
        </div>
      </div>
    </>
  );
};
