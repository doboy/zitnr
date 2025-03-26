import React from "react";
import { PIXELS_PER_HOUR } from "./DayCalendar";
import { numberToTime } from "../utils/numberToTime";

export interface CalendarDivisorsProps {
  start: number;
  end: number;
  compact: boolean;
}

export const CalendarDivisors = ({
  start,
  end,
  compact,
}: CalendarDivisorsProps) => {
  const pixelsPerHour = compact ? PIXELS_PER_HOUR / 2 : PIXELS_PER_HOUR;
  const totalHours = end - start;
  const divisors = [];
  const times = [];

  for (let i = 0; i <= totalHours; i += 1) {
    const positionStyle = {
      top: `${i * pixelsPerHour}px`,
    };

    divisors.push(
      <div key={i} style={positionStyle} className="calendar__divisor" />,
    );
  }

  for (let i = 0; i <= totalHours; i += 1) {
    const positionStyle = {
      top: `${i * pixelsPerHour}px`,
      fontWeight: "bold",
    };

    times.push(
      <div key={i} style={positionStyle} className="calendar__divisor__time">
        {numberToTime(start + i)}
      </div>,
    );
  }

  return (
    <div>
      {divisors}
      {times}
    </div>
  );
};
