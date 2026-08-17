import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/dal";

export async function CommentLoginPrompt({ postId }: { postId: string }) {
  if (await getCurrentUser()) {
    return null;
  }

  const returnTo = encodeURIComponent(`/posts/${postId}`);

  return (
    <p className="comment-guidance">
      댓글을 작성하려면 로그인이 필요합니다.{" "}
      <Link href={`/login?returnTo=${returnTo}`}>로그인</Link>
    </p>
  );
}
