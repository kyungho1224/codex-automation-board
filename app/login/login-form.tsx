"use client";

import { useActionState } from "react";

import { loginAction, type LoginState } from "@/app/login/actions";

const initialState: LoginState = { message: "" };

export function LoginForm({ returnTo }: { returnTo: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="auth-form">
      <input name="returnTo" type="hidden" value={returnTo} />

      <label htmlFor="email">이메일</label>
      <input
        autoComplete="email"
        autoFocus
        id="email"
        name="email"
        placeholder="demo@example.com"
        required
        type="email"
      />

      <label htmlFor="password">비밀번호</label>
      <input
        autoComplete="current-password"
        id="password"
        name="password"
        required
        type="password"
      />

      <p aria-live="polite" className="form-message">
        {state.message}
      </p>

      <button className="button primary" disabled={pending} type="submit">
        {pending ? "로그인 중…" : "로그인"}
      </button>
    </form>
  );
}
