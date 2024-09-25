import React from "react";
import moment from "moment";

import firebaseApp from "./firebaseApp";

export const TransactionsTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookingsData, setBookingsData] = React.useState({});
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    const db = firebaseApp.firestore();
    const transactionsRef = db.collection("transactions");

    transactionsRef.get().then((querySnapshot) => {
      const bookingsByDate = {};
      let totalCost = 0;

      querySnapshot.forEach((doc) => {
        const transactions = Object.values(doc.data());
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

  const dateFormat = "ddd, MMM Do";
  const timeFormat = "h:mma";
  const todayDate = moment().format("YYYY-MM-DD")

  const sortedBookingDates = Object.keys(bookingsData).sort().reverse();

  var todaysBookings: Array<string> = []
  var pastBookings: Array<string> = []
  var upcomingBookings: Array<string> = []

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
        <td className="collapsing">{moment(bookingDate).format(dateFormat)}</td>
        <td>
          {bookingsData[bookingDate].map((booking) => {
            return (<div key={booking.startDateTime}>
              {moment(booking.startDateTime).format(timeFormat)} - {moment(booking.endDateTime).format(timeFormat)}
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

