import Link from "next/link";

import { logoutAction } from "@/app/login/actions";
import { getCurrentUser } from "@/lib/auth/dal";

export async function AuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Link className="button secondary" href="/login">
        로그인
      </Link>
    );
  }

  return (
    <div className="auth-status">
      <span>{user.name}</span>
      <form action={logoutAction}>
        <button className="button secondary" type="submit">
          로그아웃
        </button>
      </form>
    </div>
  );
}
