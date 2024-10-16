import React from "react";
import { DateTime } from "luxon";
import classnames from "classnames";

import { getSecuredReservationsByDate } from "../utils/getSecuredReservationsByDate";
import { getUnreservedByDate } from "../utils/getUnreservedByDate";
import { computeCalendar } from "../utils/computeCalendar";
import COURTS from "../utils/courts";
import { CalendarEntry } from "../types";
import { DayCalendar } from "./DayCalendar";
import { readableTime } from "../utils/readableTime";
import { timeToNumber } from "../utils/timeToNumber";
import { courtsById } from "../utils/courtsById";

const MILLER_PARK_COURT_ID = "1374";
const USE_DAY_CALENDAR = false;

const DayCalendarWrapper = ({calendar, start, end} : {start: number, end: number, calendar: CalendarEntry[]}) => {
  if (calendar.length == 0) {
    return <div className="ui center aligned basic segment">No results found</div>;
  }

  if (USE_DAY_CALENDAR) {
    const events = calendar.filter((entry) => entry.description != "not reserved").map((entry) => {
      return {
        title: entry.description,
        location: "Court",
        start: timeToNumber(entry.startTime),
        end: timeToNumber(entry.endTime),
        position: 0,
        widthDivisor: 1,
        key: entry.sortKey,
      }
    });

    return <DayCalendar events={events} start={start} end={end} />
  } else {
    return (
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
    );
  }
}

export const CalendarTab = () => {
  const [isLoading, setIsLoading] = React.useState(false); // <<<<<<<<<<<<<<<<
  const [date, setDate] = React.useState(DateTime.now().toFormat("yyyy-MM-dd"));
  const [courtId, setCourtId] = React.useState(MILLER_PARK_COURT_ID);
  const [calendar, setCalendar] = React.useState<CalendarEntry[]>([]);


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
          <DayCalendarWrapper
            calendar={calendar}
            start={timeToNumber(courtsById[courtId].startTime)}
            end={timeToNumber(courtsById[courtId].endTime)}
          />
        </div>
      </div>
    </>
  )
};
