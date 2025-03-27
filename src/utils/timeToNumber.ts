/**
 * Converts a time string in the format "HH:MM" into a decimal number.
 *
 * @param time - The time string to convert, formatted as "HH:MM".
 * @returns The time represented as a decimal number, where the hour is the integer part
 *          and the minutes are converted to a fraction of an hour.
 *
 * @example
 * ```typescript
 * timeToNumber("12:30"); // Returns 12.5
 * timeToNumber("09:15"); // Returns 9.25
 * ```
 */
/** Converts a time string into a number i.e. 12:30 => 12.5 */
export const timeToNumber = (time: string) => {
  const [hour, minute] = time.split(":");

  const hourComponent = parseInt(hour);
  const minuteComponent = parseInt(minute) / 60;

  return hourComponent + minuteComponent;
};
