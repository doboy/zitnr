/**
 * Converts a 24-hour time string into a readable 12-hour time format with AM/PM.
 *
 * @param time - A string representing the time in 24-hour format (e.g., "14:30").
 * @returns A string representing the time in 12-hour format with AM/PM (e.g., "2:30 PM").
 */
export const readableTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const amOrPm = parseInt(hour) < 12 ? "AM" : "PM";
  const normalizedHour =
    parseInt(hour) === 0
      ? 12
      : parseInt(hour) === 12
        ? 12
        : parseInt(hour) % 12;
  return `${normalizedHour}:${minute} ${amOrPm}`;
};
