import { Park } from "../types";
import PARKS from "./parks";

const parksById: Record<string, Park> = {};
PARKS.forEach((park) => {
  parksById[park.id] = park;
});

export { parksById };
