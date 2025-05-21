import React, { useMemo } from "react";
import { getTransactions } from "../utils/getTransactions";
import { TransactionRecord } from "../types";

export const useTransactions = () => {
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

  return [isLoading, totalCost, totalDonations, transactions] as const;
};