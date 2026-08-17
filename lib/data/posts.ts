import { getStore } from "@/lib/data/store";

export type PostListItem = {
  id: string;
  title: string;
  authorName: string;
  createdAt: Date;
  commentCount: number;
};

export function listPosts(): PostListItem[] {
  const store = getStore();
  const usersById = new Map(store.users.map((user) => [user.id, user.name]));
  const commentCounts = new Map<string, number>();

  for (const comment of store.comments) {
    commentCounts.set(comment.postId, (commentCounts.get(comment.postId) ?? 0) + 1);
  }

  return store.posts
    .map((post) => ({
      id: post.id,
      title: post.title,
      authorName: usersById.get(post.authorId) ?? "알 수 없는 사용자",
      createdAt: new Date(post.createdAt),
      commentCount: commentCounts.get(post.id) ?? 0,
    }))
    .sort((left, right) => right.createdAt.getTime() - left.createdAt.getTime());
}
