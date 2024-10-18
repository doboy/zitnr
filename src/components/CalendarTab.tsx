import React from "react";
import { DateTime } from "luxon";
import classnames from "classnames";

import { getSecuredReservationsByDate } from "../utils/getSecuredReservationsByDate";
import { getUnreservedByDate } from "../utils/getUnreservedByDate";
import { computeCalendar } from "../utils/computeCalendar";
import PARKS from "../utils/parks";
import { CalendarEntry } from "../types";
import { DayCalendar } from "./DayCalendar";
import { readableTime } from "../utils/readableTime";
import { timeToNumber } from "../utils/timeToNumber";
import { updateQueryStringParameter } from "../utils/updateQueryStringParameter";
import { parksById } from "../utils/parksById";

const USE_DAY_CALENDAR = true;

const DayCalendarWrapper = ({calendar, start, end, compact} : {start: number, end: number, calendar: CalendarEntry[], compact: boolean}) => {
  if (calendar.length == 0) {
    return <div className="ui center aligned basic segment">No results found</div>;
  }

  if (USE_DAY_CALENDAR) {
    const events = calendar.filter((entry) => entry.description != "not reserved").map((entry) => {
      return {
        title: entry.description,
        location: entry.location,
        start: timeToNumber(entry.startTime),
        end: timeToNumber(entry.endTime),
        position: entry.index,
        widthDivisor: entry.widthDivisor,
        key: entry.sortKey,
      }
    });

    return <DayCalendar events={events} start={start} end={end} compact={compact} />
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
  const params = new URL(window.location.href).searchParams;
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState(DateTime.now().toFormat("yyyy-MM-dd"));
  const [parkId, setParkId] = React.useState(params.get("parkId") || PARKS[0].id);
  const [calendar, setCalendar] = React.useState([]);

  React.useEffect(() => {
    const park = parksById[parkId];

    const parkPromises = park.courtIds.map((courtId) => {
      return Promise.all([
        courtId,
        getSecuredReservationsByDate(courtId, date),
        getUnreservedByDate(courtId, date)
      ]);
    })

    Promise.all(parkPromises).then((parkDatas) => {
      let calendars = [];
      parkDatas.forEach(([courtId, securedData, unreservedData]) => {
        calendars = calendars.concat(computeCalendar(date, unreservedData, securedData, park, courtId));
      });

      setIsLoading(false);
      setCalendar(calendars);
    });
  }, [date, parkId]);

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
                    setParkId(value.toString());
                    updateQueryStringParameter("parkId", value.toString());
                    setCalendar([]);
                    setIsLoading(true);
                  }
                });
              }}
              >
                <input type="hidden" name="parkId" value={parkId} />
                <i className="dropdown icon"></i>
                <div className="default text">park</div>
                <div className="menu">
                  {PARKS.map((park) => {
                    return <div key={park.id} className="item" data-value={park.id}>{park.name}</div>
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
            start={timeToNumber(parksById[parkId].startTime)}
            end={parksById[parkId].endTime == "00:00:00" ? 24 : timeToNumber(parksById[parkId].endTime)}
            compact={parksById[parkId].courtIds.length == 1}
          />
        </div>
      </div>
    </>
  )
};
