import React, { useMemo } from "react";
import classnames from "classnames";

import { PARKS, parksById, Park, dateToString } from "zitnr-utils";

import { CalendarEntry, HandlePageChangeType } from "../types";
import { DayCalendar } from "./DayCalendar";
import { timeToNumber } from "../utils/timeToNumber";
import { updateQueryStringParameter } from "../utils/updateQueryStringParameter";
import { getReservationsByParkId } from "../utils/getReservationsByParkId";
import { BalanceWarningMessage } from "./BalanceWarningMessage";
import { useTransactions } from "../hooks/useTransactions";

const DayCalendarWrapper = ({
  calendar,
  start,
  end,
  compact,
  showTimeline,
}: {
  start: number;
  end: number;
  calendar: CalendarEntry[];
  compact: boolean;
  showTimeline: boolean;
}) => {
  if (calendar.length == 0) {
    return (
      <div className="ui center aligned basic segment">No results found</div>
    );
  }

  const events = calendar
    .filter((entry) => entry.description != "not reserved")
    .map((entry) => {
      return {
        title: entry.description,
        location: entry.location,
        start: timeToNumber(entry.startTime),
        end: timeToNumber(entry.endTime),
        position: entry.index,
        widthDivisor: entry.widthDivisor,
        key: entry.startTime,
      };
    });

  return (
    <DayCalendar
      events={events}
      start={start}
      end={end}
      compact={compact}
      showTimeline={showTimeline}
    />
  );
};

export const CalendarTab = ({
  handlePageChange
}: {
  handlePageChange: HandlePageChangeType;
}) => {
  const params = new URL(window.location.href).searchParams;
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState(dateToString(new Date()));

  const [parkId, setParkId] = React.useState(
    params.get("parkId") ? parseInt(params.get("parkId")) : PARKS[0].id,
  );

  const [calendar, setCalendar] = React.useState([]);

  const [_, totalCost, totalDonations] = useTransactions();

  const park: Park = React.useMemo(() => {
    return parksById[parkId];
  }, [parkId]);

  const isDateToday = useMemo(() => {
    return date == dateToString(new Date());
  }, [date]);

  React.useEffect(() => {
    if (!park) {
      setIsLoading(false);
      setCalendar([]);
      return;
    }

    getReservationsByParkId(park.id, date).then((calendars) => {
      setIsLoading(false);
      setCalendar(calendars);
    });
  }, [date, park]);

  return (
    <div className="ui container">
      <h5
        className="ui small header"
        style={{ marginTop: ".5rem", marginBottom: ".5rem" }}
      >
        <i className="calendar alternate icon"></i>
        <div className="content">
          Calendar
          <div className="sub header">Query court's reservation schedule</div>
        </div>
      </h5>

      <div className="very basic segment">
        <BalanceWarningMessage totalCost={totalCost} totalDonations={totalDonations} handlePageChange={handlePageChange} />

        <form className="ui small form">
          <div className="fields">
            <div className="inline field">
              <div
                className="ui selection dropdown"
                ref={(ref) => {
                  // @ts-ignore
                  $(ref).dropdown({
                    onChange: function (value) {
                      setParkId(value.toString());
                      updateQueryStringParameter("parkId", value.toString());
                      setCalendar([]);
                      setIsLoading(true);
                      // @ts-ignore
                      gtag('event', 'select-park-in-calendar', {
                        park: parksById[parkId].name,
                      });
                    },
                  });
                }}
              >
                <input type="hidden" name="parkId" value={parkId} />
                <i className="dropdown icon"></i>
                <i className="map marker alternate icon"></i>
                <div className="default text">Park</div>
                <div className="menu">
                  {PARKS.map((park) => {
                    return (
                      <div key={park.id} className="item" data-value={park.id}>
                        {park.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="inline field">
              <div className="ui input">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setCalendar([]);
                    setIsLoading(true);
                  }}
                />
              </div>
            </div>

            {!isDateToday && (
              <div className="inline field">
                <button
                  type="button"
                  className="ui button"
                  onClick={() => {
                    const today = dateToString(new Date());

                    // Important to not use isDateToday because that value
                    // might be stale
                    if (date == today) {
                      return;
                    }

                    setDate(today);
                    setCalendar([]);
                    setIsLoading(true);
                  }}
                >
                  Set to Today
                </button>
              </div>
            )}
          </div>
        </form>

        <div
          className={classnames([
            "ui",
            { loading: isLoading },
            "basic segment",
          ])}
          style={{ marginTop: 0 }}
        >
          {park && (
            <DayCalendarWrapper
              compact
              calendar={calendar}
              start={timeToNumber(park.startTime)}
              end={park.endTime == "00:00:00" ? 24 : timeToNumber(park.endTime)}
              showTimeline={isDateToday}
            />
          )}
        </div>
      </div>
    </div>
  );
};
