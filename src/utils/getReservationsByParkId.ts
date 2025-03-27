import { parksById } from "zitnr-utils";

import { computeCalendar } from "./computeCalendar";
import { getUnreservedTimes } from "./getUnreservedTimes";
import { getSecuredTimes } from "./getSecuredTimes";
import { CalendarEntry } from "../types";

export const getReservationsByParkId = async (
  parkId: number,
): Promise<CalendarEntry[]> => {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0];
  const park = parksById[parkId];

  const allEntries = await Promise.all(
    park.courtIds.map(async (courtId) => {
      const unreservedTimes = await getUnreservedTimes(courtId, dateString);
      const securedTimes = await getSecuredTimes(courtId, dateString);
      return computeCalendar(
        dateString,
        unreservedTimes,
        securedTimes,
        park,
        courtId,
      );
    }),
  );

  return allEntries.flat();
};
