import { parksById } from "zitnr-utils";

import { computeCalendar } from "./computeCalendar";
import { getUnreservedTimes } from "./getUnreservedTimes";
import { getSecuredTimes } from "./getSecuredTimes";
import { CalendarEntry } from "../types";

export const getReservationsByParkId = async (
  parkId: number,
  dateString: string,
): Promise<CalendarEntry[]> => {
  const park = parksById[parkId];

  const allEntries = await Promise.all(
    park.courts.map(async (court) => {
      const unreservedTimes = await getUnreservedTimes(court.id, dateString);
      const securedTimes = await getSecuredTimes(court.id, dateString);

      return computeCalendar(
        dateString,
        unreservedTimes,
        securedTimes,
        park,
        court.id,
      );
    }),
  );

  return allEntries.flat();
};
