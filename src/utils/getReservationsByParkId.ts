import { doc, Firestore, getDoc } from "firebase/firestore";
import { CalendarEntry, TimeArray } from "../types";
import { parksById } from "./parksById";
import { computeCalendar } from "./computeCalendar";

export const getReservationsByParkId = async (
  db: Firestore,
  parkId: number,
) => {
  const today = new Date();
  const dateString = today.toISOString().split("T")[0];

  // Get unreserved times for today
  const unreservedRef = doc(db, "unreserved", `${parkId}-${dateString}`);
  const unreservedDoc = await getDoc(unreservedRef);
  const unreservedData = unreservedDoc.exists()
    ? (unreservedDoc.data() as TimeArray)
    : { times: [] };

  // Get secured times for today
  const securedRef = doc(db, "secured", `${parkId}-${dateString}`);
  const securedDoc = await getDoc(securedRef);
  const securedData = securedDoc.exists()
    ? (securedDoc.data() as TimeArray)
    : { times: [] };

  const park = parksById[parkId];
  if (!park) {
    throw new Error(`Park with id ${parkId} not found`);
  }

  // Compute calendar entries for each court
  const allEntries: CalendarEntry[] = [];
  for (const courtId of park.courtIds) {
    const courtEntries = computeCalendar(
      dateString,
      unreservedData,
      securedData,
      park,
      courtId,
    );
    allEntries.push(...courtEntries);
  }

  return allEntries;
};
