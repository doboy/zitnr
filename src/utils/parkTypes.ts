import { Park, PARKS } from "zitnr-utils";

export const isTennisPark = (park: Park): boolean =>
  park.tennisCourtsCount > 0 && park.pickleballCourtsCount === 0;

export const isPickleballPark = (park: Park): boolean =>
  park.pickleballCourtsCount > 0;

export const tennisCourtCount = PARKS.reduce(
  (sum, park) => sum + park.tennisCourtsCount,
  0
);

export const pickleballCourtCount = PARKS.reduce(
  (sum, park) => sum + park.pickleballCourtsCount,
  0
);
