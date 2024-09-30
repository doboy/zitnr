import { TimeArray } from "../types";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from 'firebase/firestore';

export const getSecuredReservationsByDate = async (parkId: string, dateString: string) : Promise<TimeArray> => {
  const db = getFirestore(firebaseApp);
  const securedDocRef = doc(db, "secured", `${parkId}-${dateString}`);
  const document = await getDoc(securedDocRef);
  if (document.exists()) {
    return document.data() as TimeArray;
  } else {
    return { times: [] };
  }
};