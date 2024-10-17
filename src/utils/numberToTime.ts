import { readableTime } from "./readableTime";

/** Converts a number to a string 12.5 =>  12:30 PM */
export const numberToTime = (number: number) => {
  const hour = Math.floor(number);
  const minute = (number - hour) * 60;
  const minuteString = minute < 10 ? `0${minute}` : minute.toString();

  return readableTime(`${hour}:${minuteString}`);
}