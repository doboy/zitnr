import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDivisors } from './CalendarDivisors';
import { CalendarEvent } from './CalendarEvent';
import { DateTime } from 'luxon';
import { timeToNumber } from '../utils/timeToNumber';

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
  showTimeline: boolean;
}

export const DayCalendar = ({events, start, end, compact, showTimeline} : DayOfCalendaryProps) => {
  const pixelsPerHour = compact ? PIXELS_PER_HOUR / 2 : PIXELS_PER_HOUR;

  const calendarStyle = {
    height: `${(end - start) * pixelsPerHour}px`,
  };

  const [currentTime, setCurrentTime] = useState(DateTime.now().setZone('America/Los_Angeles'));
  const currentTimeToNumber = timeToNumber(currentTime.toFormat("HH:mm:ss"));

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(DateTime.now().setZone('America/Los_Angeles')), 1000 * 60);
    return () => clearInterval(timerId);
  });

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
      {showTimeline && currentTimeToNumber > start && currentTimeToNumber < end && (
        <>
          <div className="timeline" style={{top: (currentTimeToNumber - start) * pixelsPerHour}} />
          <div className="timeline-dot" style={{top: (currentTimeToNumber - start) * pixelsPerHour - 3}} />
        </>
      )}
    </div>
    </div>
  );
};

