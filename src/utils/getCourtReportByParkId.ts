import { collection, Firestore, getDocs } from "firebase/firestore";
import { CourtReport } from "../types";

export const getCourtReportByParkId = async (db: Firestore): Promise<CourtReport | undefined> => {
  const querySnapshot = await getDocs(collection(db, 'courtStatus'));
  const reports: CourtReport[] = querySnapshot.docs.map(doc => doc.data() as CourtReport);

  // Filter reports to only include those for the selected park and within the last day
  const recentReports = reports.filter(report => {
    const reportDate = new Date(report.reportedAtISO);
    const now = new Date();
    const oneDayInMillis = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    return (now.getTime() - reportDate.getTime()) <= oneDayInMillis;
  });

  if (recentReports.length > 0) {
    return recentReports[recentReports.length - 1];
  } else {
    return undefined;
  }
};