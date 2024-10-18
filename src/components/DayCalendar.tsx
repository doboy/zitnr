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
  compact: boolean;
}

export const DayCalendar = ({events, start, end, compact} : DayOfCalendaryProps) => {
  const pixelsPerHour = compact ? PIXELS_PER_HOUR / 2 : PIXELS_PER_HOUR;

  const calendarStyle = {
    height: `${(end - start) * pixelsPerHour}px`,
  };

  const eventElements = useMemo(() => {
    return events.map((event, key) => {
      return (
        <CalendarEvent
          compact={compact}
          title={event.title}
          location={event.location}
          offset={start}
          start={event.start}
          end={event.end}
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
        compact={compact}
      />
    </div>
    </div>
  );
};

