import Link from "next/link";

export default function PostNotFound() {
  return (
    <main className="shell">
      <section className="auth-card not-found-card">
        <p className="eyebrow">404</p>
        <h1>게시글을 찾을 수 없습니다</h1>
        <p className="lede">삭제되었거나 존재하지 않는 게시글입니다.</p>
        <Link className="button primary" href="/">
          게시글 목록으로
        </Link>
      </section>
    </main>
  );
}
