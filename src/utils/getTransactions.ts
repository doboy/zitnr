import { TransactionRecord } from "../types";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from "firebase/firestore";

export const getTransactions = async (
): Promise<Array<TransactionRecord>> => {
  const db = getFirestore(firebaseApp);
  const transactionsRefDoc = doc(db, "caches", "transactions");
  const document = await getDoc(transactionsRefDoc);
  if (document.exists()) {
    return document.data().records.map((record: any) => {
      return {
        date: record.fields.date,
        amount: record.fields.amount,
        type: record.fields.id,
      }
    });
  } else {
    return [];
  }
};
