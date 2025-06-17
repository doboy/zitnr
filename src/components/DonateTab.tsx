import React, { useMemo } from "react";
import classnames from "classnames";

import { HandlePageChangeType, TransactionRecord } from "../types";
import { getTransactions } from "../utils/getTransactions";
import BalanceChart from "./BalanceChart";
import { BalanceStats } from "./BalanceStats";
import { BalanceWarningMessage } from "./BalanceWarningMessage";

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
      setTransactions(transactions);
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
          Donate via Venmo
        </a>
        <br />
            <img
              onClick={() => window.open(link)}
              style={{ cursor: "pointer" }}
              className="ui segment medium centered image"
              src={`./public/${venmoUsername}-venmo.png`}
            />
      </div>

      <div className={classnames("ui center aligned very basic segment")}>
        <div className="ui stackable grid">
          <div className="four wide column">
          <span className="ui header">Balance stats</span>
            <BalanceStats isLoading={isLoading} totalCost={totalCost} totalDonations={totalDonations} />
          </div>
          <div className="twelve wide column">
          <span className="ui header">Balance over time</span>
            <div className={classnames("ui center aligned very basic segment", { loading: isLoading })}>
              {isLoading ? <div className="ui loader" /> : <BalanceChart transactions={transactions} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
