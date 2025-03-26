import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../utils/firebaseApp";
import { Transaction } from "../types";

export const getAllTransactions = async (): Promise<{
  totalCost: number;
  bookingsByDate: {};
}> => {
  const db = getFirestore(firebaseApp);
  const transactionsCol = collection(db, "transactions");

  const querySnapshot = await getDocs(transactionsCol);

  const bookingsByDate = {};
  let totalCost = 0;

  querySnapshot.forEach((doc) => {
    const transactions: Transaction[] = Object.values(doc.data());
    transactions.forEach((transaction) => {
      if (transaction.transactionDateIso > "2024-10-01") {
        return;
      }

      totalCost += transaction.totalCost;
      transaction.bookings.forEach((booking) => {
        const bookingDate = booking.startDateTime.substring(0, 10);
        bookingsByDate[bookingDate] ||= [];
        bookingsByDate[bookingDate].push(booking);
      });
    });
  });

  return {
    totalCost,
    bookingsByDate,
  };
};
