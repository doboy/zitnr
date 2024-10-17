import React from 'react';
import { PIXELS_PER_HOUR } from './DayCalendar';

export interface CalendarEventProps {
  start: number;
  end: number;
  title: string;
  location: string;
  widthDivisor: number;
  position: number;
}

export const CalendarEvent = ({ start, end, title, location, widthDivisor, position }: CalendarEventProps) => {
  const eventStyle = {
    height: `${(end - start) * PIXELS_PER_HOUR - 1}px`,
    top: `${start * PIXELS_PER_HOUR}px`,
    left: `${(100 / widthDivisor) * position}%`,
    width: `calc(${100 / widthDivisor}% - 8px`,
  };

  return (
    <div style={eventStyle} className="calendar__event">
      <div className="calendar__event__content">
        <div className="calendar__event__content__title">
          { title || 'Sample Event' }
        </div>
        <div className="calendar__event__content__location">
          { location || 'Sample Location' }
        </div>
      </div>
    </div>
  );
};

