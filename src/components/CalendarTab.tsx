import React from "react";
import { DateTime } from "luxon";
import classnames from "classnames";

import { getSecuredReservationsByDate } from "../utils/getSecuredReservationsByDate";
import { getUnreservedByDate } from "../utils/getUnreservedByDate";
import { computeCalendar } from "../utils/computeCalendar";
import COURTS from "../utils/courts";

const MILLER_PARK_COURT_ID = "1374";

const readableTime = (time: string) => {
  const [hour, minute]= time.split(":");
  const amOrPm = parseInt(hour) < 12 ? "AM" : "PM"
  const normalizedHour = parseInt(hour) == 12 ? 12 : parseInt(hour) % 12;
  return `${normalizedHour}:${minute} ${amOrPm}`;
}

export const CalendarTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState(DateTime.now().toFormat("yyyy-MM-dd"));
  const [courtId, setCourtId] = React.useState(MILLER_PARK_COURT_ID);
  const [calendar, setCalendar] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      getSecuredReservationsByDate(courtId, date),
      getUnreservedByDate(courtId, date)
    ]).then(([securedData, unreservedData]) => {
      setIsLoading(false);
      setCalendar(computeCalendar(date, unreservedData, securedData, courtId));
    });
  }, [date, courtId]);

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

      <div className="ui visible yellow message">
        <p>The last day that z.i.t.n.r. will be reserving the courts is September 30th since rainy season is coming. We will start reserving the courts again next year.</p>
      </div>


      <div className={classnames("ui basic segment")}>
        <form className="ui form">
          <div className="two fields">

            <div className="field">
              <label>park</label>
              <div className="ui selection dropdown"
              ref={(ref) => {
                // @ts-ignore
                $(ref).dropdown({
                  onChange: function (value) {
                    setCourtId(value.toString());
                    setCalendar([]);
                    setIsLoading(true);
                  }
                });
              }}
              >
                <input type="hidden" name="courtId" value={courtId} />
                <i className="dropdown icon"></i>
                <div className="default text">court</div>
                <div className="menu">
                  {COURTS.map((court) => {
                    return <div key={court.id} className="item" data-value={court.id}>{court.name}</div>
                  })}
                </div>
              </div>
            </div>

            <div className="field">
              <label>date</label>
              <div className="ui input">
                <input type="date" value={date} placeholder="Search..." onChange={(e) => {
                  setDate(e.target.value);
                  setCalendar([]);
                  setIsLoading(true);
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
                  <div className="description">{readableTime(entry.startTime)} - {readableTime(entry.endTime)}</div>
                </div>
              </div>)
            })}
          </div>
        </div>
      </div>
    </>
  )
};
