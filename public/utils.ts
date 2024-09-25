import moment from "moment";

export const MILLER_PARK_ID = "1374";
export const BAKER_PARK_ID = "1378";
export const BEACON_HILL_ID = "1319";
export const BITTER_LAKE_1_ID = "1315";
export const BITTER_LAKE_2_ID = "1316";
export const BITTER_LAKE_3_ID = "1317";
export const RAINIER_BEACH_1_ID = "1379";
export const RAINIER_BEACH_2_ID = "1380";
export const RAINIER_BEACH_3_ID = "1381";

export const START_TIME_BY_PARK_ID = {
  [MILLER_PARK_ID]: "7:00 AM",
  [BAKER_PARK_ID]: "6:00 AM",
  [BEACON_HILL_ID]: "7:00 AM",
  [BITTER_LAKE_1_ID]: "7:00 AM",
  [BITTER_LAKE_2_ID]: "7:00 AM",
  [BITTER_LAKE_3_ID]: "7:00 AM",
  [RAINIER_BEACH_1_ID]: "8:30 AM",
  [RAINIER_BEACH_2_ID]: "8:30 AM",
  [RAINIER_BEACH_3_ID]: "8:30 AM",
};

export const END_TIME_BY_PARK_ID = {
  [MILLER_PARK_ID]: "10:00 PM",
  [BAKER_PARK_ID]: "10:00 PM",
  [BEACON_HILL_ID]: "9:00 PM",
  [BITTER_LAKE_1_ID]: "9:45 PM",
  [BITTER_LAKE_2_ID]: "9:45 PM",
  [BITTER_LAKE_3_ID]: "9:45 PM",
  [RAINIER_BEACH_1_ID]: "11:00 PM",
  [RAINIER_BEACH_2_ID]: "11:00 PM",
  [RAINIER_BEACH_3_ID]: "11:00 PM",
};

export const PARKS = [{
  id: MILLER_PARK_ID,
  name: "Miller Park",
}, {
  id: BAKER_PARK_ID,
  name: "Mt. Baker Park",
}, {
  id: BEACON_HILL_ID,
  name: "Beacon Hill Park",
}, {
  id: BITTER_LAKE_1_ID,
  name: "Bitter Lake Court 1",
}, {
  id: BITTER_LAKE_2_ID,
  name: "Bitter Lake Court 2",
}, {
  id: BITTER_LAKE_3_ID,
  name: "Bitter Lake Court 3",
}, {
  id: RAINIER_BEACH_1_ID,
  name: "Rainier Beach Court 1",
}, {
  id: RAINIER_BEACH_2_ID,
  name: "Rainier Beach Court 2",
}, {
  id: RAINIER_BEACH_3_ID,
  name: "Rainier Beach Court 3",
}]

export interface CalendarEntry {
  icon: string,
  description: string,
  startTime: string,
  endTime: string,
  sortKey: string,
};

export const computeCalendar = (date, unreservedData, securedData, park) => {
  const timeFormat = "LT";
  const entries: Array<CalendarEntry> = [];
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
        startTime: moment(`${date} ${time.startTime}`).format(timeFormat),
        endTime: moment(`${date} ${time.endTime}`).format(timeFormat),
        sortKey: moment(`${date} ${time.startTime}`).format("HH:mm"),
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
        startTime: moment(`${date} ${time.startTime}`).format(timeFormat),
        endTime: moment(`${date} ${time.endTime}`).format(timeFormat),
        sortKey: moment(`${date} ${time.startTime}`).format("HH:mm"),
      })
    })
  }

  const dayOfWeek = moment(date).day();
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

  const finalEntries: Array<Omit<CalendarEntry, "sortKey">> = [];
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
        });
      }
    }
  }

  return finalEntries;
};
