export type User = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: string;
  content: string;
  postId: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DataStore = {
  users: User[];
  posts: Post[];
  comments: Comment[];
};
