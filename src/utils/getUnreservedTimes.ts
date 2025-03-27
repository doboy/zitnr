import { TimeRange, UnreservedDoc } from "zitnr-utils";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from "firebase/firestore";

export const getUnreservedTimes = async (
  courtId: number,
  dateString: string,
): Promise<Array<TimeRange>> => {
  const db = getFirestore(firebaseApp);

  const unreservedRef = doc(db, "unreserved", `${courtId}-${dateString}`);
  const document = await getDoc(unreservedRef);
  if (document.exists()) {
    return (document.data() as UnreservedDoc).times;
  } else {
    return [];
  }
};
