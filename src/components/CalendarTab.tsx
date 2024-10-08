import React from "react";
import { DateTime } from "luxon";
import classnames from "classnames";

import { getSecuredReservationsByDate } from "../utils/getSecuredReservationsByDate";
import { getUnreservedByDate } from "../utils/getUnreservedByDate";
import { computeCalendar } from "../utils/computeCalendar";
import { MILLER_PARK_ID, PARKS } from "../utils/constants";

export const CalendarTab = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState(DateTime.now().toFormat("yyyy-MM-dd"));
  const [park, setPark] = React.useState(MILLER_PARK_ID);
  const [calendar, setCalendar] = React.useState([]);


  React.useEffect(() => {
    Promise.all([
      getSecuredReservationsByDate(park, date),
      getUnreservedByDate(park, date)
    ]).then(([securedData, unreservedData]) => {
      setIsLoading(false);
      setCalendar(computeCalendar(date, unreservedData, securedData, park));
    });
  }, [date, park]);

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
                    setPark(value);
                    setCalendar([]);
                    setIsLoading(true);
                  }
                });
              }}
              >
                <input type="hidden" name="parkId" value={park} />
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
