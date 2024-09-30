import { DateTime } from "luxon";
import { CalendarEntry, TimeArray } from "../types";
import { MILLER_PARK_ID, BAKER_PARK_ID, START_TIME_BY_PARK_ID, END_TIME_BY_PARK_ID } from "../utils/constants";

export const computeCalendar = (date: string, unreservedData: TimeArray, securedData: TimeArray, park: string) : CalendarEntry[] => {
  const timeFormat = "h:mm a";
  const sortTimeFormat = "HH";
  const entries: CalendarEntry[] = [];
  const seen = {};

  if (unreservedData.times) {
    unreservedData.times.forEach((time) => {
      if (seen[time.startTime]) {
        return;
      }
      seen[time.startTime] = true;

      entries.push({
        icon: "green check",
        description: "not reserved",
        startTime: DateTime.fromISO(`${date}T${time.startTime}`).toFormat(timeFormat),
        endTime: DateTime.fromISO(`${date}T${time.endTime}`).toFormat(timeFormat),
        sortKey: DateTime.fromISO(`${date}T${time.startTime}`).toFormat(sortTimeFormat),
      })
    });
  }

  if (securedData.times) {
    securedData.times.forEach((time) => {
      if (seen[time.startTime]) {
        return;
      }
      seen[time.startTime] = true;

      entries.push({
        icon: "green check",
        description: "reserved for open play by z.i.t.n.r.",
        startTime: DateTime.fromISO(`${date}T${time.startTime}`).toFormat(timeFormat),
        endTime: DateTime.fromISO(`${date}T${time.endTime}`).toFormat(timeFormat),
        sortKey: DateTime.fromISO(`${date}T${time.startTime}`).toFormat(sortTimeFormat),
      })
    })
  }

  const dayOfWeek = DateTime.fromISO(date).weekday;
  if (park == MILLER_PARK_ID && (dayOfWeek == 1 || dayOfWeek == 3 || dayOfWeek == 5)) {
    entries.push({
      icon: "green check",
      description: "reserved for open play by LifeLong Recreation",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      sortKey: "10:00",
    })
  } else if (park == BAKER_PARK_ID && (dayOfWeek == 2 || dayOfWeek == 4)) {
    entries.push({
      icon: "green check",
      description: "reserved for open play by LifeLong Recreation",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      sortKey: "10:00",
    })
  }

  entries.sort((a, b) => {
    if (a.sortKey < b.sortKey) {
      return -1;
    } else {
      return 1;
    }
  });

  const finalEntries: CalendarEntry[] = [];
  const finalEndTime = END_TIME_BY_PARK_ID[park];

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];
    if (i == 0) {
      if (START_TIME_BY_PARK_ID[park]) {
        // There is a reservation before
        if (entry.startTime != START_TIME_BY_PARK_ID[park]) {
          finalEntries.push({
            icon: "red x",
            description: "other reservation(s)",
            startTime: START_TIME_BY_PARK_ID[park],
            endTime: entry.startTime,
            sortKey: "n/a",
          })
        }
      } else {
        console.error("START_TIME_BY_PARK_ID for park ${park} is not found");
      }

      finalEntries.push(entry)
    } else {
      const previousEntry = entries[i - 1];
      if (previousEntry.endTime != entry.startTime) {
        // There is a gap, probably a reservation
        finalEntries.push({
          icon: "red x",
          description: "other reservation(s)",
          startTime: previousEntry.endTime,
          endTime: entry.startTime,
          sortKey: "n/a",
        });
      }

      finalEntries.push(entry);
    }

    if (i == entries.length - 1) {
      if (entry.endTime != finalEndTime) {
        finalEntries.push({
          icon: "red x",
          description: "other reservation(s)",
          startTime: entry.endTime,
          endTime: finalEndTime,
          sortKey: "n/a"
        });
      }
    }
  }

  return finalEntries;
};
