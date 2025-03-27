export const readableTime = (time: string) => {
  const [hour, minute] = time.split(":");
  const amOrPm = parseInt(hour) < 12 ? "AM" : "PM";
  const normalizedHour = parseInt(hour) === 0 ? 12 : parseInt(hour) === 12 ? 12 : parseInt(hour) % 12;
  return `${normalizedHour}:${minute} ${amOrPm}`;
};
