import React from "react";
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
  const [showPopup, setShowPopup] = React.useState(false);
  const pixelsPerHour = compact ? PIXELS_PER_HOUR / 2 : PIXELS_PER_HOUR;

  const eventStyle = {
    height: `${(end - start) * pixelsPerHour - 1}px`,
    top: `${(start - offset) * pixelsPerHour}px`,
    left: `${(100 / widthDivisor) * position}%`,
    width: `calc(${100 / widthDivisor}% - 8px`,
  };

  const popupContent = location.trim()
    ? `${location}: ${numberToTime(start)} - ${numberToTime(end)}`
    : `${numberToTime(start)} - ${numberToTime(end)}`;

  return (
    <>
      <div
        style={eventStyle}
        className={"calendar__event" + (open ? " open" : "")}
        onClick={() => setShowPopup(!showPopup)}
      >
        <div className="calendar__event__content">
          <div
            className={"calendar__event__content__title" + (open ? " open" : "")}
          >
            {title} <i className="hand point up outline icon" />
          </div>
          <div className="calendar__event__content__location">{location}</div>
        </div>
      </div>
      {showPopup && (
        <div className="calendar__event__popup" style={eventStyle}>
          {popupContent}
        </div>
      )}
    </>
  );
};
