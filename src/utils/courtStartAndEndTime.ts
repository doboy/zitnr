import { Park } from "zitnr-utils";

export const courtStartTime = (park: Park, court: Park["courts"][0], dayOfWeek: number) => {
  if (dayOfWeek == 0 || dayOfWeek == 6) { // weekend
    if (park.weekendStartTime) {
      return park.weekendStartTime;
    }
  }

  return court.startTime || park.startTime;
}

export const courtEndTime = (park: Park, court: Park["courts"][0], dayOfWeek: number) => {
  if (dayOfWeek == 0 || dayOfWeek == 6) { // weekend
    if (park.weekendEndTime) {
      return park.weekendEndTime;
    }
  }

  return court.endTime || park.endTime;
}
