import { getStore } from "@/lib/data/store";

export type CommentListItem = {
  id: string;
  content: string;
  authorName: string;
  createdAt: Date;
};

export function listCommentsForPost(postId: string): CommentListItem[] {
  const store = getStore();
  const usersById = new Map(store.users.map((user) => [user.id, user.name]));

  return store.comments
    .filter((comment) => comment.postId === postId)
    .map((comment) => ({
      id: comment.id,
      content: comment.content,
      authorName: usersById.get(comment.authorId) ?? "알 수 없는 사용자",
      createdAt: new Date(comment.createdAt),
    }))
    .sort((left, right) => left.createdAt.getTime() - right.createdAt.getTime());
}
