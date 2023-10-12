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

export function getAvailableDayMinutes() {
  const date = new Date();
  const now = date.getTime();
  const midnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999,
  ).getTime();
  const diff = (midnight - now) / 1000 / 60;
  const chunks = Math.floor(diff / 30);
  let offset = 100 * date.getHours() + (date.getMinutes() > 30 ? 100 : 30);
  const available = [];
  for (let i = 0; i < chunks; ++i) {
    available.push(offset);
    offset += 30;
    let hours = Math.floor(offset / 100);
    let minutes = offset % 100;
    if (minutes > 30) {
      hours += 1;
      minutes -= 60;
    }
    offset = 100 * hours + minutes;
  }
  return available;
}

export function timeNumberToString(time: number) {
  const hours = Math.floor(time / 100)
    .toString()
    .padStart(2, "0");
  const minutes = (time % 100).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function timeStringToNumber(time: string) {
  return parseInt(time.replace(":", ""));
}
