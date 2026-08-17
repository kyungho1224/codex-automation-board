import { hashPassword } from "@/lib/auth/password";
import type { DataStore } from "@/lib/data/types";

const DEFAULT_TEST_EMAIL = "demo@example.com";
const DEFAULT_TEST_PASSWORD = "demo-password";

function createStore(): DataStore {
  const email = process.env.TEST_USER_EMAIL?.trim() || DEFAULT_TEST_EMAIL;
  const password = process.env.TEST_USER_PASSWORD || DEFAULT_TEST_PASSWORD;

  return {
    users: [
      {
        id: "user-demo",
        email,
        passwordHash: hashPassword(password),
        name: "데모 사용자",
      },
    ],
    posts: [],
    comments: [],
  };
}

const globalStore = globalThis as typeof globalThis & {
  boardStore?: DataStore;
};

export function getStore(): DataStore {
  globalStore.boardStore ??= createStore();
  return globalStore.boardStore;
}

export function resetStoreForTests(): void {
  globalStore.boardStore = createStore();
}
