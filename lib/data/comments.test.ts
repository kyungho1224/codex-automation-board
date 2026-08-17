import { afterEach, describe, expect, it } from "vitest";

import { listCommentsForPost } from "@/lib/data/comments";
import { getStore, resetStoreForTests } from "@/lib/data/store";

describe("listCommentsForPost", () => {
  afterEach(() => {
    resetStoreForTests();
  });

  it("returns safe comment data oldest first for the requested post", () => {
    const store = getStore();
    const createdAt = new Date("2026-08-18T00:05:00.000Z");
    store.comments.push({
      id: "comment-earlier",
      content: "먼저 작성한 댓글",
      postId: "post-welcome",
      authorId: "user-demo",
      createdAt,
      updatedAt: createdAt,
    });

    const comments = listCommentsForPost("post-welcome");
    expect(comments.map((comment) => comment.id)).toEqual([
      "comment-earlier",
      "comment-welcome",
    ]);
    expect(comments[0]).toMatchObject({ authorName: "데모 사용자" });
    expect(comments[0]).not.toHaveProperty("authorId");
    expect(comments[0]).not.toHaveProperty("postId");
  });

  it("returns an empty collection for a post without comments", () => {
    expect(listCommentsForPost("post-question")).toEqual([]);
  });
});
