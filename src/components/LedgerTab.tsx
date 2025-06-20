import React from "react";
import classnames from "classnames";

import { getTransactions } from "../utils/getTransactions";
import { TransactionRecord } from "../types";

export const LedgerTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [transactions, setTransactions] = React.useState<Array<TransactionRecord>>([]);
  const [balance, setBalance] = React.useState<number>(0);

  const transactionCacheId = new URLSearchParams(window.location.search).get("code");

  React.useEffect(() => {
    getTransactions(transactionCacheId).then((transactions) => {
      const sortedTransactions = transactions.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      const balance = sortedTransactions.reduce((acc, txn) => {
        if (txn.amount) {
          return acc + txn.amount;
        } else {
          return acc;
        }
      }, 0);
      setBalance(balance);
      setTransactions(transactions);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="ui container">
      <h2 className="ui small header">
        <i className="file alternate icon"></i>
        <div className="content">
          Transactions
        </div>
      </h2>
      <div
        className={classnames([
          "ui",
          { loading: isLoading },
          "very basic segment",
        ])}
      >

        <h2 className="ui center aligned segment">
          Balance: ${isLoading ? <div className="ui active inline loader"></div> : (balance).toFixed(2)}
        </h2>

        <table className="ui very basic table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Info</th>
              <th>Permit</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td>{txn.date.substring(0, 10)}</td>
                <td>{txn.type}</td>
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
    </div>
  );
};
