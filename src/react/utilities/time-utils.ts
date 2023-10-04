export function secondsToHoursString(seconds: number) {
  const minutes = seconds / 60;
  const hours = minutes / 60;
  return hours.toFixed(2).padStart(5, "0");
}
