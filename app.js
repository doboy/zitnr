
const MILLER_PARK_ID = "1374";
const BAKER_PARK_ID = "1378";
const BEACON_HILL_ID = "1319";
const BITTER_LAKE_1_ID = "1315";
const BITTER_LAKE_2_ID = "1316";
const BITTER_LAKE_3_ID = "1317";

const START_TIME_BY_PARK_ID = {
  [MILLER_PARK_ID]: "7:00 AM",
  [BAKER_PARK_ID]: "6:00 AM",
  [BEACON_HILL_ID]: "7:00 AM",
  [BITTER_LAKE_1_ID]: "7:00 AM",
  [BITTER_LAKE_2_ID]: "7:00 AM",
  [BITTER_LAKE_3_ID]: "7:00 AM",
};

const PARKS = [{
  id: MILLER_PARK_ID,
  name: "Miller Park",
}, {
  id: BAKER_PARK_ID,
  name: "Baker Park",
}, {
  id: BEACON_HILL_ID,
  name: "Beacon Hill Park",
}, {
  id: BITTER_LAKE_1_ID,
  name: "Bitter Lake Court 1",
}, {
  id: BITTER_LAKE_2_ID,
  name: "Bitter Lake Court 2",
}, {
  id: BITTER_LAKE_3_ID,
  name: "Bitter Lake Court 3",
}]

const updateQueryStringParameter = (key, val) => {
  const uri = new URL(window.location.href);
  uri.searchParams.set(key, val);
  window.history.replaceState({}, "z.i.t.n.r", uri.href);
};

const classnames = (args) => {
  return args.map((arg) => {
    if (typeof arg == "string") {
      return arg;
    } else {
      return Object.keys(arg).map((key) => {
        if (arg[key]) {
          return key;
        } else {
          return "";
        }
      }).join(" ");
    }
  }).join(" ");
};

const computeCalendar = (date, unreservedData, securedData, park) => {
  const timeFormat = "LT";
  const entries = [];
  const seen = {};

  if (unreservedData.times) {
    unreservedData.times.forEach((time) => {
      if (seen[time.startTime]) {
        return;
      }
      seen[time.startTime] = true;

      entries.push({
        icon: "green check",
        description: "not reserved",
        startTime: moment(`${date} ${time.startTime}`).format(timeFormat),
        endTime: moment(`${date} ${time.endTime}`).format(timeFormat),
        sortKey: moment(`${date} ${time.startTime}`).format("HH:mm"),
      })
    });
  }

  if (securedData.times) {
    securedData.times.forEach((time) => {
      if (seen[time.startTime]) {
        return;
      }
      seen[time.startTime] = true;

      entries.push({
        icon: "green check",
        description: "reserved for open play by z.i.t.n.r.",
        startTime: moment(`${date} ${time.startTime}`).format(timeFormat),
        endTime: moment(`${date} ${time.endTime}`).format(timeFormat),
        sortKey: moment(`${date} ${time.startTime}`).format("HH:mm"),
      })
    })
  }

  const dayOfWeek = moment(date).day();
  if (park == MILLER_PARK_ID && (dayOfWeek == 1 || dayOfWeek == 3 || dayOfWeek == 5)) {
    entries.push({
      icon: "green check",
      description: "city drop-in hours",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      sortKey: "10:00",
    })
  }

  entries.sort((a, b) => {
    if (a.sortKey < b.sortKey) {
      return -1;
    } else {
      return 1;
    }
  });

  const finalEntries = [];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (i == 0) {
      if (START_TIME_BY_PARK_ID[park]) {
        // There is a reservation before
        if (entry.startTime != START_TIME_BY_PARK_ID[park]) {
          finalEntries.push({
            icon: "red x",
            description: "other reservation(s)",
            startTime: START_TIME_BY_PARK_ID[park],
            endTime: entry.startTime,
          })
        }
      } else {
        console.error("START_TIME_BY_PARK_ID for park ${park} is not found");
      }

      finalEntries.push(entry)
    } else {
      const lastEntry = entries[i - 1];
      if (lastEntry.endTime != entry.startTime) {
        // There is a gap, probably a reservation
        finalEntries.push({
          icon: "red x",
          description: "other reservation(s)",
          startTime: lastEntry.endTime,
          endTime: entry.startTime,
        });
      }

      finalEntries.push(entry);
    }

    if (i == entries.length - 1) {
      if (entry.endTime != "10:00 PM") {
        finalEntries.push({
          icon: "red x",
          description: "other reservation(s)",
          startTime: entry.endTime,
          endTime: "10:00 PM",
        });
      }
    }
  }

  return finalEntries;
}

const Menu = ({ selectedMenuItem, setSelectedMenuItem }) => {
  return (
      <div className="ui container">
        <div className="ui secondary pointing menu">
          <a href="#zitnr" className={classnames(["header", { active: selectedMenuItem == "#zitnr" || selectedMenuItem == "" }, "item"])} onClick={() => { setSelectedMenuItem("#zitnr") }}>
            z.i.t.n.r.
          </a>

          <div className="right menu">
            <a href="#calendar" className={classnames(["header", { active: selectedMenuItem == "#calendar" }, "item"])} onClick={() => { setSelectedMenuItem("#calendar") }}>
              <i className="calendar alternate icon"></i>
            </a>
            <a href="#reservations" className={classnames(["header", { active: selectedMenuItem == "#reservations" }, "item"])} onClick={() => { setSelectedMenuItem("#reservations") }}>
              <i className="file alternate icon"></i>
            </a>
            <a href="#donate" className={classnames(["header", { active: selectedMenuItem == "#donate" }, "item"])} onClick={() => { setSelectedMenuItem("#donate") }}>
              <i className="money bill alternate icon"></i>
            </a>
            <a target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSd85TIFziQZHXxZm_9uQ4YDjJVCo4yyrhrvCESlu0ryS-ptZg/viewform?usp=sf_link" className={classnames(["header item"])}>
              <i className="mail icon"></i>
            </a>
          </div>
        </div>
        {(() => {
          if (selectedMenuItem == "#calendar") {
            return <CalendarTab />;
          } else if (selectedMenuItem == "#reservations") {
            return <TransactionsTab />;
          } else if (selectedMenuItem == "#donate") {
            return <DonateTab />
          } else if (selectedMenuItem == "#overview") {
            return <OverviewTab />
          } else {
            return <ZitnrTab />;
          }
        })()}
      </div>
  )
}

const ZitnrTab = () => {
  return <div className="ui basic segment">
    <span>
      Welcome to z.i.t.n.r.! <br /><br />Our project aims to enhance your pickleball experience at Miller Park in Seattle. We do this by reserving courts for open play during peak hours and providing reservations information. If you find this service helpful, please consider supporting us with a donation so we can continue to secure court access for everyone.
    </span>
  </div>
};

const CalendarTab = () => {
  const params = new URL(window.location.href).searchParams;
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState(params.get("date") || moment().format("YYYY-MM-DD"));
  const [park, setPark] = React.useState(params.get("parkId") || MILLER_PARK_ID);
  const [unreservedData, setUnreservedData] = React.useState({});
  const [securedData, setSecuredData] = React.useState({});

  React.useEffect(() => {
    const db = window.firebaseApp.firestore();
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

    Promise.all([promise1, promise2]).then(() => {
      setIsLoading(false);
    });
  }, [date, park]);


  const calendar = React.useMemo(() => {
    return computeCalendar(date, unreservedData, securedData, park);
  }, [date, unreservedData, securedData, park]);

  return (
    <>
      <h2 className="ui header">
        <i className="calendar alternate icon"></i>
        <div className="content">
          Calendar
          <div className="sub header">
            Query court's reservation schedule
          </div>
        </div>
      </h2>

      <div className={classnames(["ui basic segment"])}>
        <form className="ui form">
          <div className="two fields">

            <div className="field">
              <label>park</label>
              <div className="ui selection dropdown" ref={(ref) => {
                $(ref).dropdown({
                  onChange: function (value) {
                    setPark(value);
                    updateQueryStringParameter("parkId", value);
                  }
                });
              }}>
                <input type="hidden" name="parkId" value={park} />
                <i className="dropdown icon"></i>
                <div className="default text">park</div>
                <div className="menu">
                  {PARKS.map((park) => {
                    return <div className="item" data-value={park.id}>{park.name}</div>
                  })}
                </div>
              </div>
            </div>

            <div className="field">
              <label>date</label>
              <div className="ui input">
                <input type="date" value={date} placeholder="Search..." onChange={(e) => {
                  setDate(e.target.value);
                  updateQueryStringParameter("date", e.target.value);
                }} />
              </div>
            </div>
          </div>
        </form>

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
      </div>
    </>
  )
};

const TransactionsTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookingsData, setBookingsData] = React.useState({});
  const [totalCost, setTotalCost] = React.useState(0);

  React.useEffect(() => {
    const db = window.firebaseApp.firestore();
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

  var todaysBookings = []
  var pastBookings = []
  var upcomingBookings = []

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
        }, 0).toFixed(2)}</td>
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
              <td><strong> ${totalCost.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};

const DonateTab = () => {
  const venmoUsername = "zack-do";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const link = isMobile ? `venmo://users/${venmoUsername}` : `https://account.venmo.com/pay?recipients=${venmoUsername}`

  const [isLoading, setIsLoading] = React.useState(true);
  const [totalCost, setTotalCost] = React.useState(0);
  const [totalDonations, setTotalDonations] = React.useState(0);

  React.useEffect(() => {
    const db = window.firebaseApp.firestore();
    const transactionsRef = db.collection("transactions");
    const donationsRef = db.collection("donations");

    Promise.all([
      transactionsRef.get(),
      donationsRef.get(),
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

  return (
    <>
      <h2 className="ui header">
        <i className="money bill alternate icon"></i>
        <div className="content">
          Donations
          <div className="sub header">
            Your donations help us continue reserving courts for open play.
          </div>
        </div>
      </h2>
      <div className="ui center aligned basic segment">
        <div className="ui small statistic">
          <div className="value">
            {isLoading ? <div className="ui active inline loader"></div> : <>${totalCost.toFixed(2)}</>}
          </div>
          <div className="label">
            total cost
          </div>
        </div><br />
        <div className={classnames([{ red: totalDonations < totalCost, green: totalDonations > totalCost }, "ui small statistic"])}>
          <div className="value">
            {isLoading ? <div className="ui active inline loader"></div> : <>${totalDonations.toFixed(2)}</>}
          </div>
          <div className="label">
            total donations
          </div>
        </div>

        <img className="ui segment large centered image" src={`./${venmoUsername}-venmo.png`} />
        <a href={link} className="ui primary button">Venmo</a><br /><br />
      </div>
    </>
  );
}

const OverviewTab = () => {
  const venmoUsername = "zack-do";

  const [totalCost, setTotalCost] = React.useState(0);
  const [totalDonations, setTotalDonations] = React.useState(0);


  const MILLER_PARK_ID = "1374";
  const params = new URL(window.location.href).searchParams;
  const [isLoading, setIsLoading] = React.useState(true);
  const [date] = React.useState(params.get("date") || moment().format("YYYY-MM-DD"));
  const [park] = React.useState(params.get("parkId") || MILLER_PARK_ID);
  const [unreservedData, setUnreservedData] = React.useState({});
  const [securedData, setSecuredData] = React.useState({});

  React.useEffect(() => {
    const db = window.firebaseApp.firestore();
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
                {isLoading ? <div className="ui active inline loader"></div> : <>${totalCost.toFixed(2)}</>}
              </div>
              <div className="label">
                total cost
              </div>
            </div>
            <img className="ui centered image" src={`./website-qr.png`} />
            <span>website</span>
          </div>
          <div className="two wide column" />
          <div className="six wide column">
            <div className={classnames([{ red: totalDonations < totalCost, green: totalDonations > totalCost }, "ui small statistic"])}>
              <div className="value">
                {isLoading ? <div className="ui active inline loader"></div> : <>${totalDonations.toFixed(2)}</>}
              </div>
              <div className="label">
                total donations
              </div>
            </div>
            <img className="ui centered image" src={`./${venmoUsername}-venmo.png`} />
            <span>venmo</span>
          </div>
          <div className="one wide column" />
        </div>
      </div>
    </>
  );
}

const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(window.location.hash);

  return <Menu selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
};
