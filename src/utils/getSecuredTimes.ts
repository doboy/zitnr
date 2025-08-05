import { courtsById, GreenLakeParkEast, MillerPark, MountBakerPark, parksById, TimeRangeWithOwner } from "zitnr-utils";
import { firebaseApp } from "./firebaseApp";

import { getFirestore, getDoc, doc } from "firebase/firestore";

export const getSecuredTimes = async (
  courtId: number,
  dateString: string,
): Promise<Array<TimeRangeWithOwner>> => {
  const dayOfWeek = new Date(dateString).getUTCDay();
  const dayOfMonth = new Date(dateString).getUTCDate();
  const month = new Date(dateString).getUTCMonth() + 1;
  const court = courtsById[courtId];
  const park = parksById[court.parkId];

  const db = getFirestore(firebaseApp);
  const securedDocRef = doc(db, "secured", `${courtId}-${dateString}`);
  const document = await getDoc(securedDocRef);
  let result: Array<TimeRangeWithOwner> = [];

  if (document.exists()) {
    result = document.data().times;
  };

  if (
    park.id == MillerPark.id &&
    (dayOfWeek == 1 || dayOfWeek == 3 || dayOfWeek == 5)
  ) {
    result.push({
      startTime: "10:00:00",
      endTime: "12:00:00",
      owner: "LifeLong Recreation",
    });
  }

  if (park.id == MountBakerPark.id && (dayOfWeek == 2 || dayOfWeek == 4)) {
    result.push({
      startTime: "10:00:00",
      endTime: "12:00:00",
      owner: "LifeLong Recreation",
    });
  }

  if (
    park.id == GreenLakeParkEast.id &&
    month == 8 &&
    (courtId == park.courts[0].id || courtId == park.courts[2].id)
  ) {
    if (dayOfWeek == 1) {
      result.push({
        startTime: "18:45:00",
        endTime: "19:45:00",
        owner: "GLP",
      });
    }

    if (dayOfWeek == 2) {
      result.push({
        startTime: "17:30:00",
        endTime: "19:45:00",
        owner: "GLP",
      });
    }

    if (dayOfWeek == 3) {
      result.push({
        startTime: "17:00:00",
        endTime: "19:45:00",
        owner: "GLP",
      });
    }

    if (dayOfWeek == 4) {
      result.push({
        startTime: "11:00:00",
        endTime: "14:00:00",
        owner: "GLP",
      });

      result.push({
        startTime: "18:45:00",
        endTime: "19:45:00",
        owner: "GLP",
      });
    }

    if (dayOfWeek == 5) {
      result.push({
        startTime: "18:45:00",
        endTime: "19:45:00",
        owner: "GLP",
      });
    }

    if (dayOfWeek == 6 || dayOfWeek == 0) {
      if (dayOfMonth == 9) {
        result.push({
          startTime: "11:00:00",
          endTime: "14:00:00",
          owner: "GLP",
        });
      } else {
        result.push({
          startTime: "10:00:00",
          endTime: "14:00:00",
          owner: "GLP",
        });
      }
    }
  }

  return result;
};
