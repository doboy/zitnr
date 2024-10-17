import { TimeArray } from "../types";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from 'firebase/firestore';

export const getUnreservedByDate = async (parkId: number, dateString: string) : Promise<TimeArray> => {
  const db = getFirestore(firebaseApp);
  const unreservedRef = doc(db, "unreserved", `${parkId}-${dateString}`);
  const document = await getDoc(unreservedRef);
  if (document.exists()) {
    return document.data() as TimeArray;
  } else {
    return { times: [] };
  }
};