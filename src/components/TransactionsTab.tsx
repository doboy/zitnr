import React from "react";
import { DateTime } from "luxon";
import classnames from "classnames";

import { firebaseApp } from "../utils/firebaseApp";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Transaction } from "../types";

export const TransactionsTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookingsData, setBookingsData] = React.useState({});
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    const db = getFirestore(firebaseApp);
    const transactionsCol = collection(db, "transactions");

    getDocs(transactionsCol).then((querySnapshot) => {
      const bookingsByDate = {};
      let totalCost = 0;

      querySnapshot.forEach((doc) => {
        const transactions: Transaction[] = Object.values(doc.data());
        transactions.forEach((transaction) => {
          totalCost += transaction.totalCost;
          transaction.bookings.forEach((booking) => {
            const bookingDate = booking.startDateTime.substring(0, 10);
            bookingsByDate[bookingDate] ||= []
            bookingsByDate[bookingDate].push(booking);
          });
        });
      });

      setBookingsData(bookingsByDate);
      setTotalCost(totalCost)
      setIsLoading(false);
    });

  }, []);

  const localeFormat = {
    month: 'short' as 'short',
    day: 'numeric' as 'numeric',
    weekday: 'short' as 'short',
  };

  const timeFormat = "h:mma";
  const todayDate = DateTime.now().toFormat("yyyy-MM-dd");

  const sortedBookingDates = Object.keys(bookingsData).sort().reverse();

  var todaysBookings: string[] = [];
  var pastBookings: string[] = [];
  var upcomingBookings: string[] = [];

  sortedBookingDates.forEach((bookingDate) => {
    if (bookingDate < todayDate) {
      pastBookings.push(bookingDate)
    } else if (bookingDate > todayDate) {
      upcomingBookings.unshift(bookingDate)
    } else {
      todaysBookings.push(bookingDate)
    }
  })

  function bookingsToTable(bookings) {
    return bookings.map((bookingDate) => {
      return (<tr key={bookingDate}>
        <td className="collapsing">{DateTime.fromISO(bookingDate).toLocaleString(localeFormat)}</td>
        <td>
          {bookingsData[bookingDate].map((booking) => {
            return (<div key={booking.startDateTime}>
              {DateTime.fromISO(booking.startDateTime.replace(" ", "T")).toFormat(timeFormat)}
              &nbsp;-&nbsp;
              {DateTime.fromISO(booking.endDateTime.replace(" ", "T")).toFormat(timeFormat)}
            </div>)
          })}
        </td>
        <td>Miller</td>
        <td className="collapsing">${bookingsData[bookingDate].reduce((total, booking) => {
          return total + booking.cost;
        }, 0).toFixed(0)}</td>
      </tr>);
    });
  }

  return (
    <>
      <h2 className="ui header">
        <i className="file alternate icon"></i>
        <div className="content">
          Reservations
          <div className="sub header">
            Table of all reservations made by z.i.t.n.r. for open play
          </div>
        </div>
      </h2>
      <div className={classnames(["ui", { loading: isLoading }, "very basic segment"])}>
        <table className="ui very basic table">
          <thead>
            <tr>
              <th>date</th>
              <th>times</th>
              <th>park</th>
              <th>cost</th>
            </tr>
          </thead>
          <tbody>
            <h3>Today</h3>
            {bookingsToTable(todaysBookings)}
            <h3>Upcoming</h3>
            {bookingsToTable(upcomingBookings)}
            <h3>Past</h3>
            {bookingsToTable(pastBookings)}
            <tr>
              <td></td>
              <td></td>
              <td className="right aligned">
                <strong>Total</strong>
              </td>
              <td><strong> ${totalCost.toFixed(0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};

