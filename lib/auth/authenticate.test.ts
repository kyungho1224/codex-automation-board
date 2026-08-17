import { describe, expect, it } from "vitest";

import { authenticate } from "@/lib/auth/authenticate";

describe("authenticate", () => {
  it("accepts the seeded credentials without exposing password data", () => {
    expect(authenticate(" DEMO@example.com ", "demo-password")).toEqual({
      id: "user-demo",
      name: "데모 사용자",
    });
  });

  it("returns null for invalid credentials", () => {
    expect(authenticate("demo@example.com", "wrong-password")).toBeNull();
    expect(authenticate("missing@example.com", "demo-password")).toBeNull();
  });
});
