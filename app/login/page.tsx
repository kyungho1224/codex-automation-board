import Link from "next/link";
import { redirect } from "next/navigation";

import { LoginForm } from "@/app/login/login-form";
import { getCurrentUser } from "@/lib/auth/dal";
import { getSafeReturnTo } from "@/lib/auth/return-to";

type LoginPageProps = {
  searchParams: Promise<{ returnTo?: string | string[] }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const returnTo = getSafeReturnTo(
    Array.isArray(params.returnTo) ? params.returnTo[0] : params.returnTo,
  );

  if (await getCurrentUser()) {
    redirect(returnTo);
  }

  return (
    <main className="shell">
      <section className="auth-card" aria-labelledby="login-title">
        <Link className="back-link" href="/">
          ← 게시판으로
        </Link>
        <p className="eyebrow">WELCOME BACK</p>
        <h1 id="login-title">로그인</h1>
        <p className="lede">로그인하면 새 글과 댓글을 작성할 수 있습니다.</p>
        <LoginForm returnTo={returnTo} />
        <aside className="demo-account">
          <strong>테스트 계정</strong>
          <span>demo@example.com / demo-password</span>
        </aside>
      </section>
    </main>
  );
}
