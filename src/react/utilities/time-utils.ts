function timeToString(time: number) {
  return time.toFixed(2).padStart(5, "0");
}

export function secondsToSecondsString(seconds: number) {
  const time = timeToString(seconds);
  return `${time} s`;
}

export function secondsToMinutesString(seconds: number) {
  const minutes = seconds / 60;
  const time = timeToString(minutes);
  return `${time} m`;
}

export function secondsToHoursString(seconds: number) {
  const hours = seconds / 3600;
  const time = timeToString(hours);
  return `${time} h`;
}

export function secondsToString(seconds: number) {
  if (seconds < 60) {
    return secondsToSecondsString(seconds);
  }

  if (seconds < 3600) {
    return secondsToMinutesString(seconds);
  }

  return secondsToHoursString(seconds);
}
