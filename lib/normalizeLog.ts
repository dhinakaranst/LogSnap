export function normalizeLog(message: string): string {
  let normalized = message.toLowerCase();

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

  // remove numbers
  normalized = normalized.replace(/\d+/g, "<num>");

  // remove extra spaces
  normalized = normalized.replace(/\s+/g, " ").trim();

  return normalized;
}
