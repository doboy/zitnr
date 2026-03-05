import { Park, PARKS } from "zitnr-utils";

export const isTennis = (park: Park): boolean => park.slug.includes("tennis");

export const isPickleball = (park: Park): boolean => !isTennis(park);

export const tennisCourtCount = PARKS.filter(isTennis).reduce(
  (sum, park) => sum + park.courts.length,
  0
);

export const pickleballCourtCount = PARKS.filter(isPickleball).reduce(
  (sum, park) => sum + park.courts.length,
  0
);
