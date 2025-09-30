import {
  BeaconHillPlayfield,
  BitterLakePlayfield,
  GreenLakeParkEast,
  MillerPark,
  MountBakerPark,
  Park,
  TimeRange,
  TimeRangeWithOwner,
  TimeRangeWithUsage,
  combineTimes,
  courtsById,
} from "zitnr-utils";

import { CalendarEntry } from "../types";
import { courtEndTime, courtStartTime } from "./courtStartAndEndTime";

export const computeCalendar = (
  unreservedTimes: Array<TimeRange>,
  securedTimes: Array<TimeRangeWithOwner>,
  reservedTimes: Array<TimeRangeWithUsage>,
  park: Park,
  courtId: number,
  dayOfWeek: number,
): CalendarEntry[] => {
  if (unreservedTimes.length == 0 && securedTimes.length == 0) {
    return [];
  }

  const widthDivisor = park.courts.length;
  const index = park.courts.findIndex((court) => court.id == courtId);
  const location =
    park.courts.length == 1 ? " " : `Court ${courtsById[courtId].courtNo}`;

  const entries = combineTimes(
    courtStartTime(park, courtsById[courtId], dayOfWeek),
    courtEndTime(park, courtsById[courtId], dayOfWeek),
    unreservedTimes,
    securedTimes,
    (
      park.name == MillerPark.name ||
      park.name == GreenLakeParkEast.name ||
      park.name == BitterLakePlayfield.name ||
      park.name == BeaconHillPlayfield.name ||
      park.name == MountBakerPark.name
    ) ? reservedTimes : []
  );

  return entries.map((time) => {
    const description =
      time.owner == "zitnr" ||
      time.owner == "GLP" ||
      time.owner == "z.i.t.n.r." ||
      time.owner == "LifeLong Recreation"
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
};
