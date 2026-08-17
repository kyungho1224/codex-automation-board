import "server-only";

import { getSession } from "@/lib/auth/session";
import { getStore } from "@/lib/data/store";

export type CurrentUser = {
  id: string;
  name: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = getStore().users.find((candidate) => candidate.id === session.userId);

  return user ? { id: user.id, name: user.name } : null;
}

export class UnauthorizedError extends Error {
  constructor() {
    super("Authentication is required.");
    this.name = "UnauthorizedError";
  }
}

export async function requireCurrentUser(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
}
