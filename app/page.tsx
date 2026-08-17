import { Suspense } from "react";

import { AuthStatus } from "@/app/auth-status";

export default function Home() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="page-title">
        <header className="site-header">
          <span className="brand">Codex Board</span>
          <Suspense fallback={<span className="auth-placeholder">확인 중…</span>}>
            <AuthStatus />
          </Suspense>
        </header>
        <p className="eyebrow">CODEX BOARD</p>
        <h1 id="page-title">생각을 나누는 작은 공간</h1>
        <p className="lede">
          게시판을 준비하고 있습니다. 곧 글과 댓글을 읽고, 로그인한 뒤 직접 대화에 참여할 수 있습니다.
        </p>
      </section>
    </main>
  );
}
