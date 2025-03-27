import {
  Park,
  TimeRange,
  TimeRangeWithOwner,
  combineTimes,
  courtsById,
} from "zitnr-utils";

import { CalendarEntry } from "../types";

export const computeCalendar = (
  date: string,
  unreservedTimes: Array<TimeRange>,
  securedTimes: Array<TimeRangeWithOwner>,
  park: Park,
  courtId: number,
): CalendarEntry[] => {
  if (unreservedTimes.length == 0 && securedTimes.length == 0) {
    return [];
  }

  const widthDivisor = park.courtIds.length;
  const index = park.courtIds.indexOf(courtId);
  const location =
    park.courtIds.length == 1 ? " " : courtsById[courtId].courtNo;

  const entries: CalendarEntry[] = combineTimes(
    date,
    park,
    unreservedTimes,
    securedTimes,
  ).map((time) => {
    const description =
      time.owner == "zitnr" || time.owner == "LifeLong Recreation"
        ? `open play - ${time.owner}`
        : time.owner;

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
