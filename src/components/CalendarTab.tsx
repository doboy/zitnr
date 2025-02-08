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

const DayCalendarWrapper = ({calendar, start, end, compact, showTimeline} : {start: number, end: number, calendar: CalendarEntry[], compact: boolean, showTimeline: boolean}) => {
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

    return <DayCalendar events={events} start={start} end={end} compact={compact} showTimeline={showTimeline} />
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
  const message1StorageKey = "m1.1";
  const [showMessage1, setShowMessage1] = React.useState(!localStorage.getItem(message1StorageKey));

  const park = React.useMemo(() => {
    return parksById[parkId];
  }, [parkId])

  React.useEffect(() => {
    if (!park) {
      setIsLoading(false);
      setCalendar([]);
      return;
    }

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
  }, [date, park]);

  return (
    <>
      <h5 className="ui small header" style={{marginTop: ".5rem", marginBottom: ".5rem"}}>
        <i className="calendar alternate icon"></i>
        <div className="content">
          Calendar
          <div className="sub header">
            Query court's reservation schedule
          </div>
        </div>
      </h5>

      {showMessage1 && <div className="ui visible blue message">
        <i className="close icon" onClick={() => {
          localStorage.setItem(message1StorageKey, '1')
          setShowMessage1(false);
        }}></i>
        <p style={{marginTop: 0}}>The last day that z.i.t.n.r. will be reserving the courts is September 30th since rainy season is coming 🌧️ 💦 😅. We will start reserving the courts again next year.</p>
      </div>}

      <div className="very basic segment">
        <form className="ui small form">
          <div className="fields">

            <div className="inline field">
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
                <i className="map marker alternate icon"></i>
                <div className="default text">Park</div>
                <div className="menu">
                  {PARKS.map((park) => {
                    return <div key={park.id} className="item" data-value={park.id}>{park.name}</div>
                  })}
                </div>
              </div>
            </div>

            <div className="inline field">
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

        <div className={classnames(["ui", { loading: isLoading }, "basic segment"])} style={{marginTop: 0}}>
          {park && <DayCalendarWrapper
            compact
            calendar={calendar}
            start={timeToNumber(park.startTime)}
            end={park.endTime == "00:00:00" ? 24 : timeToNumber(park.endTime)}
            showTimeline={date == DateTime.now().toFormat("yyyy-MM-dd")}
          />}
        </div>
      </div>
    </>
  )
};
