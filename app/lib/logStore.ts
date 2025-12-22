export const logs: any[] = [];

export function addLog(log: any) {
  logs.push(log);
}

export function getLogs() {
  return logs;
}
