import React, { useMemo } from 'react';
import { CalendarDivisors } from './CalendarDivisors';
import { CalendarEvent } from './CalendarEvent';

export const PIXELS_PER_HOUR = 60;
export interface DayOfCalendaryProps {
  events: {
    title: string;
    location: string;
    start: number;
    end: number;
    position: number;
    widthDivisor: number;
    key: string;
  }[];
  start: number;
  end: number;
}

export const DayCalendar = ({events, start, end} : DayOfCalendaryProps) => {
  const calendarStyle = {
    height: `${(end - start) * PIXELS_PER_HOUR}px`,
  };

  const eventElements = useMemo(() => {
    return events.map((event, key) => {
      return (
        <CalendarEvent
          title={event.title}
          location={event.location}
          start={event.start - start}
          end={event.end - start}
          widthDivisor={event.widthDivisor}
          position={event.position}
          key={key}
        />
      );
    });
  }, [events]);

  return (
    <div className="agenda__calendar">
    <div style={calendarStyle} className="calendar__container">
      { eventElements }
      <CalendarDivisors
        end={end}
        start={start}
      />
    </div>
    </div>
  );
};

