import { ReservationDoc, TimeRangeWithUsage } from "zitnr-utils";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from "firebase/firestore";

export const getReservedTimes = async (
  courtId: number,
  dateString: string,
): Promise<Array<TimeRangeWithUsage>> => {

  const db = getFirestore(firebaseApp);

  const reservedRef = doc(db, "reservation", `${courtId}-${dateString}`);
  const document = await getDoc(reservedRef);
  if (document.exists()) {
    return (document.data() as ReservationDoc).times;
  } else {
    return [];
  }
};
