import React from "react";
import { DateTime } from "luxon";
import classnames from "classnames";

// import { firebaseApp } from "../utils/firebaseApp";
// import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Booking } from "../types";
import { getAllTransactions } from "./getAllTransactions";

export const TransactionsTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookingsData, setBookingsData] = React.useState({});
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    getAllTransactions().then(({bookingsByDate, totalCost}) => {
      setBookingsData(bookingsByDate);
      setTotalCost(totalCost);
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

  function bookingsToTable(label: string, bookingDates: string[]) {
    return bookingDates.map((bookingDate, idx) => {
      return (<tr key={bookingDate}>
        <td className="collapsing">
          <strong>{idx == 0 && label}</strong>
        </td>
        <td className="collapsing">{DateTime.fromISO(bookingDate).toLocaleString(localeFormat)}</td>
        <td>
          {bookingsData[bookingDate].map((booking: Booking) => {
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
              <th></th>
              <th>Date</th>
              <th>Times</th>
              <th>Park</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {bookingsToTable("Today", todaysBookings)}
            {bookingsToTable("Upcoming", upcomingBookings)}
            {bookingsToTable("Past", pastBookings)}
            <tr>
              <td></td>
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

