import { DateTime } from "luxon";

import { Park, combineTimes, courtsById } from "zitnr-utils";

import { CalendarEntry, TimeArray } from "../types";

export const computeCalendar = (
  date: string,
  unreservedData: TimeArray,
  securedData: TimeArray,
  park: Park,
  courtId: number,
): CalendarEntry[] => {
  if (unreservedData.times.length == 0 && securedData.times.length == 0) {
    return [];
  }

  const widthDivisor = park.courtIds.length;
  const index = park.courtIds.indexOf(courtId);
  const location =
    park.courtIds.length == 1 ? " " : courtsById[courtId].courtNo;

  const entries: CalendarEntry[] = combineTimes(date, park, unreservedData.times, securedData.times).map((time) => {
    const description = time.owner == "zitnr" || time.owner == "LifeLong Recreation" ? `open play - ${time.owner}` : time.owner;

    return {
      startTime: time.startTime,
      endTime: time.endTime,
      description,
      widthDivisor,
      index,
      location,
    };
  });

  return entries;
};
