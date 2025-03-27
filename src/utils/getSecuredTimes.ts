import { TimeRangeWithOwner } from "zitnr-utils";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from "firebase/firestore";

export const getSecuredTimes = async (
  parkId: number,
  dateString: string,
): Promise<Array<TimeRangeWithOwner>> => {
  const db = getFirestore(firebaseApp);
  const securedDocRef = doc(db, "secured", `${parkId}-${dateString}`);
  const document = await getDoc(securedDocRef);
  if (document.exists()) {
    return document.data().times;
  } else {
    return [];
  }
};
