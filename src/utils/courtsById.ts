import COURTS from "./courts";

export interface Court {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
  };

const courtsById : Record<string, Court> = {};
COURTS.forEach((court) => {
  courtsById[court.id] = court;
})

export { courtsById } ;