import React, { useMemo } from "react";
import classnames from "classnames";

import { HandlePageChangeType, TransactionRecord } from "../types";
import { getTransactions } from "../utils/getTransactions";
import BalanceChart from "./BalanceChart";
import { BalanceStats } from "./BalanceStats";
import { BalanceWarningMessage } from "./BalanceWarningMessage";
import classNames from "classnames";

export const DonateTab = ({
  handlePageChange
}: {
  handlePageChange: HandlePageChangeType,
}) => {
  const venmoUsername = "zack-do";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const link = isMobile
    ? `venmo://users/${venmoUsername}`
    : `https://account.venmo.com/pay?recipients=${venmoUsername}`;

  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("balance-stats");
  const [transactions, setTransactions] = React.useState<TransactionRecord[]>([]);

  const totalCost = useMemo(() => {
    return transactions.filter((txn) => txn.type === "charge" || txn.type == "refund").reduce(
      (acc, txn) => acc + txn.amount,
      0,
    );
  }, [transactions]);

  const totalDonations = useMemo(() => {
    return transactions.filter((txn) => txn.type === "donation").reduce(
      (acc, txn) => acc + txn.amount,
      0,
    ) * -1;
  }, [transactions]);

  React.useEffect(() => {
    getTransactions("transactions-za1b2c3d4e5f6g7h8i9j0k1l2").then((transactions) => {
      const sortedTransactions = transactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setTransactions(sortedTransactions);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="ui container">
      <h2 className="ui small header">
        <i className="money bill alternate icon"></i>
        <div className="content">
          Donations
          <div className="sub header">
            Your donations help us continue reserving courts for open play at <strong>Capitol Hill, Miller Park</strong>.
          </div>
        </div>
      </h2>
      <BalanceWarningMessage totalCost={totalCost} totalDonations={totalDonations} handlePageChange={handlePageChange}/>

      <h2 className="ui center aligned text container">
        Reservation costs <strong>$37.50</strong> per day — help keep the games going by donating today.
      </h2>

      <div className={classnames("ui center aligned very basic segment")}>
        <a href={link} className="ui primary button">
          Donate with Venmo
        </a>
      </div>

      <div className="ui top attached tabular menu">
        <div style={{cursor: "pointer"}} onClick={() => { setActiveTab("balance-stats") }} className={classNames({ active: activeTab == "balance-stats" }, "item")}><i className="hashtag icon" /></div>
        <div style={{cursor: "pointer"}} onClick={() => { setActiveTab("balance-graph") }} className={classNames({ active: activeTab == "balance-graph" }, "item")}><i className="chart line icon" /></div>
        <div style={{cursor: "pointer"}} onClick={() => { setActiveTab("permits-donations") }} className={classNames({ active: activeTab == "permits-donations" }, "item")}><i className="file alternate icon"></i></div>
      </div>
      <div className={classnames("ui bottom attached active tab", { loading: isLoading }, "segment")}>
        {activeTab === "balance-stats" && (
          <div className="ui center aligned very basic segment">
            <h2>Balance stats</h2>
            <BalanceStats isLoading={isLoading} totalCost={totalCost} totalDonations={totalDonations} />
          </div>
        )}
        {activeTab === "balance-graph" && (
          <div className={classnames("ui center aligned very basic segment", { loading: isLoading })}>
            <h2>Balance over time</h2>
            <BalanceChart transactions={transactions} />
          </div>
        )}
        {activeTab === "permits-donations" && (
          <div className="ui center aligned very basic segment">
            <h2>Permits and donations</h2>
            <table className="ui very basic table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Info</th>
                  <th>Permit</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, index) => (
                  <tr key={index}>
                    <td>{txn.type == "charge" ? "permit" : txn.type}</td>
                    <td className="right aligned">
                      {txn.amount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>{txn.info}</td>
                    <td>{txn.permit ? <a href={txn.permit}><i className="file alternate icon"></i></a> : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


      <div className={classnames("ui center aligned very basic segment")}>
        <img
          onClick={() => window.open(link)}
          style={{ cursor: "pointer" }}
          className="ui segment medium centered image"
          src={`./public/${venmoUsername}-venmo.png`}
        />
        <a href={link} className="ui primary button">
          Donate with Venmo
        </a>
      </div>
    </div>
  );
};
