import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { AuthStatus } from "@/app/auth-status";
import { CommentLoginPrompt } from "@/app/posts/[id]/comment-login-prompt";
import { listCommentsForPost } from "@/lib/data/comments";
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
  const comments = listCommentsForPost(id);

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

        <section className="comments" aria-labelledby="comments-title">
          <div className="comments-heading">
            <h2 id="comments-title">댓글</h2>
            <span>{comments.length}</span>
          </div>

          {comments.length > 0 ? (
            <ol className="comment-list">
              {comments.map((comment) => (
                <li key={comment.id}>
                  <div className="comment-meta">
                    <strong>{comment.authorName}</strong>
                    <time dateTime={comment.createdAt.toISOString()}>
                      {dateFormatter.format(comment.createdAt)}
                    </time>
                  </div>
                  <p>{comment.content}</p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="comment-empty">아직 댓글이 없습니다. 첫 댓글을 남겨 보세요.</div>
          )}

          <Suspense fallback={null}>
            <CommentLoginPrompt postId={post.id} />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
