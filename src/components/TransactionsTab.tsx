import React from "react";
import classnames from "classnames";

import { dateToString } from "zitnr-utils";

import { Booking } from "../types";
import { getAllTransactions } from "./getAllTransactions";

export const TransactionsTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookingsData, setBookingsData] = React.useState({});
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    getAllTransactions().then(({ bookingsByDate, totalCost }) => {
      setBookingsData(bookingsByDate);
      setTotalCost(totalCost);
      setIsLoading(false);
    });
  }, []);

  const timeFormat = "h:mma";
  const todayDate = dateToString(new Date());

  const sortedBookingDates = Object.keys(bookingsData).sort().reverse();

  var todaysBookings: string[] = [];
  var pastBookings: string[] = [];
  var upcomingBookings: string[] = [];

  sortedBookingDates.forEach((bookingDate) => {
    if (bookingDate < todayDate) {
      pastBookings.push(bookingDate);
    } else if (bookingDate > todayDate) {
      upcomingBookings.unshift(bookingDate);
    } else {
      todaysBookings.push(bookingDate);
    }
  });

  function bookingsToTable(label: string, bookingDates: string[]) {
    return bookingDates.map((bookingDate, idx) => {
      return (
        <tr key={bookingDate}>
          <td className="collapsing">
            <strong>{idx == 0 && label}</strong>
          </td>
          <td className="collapsing">{dateToString(new Date(bookingDate))}</td>
          <td>
            {bookingsData[bookingDate].map((booking: Booking) => {
              return (
                <div key={booking.startDateTime}>
                  {booking.startDateTime}
                  &nbsp;-&nbsp;
                  {booking.endDateTime}
                </div>
              );
            })}
          </td>
          <td>Miller</td>
          <td className="collapsing">
            $
            {bookingsData[bookingDate]
              .reduce((total: number, booking: { cost: number }) => {
                return total + booking.cost;
              }, 0)
              .toFixed(0)}
          </td>
        </tr>
      );
    });
  }

  return (
    <>
      <h2 className="ui small header">
        <i className="file alternate icon"></i>
        <div className="content">
          Reservations
          <div className="sub header">
            Table of all reservations made by z.i.t.n.r. for open play
          </div>
        </div>
      </h2>
      <div
        className={classnames([
          "ui",
          { loading: isLoading },
          "very basic segment",
        ])}
      >
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
              <td>
                <strong> ${totalCost.toFixed(0)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
