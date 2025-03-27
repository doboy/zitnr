/**
 * Converts a decimal number representing time into a formatted string.
 * For example, 12.5 becomes "12:30 PM".
 *
 * @param number - The time as a decimal number (e.g., 12.5 for 12:30).
 * @returns A formatted time string in 12-hour format with AM/PM.
 */
import { readableTime } from "./readableTime";

export const numberToTime = (number: number) => {
  const hour = Math.floor(number);
  const minute = Math.round((number - hour) * 60);
  const minuteString = minute < 10 ? `0${minute}` : minute.toString();

  return readableTime(`${hour}:${minuteString}`);
};
