import { afterEach, describe, expect, it } from "vitest";

import { listPosts } from "@/lib/data/posts";
import { getStore, resetStoreForTests } from "@/lib/data/store";

describe("listPosts", () => {
  afterEach(() => {
    resetStoreForTests();
  });

  it("returns safe list data newest first with comment counts", () => {
    const posts = listPosts();

    expect(posts.map((post) => post.id)).toEqual(["post-welcome", "post-question"]);
    expect(posts[0]).toMatchObject({
      authorName: "데모 사용자",
      commentCount: 1,
    });
    expect(posts[1].commentCount).toBe(0);
    expect(posts[0]).not.toHaveProperty("content");
    expect(posts[0]).not.toHaveProperty("authorId");
  });

  it("sorts newly inserted posts by creation time without mutating storage order", () => {
    const store = getStore();
    const originalOrder = store.posts.map((post) => post.id);
    const createdAt = new Date("2026-08-19T00:00:00.000Z");
    store.posts.push({
      id: "post-newest",
      title: "가장 새로운 글",
      content: "내용",
      authorId: "user-demo",
      createdAt,
      updatedAt: createdAt,
    });

    expect(listPosts()[0].id).toBe("post-newest");
    expect(store.posts.slice(0, originalOrder.length).map((post) => post.id)).toEqual(
      originalOrder,
    );
  });

  it("returns an empty collection when there are no posts", () => {
    getStore().posts.length = 0;
    expect(listPosts()).toEqual([]);
  });
});
