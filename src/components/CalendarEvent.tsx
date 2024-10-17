import React from 'react';
import { PIXELS_PER_HOUR } from './DayCalendar';
import { numberToTime } from '../utils/numberToTime';

export interface CalendarEventProps {
  offset: number;
  start: number;
  end: number;
  title: string;
  location: string;
  widthDivisor: number;
  position: number;
}

export const CalendarEvent = ({ offset, start, end, title, location, widthDivisor, position }: CalendarEventProps) => {
  const eventStyle = {
    height: `${(end - start) * PIXELS_PER_HOUR - 1}px`,
    top: `${(start - offset) * PIXELS_PER_HOUR}px`,
    left: `${(100 / widthDivisor) * position}%`,
    width: `calc(${100 / widthDivisor}% - 8px`,
  };

  return (
    <div style={eventStyle}
      className="calendar__event"
      data-content={`${numberToTime(start)} - ${numberToTime(end)}`}
      title="asdf"
      ref={(ref) => {
        // @ts-ignore
        $(ref).popup();
      }}
    >
      <div className="calendar__event__content">
        <div className="calendar__event__content__title">
          { title }
        </div>
        <div className="calendar__event__content__location">
          { location }
        </div>
      </div>
    </div>
  );
};

