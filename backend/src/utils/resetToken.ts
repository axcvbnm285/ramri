import crypto from "crypto";

export function hashResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = hashResetToken(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

  return { token, hashedToken, expiresAt };
}
