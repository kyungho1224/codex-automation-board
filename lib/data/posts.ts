import { getStore } from "@/lib/data/store";

export type PostListItem = {
  id: string;
  title: string;
  authorName: string;
  createdAt: Date;
  commentCount: number;
};

export type PostDetail = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
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

export function getPostById(id: string): PostDetail | null {
  const store = getStore();
  const post = store.posts.find((candidate) => candidate.id === id);

  if (!post) {
    return null;
  }

  const author = store.users.find((user) => user.id === post.authorId);

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorName: author?.name ?? "알 수 없는 사용자",
    createdAt: new Date(post.createdAt),
    updatedAt: new Date(post.updatedAt),
  };
}
