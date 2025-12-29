export function getWindowStart(date: Date, windowMinutes = 1): Date {
  const windowMs = windowMinutes * 60 * 1000;
  return new Date(Math.floor(date.getTime() / windowMs) * windowMs);
}
