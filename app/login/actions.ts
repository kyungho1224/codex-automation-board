"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { authenticate } from "@/lib/auth/authenticate";
import { getSafeReturnTo } from "@/lib/auth/return-to";
import { createSession, deleteSession } from "@/lib/auth/session";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
  returnTo: z.string().optional(),
});

export type LoginState = {
  message: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const fields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    returnTo: formData.get("returnTo") ?? undefined,
  });

  if (!fields.success) {
    return { message: "이메일과 비밀번호를 모두 올바르게 입력해 주세요." };
  }

  const user = authenticate(fields.data.email, fields.data.password);

  if (!user) {
    return { message: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  try {
    await createSession(user.id);
  } catch {
    return { message: "로그인 설정을 확인할 수 없습니다. 잠시 후 다시 시도해 주세요." };
  }

  redirect(getSafeReturnTo(fields.data.returnTo));
}

export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/");
}
