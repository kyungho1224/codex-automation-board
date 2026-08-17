import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, encodedHash: string): boolean {
  const [algorithm, salt, storedHash] = encodedHash.split("$");

  if (algorithm !== "scrypt" || !salt || !storedHash) {
    return false;
  }

  const storedBuffer = Buffer.from(storedHash, "hex");
  const suppliedBuffer = scryptSync(password, salt, storedBuffer.length);

  return storedBuffer.length > 0 && timingSafeEqual(storedBuffer, suppliedBuffer);
}
