import React from "react";
import { HandlePageChangeType } from "../types";
import { BalanceStats } from "./BalanceStats";
import { useTransactions } from "../hooks/useTransactions";

export const HomeTab = ({ handlePageChange }: { handlePageChange: HandlePageChangeType }) => {
  const [isLoadingTransactions, totalCost, totalDonations] = useTransactions();

  return (
    <>
      <div className="ui basic segment">
        <div className="ui center aligned text container">
          <h1 className="ui header">
            Welcome to z.i.t.n.r.!
          </h1>
          <div>
            We're a non-profit using donations to reserve courts for open play at <strong>Miller Park</strong><br /><br/>
            Open play schedule is <br/>
            <strong>Monday-Friday: 5:45-8:15 PM.</strong><br />
            <strong>Monday, Wednesday, Friday: 10:00-12:00 PM.</strong><br /><br/>
            It costs <strong>$37.50</strong> per day — help keep the games going by donating today.
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
                <BalanceStats isLoading={isLoadingTransactions} totalCost={totalCost} totalDonations={totalDonations} />
              </div>
              <div className="column">
                <div>
                  <img
                    className="ui medium centered image" src="./public/miller-park.png" />
                </div>
              </div>
            </div>

            <br />
            <button onClick={() => handlePageChange("#donate")} className="ui black button">DONATE</button>
          </div>
        </div>
      </div>
    </>
  );
};
