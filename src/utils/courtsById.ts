import { Court } from "../types";
import COURTS from "./courts";

const courtsById: Record<string, Court> = {};
COURTS.forEach((court) => {
  courtsById[court.id] = court;
});

export { courtsById };
