import crypto from "crypto";

export function hashLog(normalizedMessage: string): string {
  return crypto
    .createHash("sha256")
    .update(normalizedMessage)
    .digest("hex");
}
