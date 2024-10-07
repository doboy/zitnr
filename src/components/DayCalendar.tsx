import React, { useMemo } from 'react';
import { CalendarDivisors } from './CalendarDivisors';
import { CalendarEvent } from './CalendarEvent';

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
  toHour: number;
  fromHour: number;
}

export const DayCalendar = ({events, toHour, fromHour} : DayOfCalendaryProps) => {
  const totalMinutesPerDivisor = 60;
  const totalMinutes = (toHour - fromHour) * totalMinutesPerDivisor;
  const calendarStyle = {
    height: `${totalMinutes}px`,
  };

  const eventElements = useMemo(() => {
    return events.map((event, key) => {
      return (
        <CalendarEvent
          title="title"
          location="location"
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
    <div style={{marginTop: 50}} className="agenda__calendar">
    <div style={calendarStyle} className="calendar__container">
      { eventElements }
      <CalendarDivisors
        fromHour={fromHour}
        totalMinutes={totalMinutes}
        totalMinutesPerDivisor={totalMinutesPerDivisor}
      />
    </div>
    </div>
  );
};

