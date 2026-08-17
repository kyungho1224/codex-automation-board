import { verifyPassword } from "@/lib/auth/password";
import { getStore } from "@/lib/data/store";

export type AuthenticatedUser = {
  id: string;
  name: string;
};

export function authenticate(
  email: string,
  password: string,
): AuthenticatedUser | null {
  const normalizedEmail = email.trim().toLocaleLowerCase("en-US");
  const user = getStore().users.find(
    (candidate) => candidate.email.toLocaleLowerCase("en-US") === normalizedEmail,
  );

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return { id: user.id, name: user.name };
}
