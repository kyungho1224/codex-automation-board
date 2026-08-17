import Link from "next/link";

import { getCurrentUser } from "@/lib/auth/dal";

export async function PostListActions() {
  const user = await getCurrentUser();
  const href = user ? "/posts/new" : "/login?returnTo=%2Fposts%2Fnew";

  return (
    <Link className="button primary" href={href}>
      새 글 쓰기
    </Link>
  );
}
