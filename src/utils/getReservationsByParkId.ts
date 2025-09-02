import { parksById } from "zitnr-utils";

import { computeCalendar } from "./computeCalendar";
import { getUnreservedTimes } from "./getUnreservedTimes";
import { getSecuredTimes } from "./getSecuredTimes";
import { CalendarEntry } from "../types";
import { getReservedTimes } from "./getReservedTimes";

export const getReservationsByParkId = async (
  parkId: number,
  dateString: string,
): Promise<CalendarEntry[]> => {
  const park = parksById[parkId];

  const allEntries = await Promise.all(
    park.courts.map(async (court) => {
      const unreservedTimes = await getUnreservedTimes(court.id, dateString);
      const securedTimes = await getSecuredTimes(court.id, dateString);
      const reservedTimes = await getReservedTimes(court.id, dateString);

      return computeCalendar(
        unreservedTimes,
        securedTimes,
        reservedTimes,
        park,
        court.id,
      );
    }),
  );

  return allEntries.flat();
};
