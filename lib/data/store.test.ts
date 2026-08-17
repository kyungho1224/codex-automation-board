import { afterEach, describe, expect, it } from "vitest";

import { verifyPassword } from "@/lib/auth/password";
import { getStore, resetStoreForTests } from "@/lib/data/store";

describe("in-memory data store", () => {
  afterEach(() => {
    delete process.env.TEST_USER_EMAIL;
    delete process.env.TEST_USER_PASSWORD;
    resetStoreForTests();
  });

  it("seeds a usable test user without retaining a plaintext password", () => {
    const [user] = getStore().users;

    expect(user.email).toBe("demo@example.com");
    expect(user.passwordHash).not.toContain("demo-password");
    expect(verifyPassword("demo-password", user.passwordHash)).toBe(true);
  });

  it("can seed credentials from the environment", () => {
    process.env.TEST_USER_EMAIL = "local@example.com";
    process.env.TEST_USER_PASSWORD = "local-only-password";
    resetStoreForTests();

    const [user] = getStore().users;
    expect(user.email).toBe("local@example.com");
    expect(verifyPassword("local-only-password", user.passwordHash)).toBe(true);
  });
});
