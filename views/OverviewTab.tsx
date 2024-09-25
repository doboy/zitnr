import React from "react";
import moment from "moment";

import firebaseApp from "./firebaseApp";

export const OverviewTab = () => {
  const venmoUsername = "zack-do";

  const [totalCost, setTotalCost] = React.useState(0);
  const [totalDonations, setTotalDonations] = React.useState(0);


  const MILLER_PARK_ID = "1374";
  const [isLoading, setIsLoading] = React.useState(true);
  const [date] = React.useState(moment().format("YYYY-MM-DD"));
  const [park] = React.useState(MILLER_PARK_ID);
  const [unreservedData, setUnreservedData] = React.useState({});
  const [securedData, setSecuredData] = React.useState({});

  React.useEffect(() => {
    const db = firebaseApp.firestore();
    const transactionsRef = db.collection("transactions");
    const donationsRef = db.collection("donations");
    const unreservedDocRef = db.collection("unreserved").doc(`${park}-${date}`);
    const securedDocRef = db.collection("secured").doc(`${park}-${date}`);

    const promise1 = unreservedDocRef.get().then((doc) => {
      if (doc.exists) {
        setUnreservedData(doc.data());
      } else {
        setUnreservedData({ times: [] })
      }
    });

    const promise2 = securedDocRef.get().then((doc) => {
      if (doc.exists) {
        setSecuredData(doc.data());
      } else {
        setSecuredData({ times: [] })
      }
    });

    Promise.all([
      transactionsRef.get(),
      donationsRef.get(),
      promise1,
      promise2,
    ]).then((results) => {
      let totalCost = 0;
      let totalDonations = 0;
      const donations = [];

      results[0].forEach((doc) => {
        Object.values(doc.data()).forEach((doc) => {
          totalCost += doc.totalCost;
        })
      });

      results[1].forEach((doc) => {
        donation = doc.data();
        totalDonations += donation.amount;
        donations.push(donation);
      });

      setIsLoading(false);
      setTotalCost(totalCost);
      setTotalDonations(totalDonations);
    });
  }, []);

  const calendar = React.useMemo(() => {
    return computeCalendar(date, unreservedData, securedData, park);
  }, [date, unreservedData, securedData, park]);

  return (
    <>
      <h2 className="ui header">
        <i className="table tennis icon"></i>
        <div className="content">
          Miller park
          <div className="sub header">
            {moment().format("L")}
          </div>

        </div>
      </h2>

      <div className={classnames(["ui", { loading: isLoading }, "basic segment"])}>
        {calendar.length == 0 && <div className="ui center aligned basic segment">No results found</div>}
        <div className="ui relaxed list">
          {calendar.map((entry) => {
            return (<div key={entry.startTime} className="item">
              <i className={`${entry.icon} icon`}></i>
              <div className="content">
                <div className="header">{entry.description}</div>
                <div className="description">{entry.startTime} - {entry.endTime}</div>
              </div>
            </div>)
          })}
        </div>
      </div>

      <div className="ui center aligned basic segment">
        <div className="ui grid">
          <div className="one wide column" />
          <div className="six wide column">
            <div className="ui small statistic">
              <div className="value">
                {isLoading ? <div className="ui active inline loader"></div> : <>${totalCost.toFixed(0)}</>}
              </div>
              <div className="label">
                total court reservation costs
              </div>
            </div>
            <img className="ui centered image" src={`./public/website-qr.png`} />
            <span>website</span>
          </div>
          <div className="two wide column" />
          <div className="six wide column">
            <div className={classnames([{ red: totalDonations < totalCost, green: totalDonations > totalCost }, "ui small statistic"])}>
              <div className="value">
                {isLoading ? <div className="ui active inline loader"></div> : <>${totalDonations.toFixed(0)}</>}
              </div>
              <div className="label">
                total donations
              </div>
            </div>
            <img className="ui centered image" src={`./public/${venmoUsername}-venmo.png`} />
            <span>venmo</span>
          </div>
          <div className="one wide column" />
        </div>
      </div>
    </>
  );
}

