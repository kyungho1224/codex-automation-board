import Link from "next/link";
import { Suspense } from "react";

import { AuthStatus } from "@/app/auth-status";
import { PostListActions } from "@/app/post-list-actions";
import { listPosts } from "@/lib/data/posts";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeZone: "Asia/Seoul",
});

export default function Home() {
  const posts = listPosts();

  return (
    <main className="board-shell">
      <section className="board" aria-labelledby="page-title">
        <header className="site-header board-header">
          <Link className="brand" href="/">
            Codex Board
          </Link>
          <Suspense fallback={<span className="auth-placeholder">확인 중…</span>}>
            <AuthStatus />
          </Suspense>
        </header>

        <div className="list-heading">
          <div>
            <p className="eyebrow">RECENT CONVERSATIONS</p>
            <h1 id="page-title">게시글</h1>
            <p className="lede">새로운 생각과 질문을 가장 최근 글부터 만나보세요.</p>
          </div>
          <Suspense fallback={<span className="button-placeholder" />}>
            <PostListActions />
          </Suspense>
        </div>

        {posts.length > 0 ? (
          <ol className="post-list">
            {posts.map((post) => (
              <li key={post.id}>
                <Link className="post-link" href={`/posts/${post.id}`}>
                  <h2>{post.title}</h2>
                  <div className="post-meta">
                    <span>{post.authorName}</span>
                    <time dateTime={post.createdAt.toISOString()}>
                      {dateFormatter.format(post.createdAt)}
                    </time>
                    <span>댓글 {post.commentCount}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="empty-state">
            <h2>아직 게시글이 없습니다</h2>
            <p>첫 번째 이야기를 남겨 보세요.</p>
          </div>
        )}
      </section>
    </main>
  );
}
