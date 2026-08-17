import { jwtVerify, SignJWT } from "jose";

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;
const DEVELOPMENT_SECRET = "codex-board-local-development-secret-change-me";

type TokenOptions = {
  expiresAt?: Date;
  secret?: string;
};

export type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

function getSecret(secretOverride?: string): Uint8Array {
  const secret = secretOverride ?? process.env.AUTH_SECRET;

  if (secret && secret.length >= 32) {
    return new TextEncoder().encode(secret);
  }

  if (process.env.NODE_ENV !== "production") {
    return new TextEncoder().encode(DEVELOPMENT_SECRET);
  }

  throw new Error("AUTH_SECRET must contain at least 32 characters in production.");
}

export async function createSessionToken(
  userId: string,
  options: TokenOptions = {},
): Promise<{ token: string; expiresAt: Date }> {
  const expiresAt =
    options.expiresAt ?? new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt.getTime() / 1000))
    .sign(getSecret(options.secret));

  return { token, expiresAt };
}

export async function readSessionToken(
  token: string | undefined,
  secretOverride?: string,
): Promise<SessionPayload | null> {
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret(secretOverride), {
      algorithms: ["HS256"],
    });

    if (!payload.sub || !payload.exp) {
      return null;
    }

    return {
      userId: payload.sub,
      expiresAt: new Date(payload.exp * 1000),
    };
  } catch {
    return null;
  }
}
