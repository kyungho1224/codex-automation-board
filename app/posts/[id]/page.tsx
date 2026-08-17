import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { AuthStatus } from "@/app/auth-status";
import { getPostById } from "@/lib/data/posts";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "Asia/Seoul",
});

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(id);

  return post ? { title: `${post.title} | Codex Board` } : { title: "게시글 없음" };
}

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="board-shell">
      <div className="detail-shell">
        <header className="site-header board-header">
          <Link className="brand" href="/">
            Codex Board
          </Link>
          <Suspense fallback={<span className="auth-placeholder">확인 중…</span>}>
            <AuthStatus />
          </Suspense>
        </header>

        <Link className="back-link" href="/">
          ← 게시글 목록
        </Link>

        <article className="post-detail">
          <header>
            <p className="eyebrow">POST</p>
            <h1>{post.title}</h1>
            <div className="post-meta detail-meta">
              <span>{post.authorName}</span>
              <time dateTime={post.createdAt.toISOString()}>
                {dateFormatter.format(post.createdAt)}
              </time>
            </div>
          </header>
          <div className="post-body">{post.content}</div>
        </article>
      </div>
    </main>
  );
}
