import { hashPassword } from "@/lib/auth/password";
import type { DataStore } from "@/lib/data/types";

const DEFAULT_TEST_EMAIL = "demo@example.com";
const DEFAULT_TEST_PASSWORD = "demo-password";

function createStore(): DataStore {
  const email = process.env.TEST_USER_EMAIL?.trim() || DEFAULT_TEST_EMAIL;
  const password = process.env.TEST_USER_PASSWORD || DEFAULT_TEST_PASSWORD;
  const welcomeCreatedAt = new Date("2026-08-18T00:00:00.000Z");
  const questionCreatedAt = new Date("2026-08-17T06:30:00.000Z");

  return {
    users: [
      {
        id: "user-demo",
        email,
        passwordHash: hashPassword(password),
        name: "데모 사용자",
      },
    ],
    posts: [
      {
        id: "post-welcome",
        title: "Codex Board에 오신 것을 환영합니다",
        content:
          "이곳은 생각과 질문을 편안하게 나누는 작은 게시판입니다. 로그인하면 새 글과 댓글로 대화에 참여할 수 있어요.",
        authorId: "user-demo",
        createdAt: welcomeCreatedAt,
        updatedAt: welcomeCreatedAt,
      },
      {
        id: "post-question",
        title: "요즘 가장 흥미롭게 읽은 글은 무엇인가요?",
        content:
          "최근에 읽은 글이나 책 중 오래 기억에 남은 이야기가 있다면 함께 소개해 주세요.",
        authorId: "user-demo",
        createdAt: questionCreatedAt,
        updatedAt: questionCreatedAt,
      },
    ],
    comments: [
      {
        id: "comment-welcome",
        content: "첫 대화를 기다리고 있습니다!",
        postId: "post-welcome",
        authorId: "user-demo",
        createdAt: new Date("2026-08-18T00:15:00.000Z"),
        updatedAt: new Date("2026-08-18T00:15:00.000Z"),
      },
    ],
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
