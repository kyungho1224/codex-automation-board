import { describe, expect, it } from "vitest";

import { createSessionToken, readSessionToken } from "@/lib/auth/token";

const TEST_SECRET = "a-test-secret-that-is-at-least-32-characters";

describe("session tokens", () => {
  it("round-trips a user id with an expiration", async () => {
    const expiresAt = new Date(Date.now() + 60_000);
    const { token } = await createSessionToken("user-demo", {
      expiresAt,
      secret: TEST_SECRET,
    });

    await expect(readSessionToken(token, TEST_SECRET)).resolves.toEqual({
      userId: "user-demo",
      expiresAt: new Date(Math.floor(expiresAt.getTime() / 1000) * 1000),
    });
  });

  it("rejects tampered, wrongly signed, and expired tokens", async () => {
    const { token } = await createSessionToken("user-demo", {
      expiresAt: new Date(Date.now() - 60_000),
      secret: TEST_SECRET,
    });

    await expect(readSessionToken(`${token}tampered`, TEST_SECRET)).resolves.toBeNull();
    await expect(
      readSessionToken(token, "another-test-secret-that-is-at-least-32-chars"),
    ).resolves.toBeNull();
    await expect(readSessionToken(token, TEST_SECRET)).resolves.toBeNull();
  });
});
