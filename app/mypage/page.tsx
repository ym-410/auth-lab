"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function MyPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <main className="p-6">読み込み中...</main>;
  }

  if (!session) {
    return (
      <main className="max-w-2xl mx-auto p-6 space-y-4">
        <h1 className="text-2xl font-bold">My Page</h1>
        <p>このページはログイン中のユーザー向けです。</p>
        <p>まだログインしていません。</p>
        <Link href="/" className="underline">
          トップページに戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Page</h1>
      <p>ログイン中です。</p>

      <div className="rounded border p-4 space-y-2">
        <p><span className="font-semibold">名前:</span> {session.user.name}</p>
        <p><span className="font-semibold">メール:</span> {session.user.email}</p>
        <p><span className="font-semibold">ユーザーID:</span> {session.user.id}</p>
      </div>

      <Link href="/" className="underline">
        トップページに戻る
      </Link>
    </main>
  );
}