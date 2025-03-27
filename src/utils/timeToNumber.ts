/** Converts a time string into a number i.e. 12:30 => 12.5 */
export const timeToNumber = (time: string) => {
  const [hour, minute] = time.split(":");

  const hourComponent = parseInt(hour);
  const minuteComponent = parseInt(minute) / 60;

  return hourComponent + minuteComponent;
};
