import React, { useMemo } from "react";
import classnames from "classnames";
import { useRouter } from 'next/router';

import { PARKS, parksById, Park, dateToString } from "zitnr-utils";

import { CalendarEntry } from "../../types";
import { DayCalendar } from "../../components/DayCalendar";
import { timeToNumber } from "../../utils/timeToNumber";
import { getReservationsByParkId } from "../../utils/getReservationsByParkId";
import { Dropdown } from "semantic-ui-react";
import Layout from "../../components/Layout";

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

const Calendar = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState(dateToString(new Date()));

  const router = useRouter();

  const parkId = React.useMemo(() => {
    const park = PARKS.find((p) => p.slug === router.query.slug);
    return park ? park.id : PARKS[0].id;
  }, [router.query.slug]);

  const [calendar, setCalendar] = React.useState<Array<CalendarEntry>>([]);

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

  const dropdownOptions = useMemo(() => {
    return PARKS.map((park) => ({
      key: park.id,
      text: park.name,
      value: park.id,
    }));
  }, []);

  return (
    <Layout title={`${park.name} Reservation Calendar`} selectedMenuItem="calendar">
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
          <form className="ui small form">
            <div className="fields">
              <div className="inline field">
                <Dropdown selection options={dropdownOptions} value={park.id} onChange={(e, dropdownProps) => {
                  const parkId = dropdownProps.value;
                  if (parkId && parkId.toString() != park.id.toString()) {
                    router.push(`/calendar/${parksById[parkId.toString()].slug}`)
                    setIsLoading(true)
                  }
                }}/>
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
    </Layout>
  );
};

export default Calendar;