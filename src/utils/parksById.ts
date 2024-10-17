import PARKS from "./parks";

export interface Park {
    id: number;
    name: string;
    courtIds: number[];
    startTime: string;
    endTime: string;
  };

const parksById : Record<string, Park> = {};
PARKS.forEach((park) => {
  parksById[park.id] = park;
})

export { parksById } ;
