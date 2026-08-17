import "server-only";

import { cookies } from "next/headers";

import { createSessionToken, readSessionToken } from "@/lib/auth/token";

export const SESSION_COOKIE_NAME = "codex-board-session";

export async function createSession(userId: string): Promise<void> {
  const { token, expiresAt } = await createSessionToken(userId);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
    priority: "high",
  });
}

export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return readSessionToken(token);
}

export async function deleteSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}
