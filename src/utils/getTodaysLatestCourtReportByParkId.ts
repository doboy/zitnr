import { query, where, orderBy, limit, getDocs, collection, Firestore } from "firebase/firestore";
import { CourtReport } from "../types";
import { COURT_STATUS_DATABASE_NAME } from "./constants";

export const getTodaysLatestCourtReportByParkId = async (db: Firestore, parkId: number): Promise<CourtReport | undefined> => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const q = query(collection(db, COURT_STATUS_DATABASE_NAME), 
    where("parkId", "==", `${parkId}`),
    where("reportedAtISO", ">=", startOfDay.toISOString()),
    where("reportedAtISO", "<", endOfDay.toISOString()),
    orderBy("reportedAtISO", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    return undefined;
  } else {
    return querySnapshot.docs[0].data() as CourtReport;
  }
};