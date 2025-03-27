import { DateTime } from "luxon";

export const nowDateString = () : string => {
  return DateTime.now().setZone("America/Los_Angeles").toFormat("yyyy-MM-dd");
};