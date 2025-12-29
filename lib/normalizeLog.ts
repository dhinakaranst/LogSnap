export function normalizeLog(message: string): string {
  let normalized = message.toLowerCase();

  // protect HTTP status codes using letter-based placeholders
  const statusCodes: string[] = [];
  const placeholders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  normalized = normalized.replace(/\b(4\d{2}|5\d{2})\b/g, (match) => {
    const index = statusCodes.length;
    statusCodes.push(match);
    return `__STATUS_${placeholders[index]}__`;
  });

  // remove UUIDs
  normalized = normalized.replace(
    /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/g,
    "<uuid>"
  );

  // remove IP addresses
  normalized = normalized.replace(
    /\b\d{1,3}(\.\d{1,3}){3}\b/g,
    "<ip>"
  );

  // remove remaining numbers
  normalized = normalized.replace(/\d+/g, "<num>");

  // restore HTTP status codes
  statusCodes.forEach((code, index) => {
    normalized = normalized.replace(
      `__STATUS_${placeholders[index]}__`,
      code
    );
  });

  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}
