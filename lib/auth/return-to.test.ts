import { describe, expect, it } from "vitest";

import { getSafeReturnTo } from "@/lib/auth/return-to";

describe("getSafeReturnTo", () => {
  it("preserves safe local paths", () => {
    expect(getSafeReturnTo("/posts/new?draft=true#form")).toBe(
      "/posts/new?draft=true#form",
    );
  });

  it.each([
    "https://example.com/steal",
    "//example.com/steal",
    "/\\example.com/steal",
    "posts/new",
    undefined,
  ])("falls back for an unsafe destination: %s", (destination) => {
    expect(getSafeReturnTo(destination)).toBe("/");
  });
});
