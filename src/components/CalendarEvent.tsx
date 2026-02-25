import React, { useState } from "react";
import { PIXELS_PER_HOUR } from "./DayCalendar";
import { numberToTime } from "../utils/numberToTime";

export interface CalendarEventProps {
  offset: number;
  start: number;
  end: number;
  title: string;
  location: string;
  widthDivisor: number;
  position: number;
  compact: boolean;
  open: boolean;
}

export const CalendarEvent = ({
  offset,
  start,
  end,
  title,
  location,
  widthDivisor,
  position,
  compact,
  open,
}: CalendarEventProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const pixelsPerHour = compact ? PIXELS_PER_HOUR / 2 : PIXELS_PER_HOUR;

  const eventStyle = {
    height: `${(end - start) * pixelsPerHour - 1}px`,
    top: `${(start - offset) * pixelsPerHour}px`,
    left: `${(100 / widthDivisor) * position}%`,
    width: `calc(${100 / widthDivisor}% - 8px`,
  };

  const timeRange = `${numberToTime(start)} - ${numberToTime(end)}`;

  return (
    <div
      style={eventStyle}
      className={"calendar__event" + (open ? " open" : "")}
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <div className="calendar__event__content">
        <div
          className={
            "calendar__event__content__title" + (open ? " open" : "")
          }
        >
          {title} <i className="hand point up outline icon" />
        </div>
        <div className="calendar__event__content__location">{location}</div>
      </div>
      {showPopup && (
        <div className="ui small popup visible" style={{
          position: "absolute",
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "4px",
          whiteSpace: "nowrap",
          zIndex: 9999,
          pointerEvents: "none",
        }}>
          <strong>{title}</strong>
          <div>{location}</div>
          <div>{timeRange}</div>
        </div>
      )}
    </div>
  );
};
