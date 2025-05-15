import React, { useMemo } from "react";
import classnames from "classnames";

import { TransactionRecord } from "../types";
import { getTransactions } from "../utils/getTransactions";
import BalanceChart from "./BalanceChart";

export const DonateTab = () => {
  const venmoUsername = "zack-do";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const link = isMobile
    ? `venmo://users/${venmoUsername}`
    : `https://account.venmo.com/pay?recipients=${venmoUsername}`;

  const [isLoading, setIsLoading] = React.useState(true);

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
    getTransactions().then((transactions) => {
      setTransactions(transactions);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h2 className="ui small header">
        <i className="money bill alternate icon"></i>
        <div className="content">
          Donations
          <div className="sub header">
            Your donations help us continue reserving courts for open play.
          </div>
        </div>
      </h2>
      <div className={classnames("ui center aligned very basic segment")}>
        <div className={classnames("ui center aligned very basic segment", {loading: isLoading})}>
          {isLoading ? <div className="ui loader" /> : <BalanceChart transactions={transactions} />}
        </div>

        <a href={link} className="ui primary button">
          Donate via Venmo
        </a>
        <br />
        <br />
        <img
          onClick={() => window.open(link)}
          style={{cursor: "pointer"}}
          className="ui segment medium centered image"
          src={`./public/${venmoUsername}-venmo.png`}
        />
      </div>
    </>
  );
};
