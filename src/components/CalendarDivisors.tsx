import React from 'react';
import { DateTime } from 'luxon';

export interface CalendarDivisorsProps {
  fromHour: number; // hour
  totalMinutes: number;
  totalMinutesPerDivisor: number;
}

export const CalendarDivisors = ({ totalMinutes, totalMinutesPerDivisor, fromHour }: CalendarDivisorsProps) => {
  const totalDivisors = totalMinutes / totalMinutesPerDivisor;
  const divisors = [];
  const times = [];

  DateTime

  for (let i = 1; i < totalDivisors; i += 1) {
    const positionStyle = {
      top: `${i * totalMinutesPerDivisor}px`,
    };

    divisors.push(
      (
        <div key={i} style={positionStyle} className="calendar__divisor" />
      )
    );
  }

  const totalMinutesPerTime = totalMinutesPerDivisor / 2;
  const totalTimes = totalMinutes / totalMinutesPerTime;
  for (let i = 0; i <= totalTimes; i += 1) {
    const positionStyle = {
      top: `${i * totalMinutesPerTime}px`,
      fontWeight: (i * totalMinutesPerTime) % totalMinutesPerDivisor === 0 ? 'bold' : 'regular',
    };

    times.push(
      (
        <div key={i} style={positionStyle} className="calendar__divisor__time" >
          hh:mm a
        </div>
      )
    );
  }

  return (
    <div>
      { divisors }
      { times }
    </div>
  );
};
