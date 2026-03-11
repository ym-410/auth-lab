/**
 * ホームページコンポーネント
 * betterAuthを使用した認証機能（登録・ログイン・ログアウト）を提供
 */
"use client";


import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  // セッション情報を取得
  // data: 現在のセッションデータ、isPending: 読み込み状態、refetch: セッション再取得関数
  const { data: session, isPending, refetch } = authClient.useSession();

  // 新規登録フォームの状態管理
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ログインフォームの状態管理
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // メッセージ表示用の状態管理（成功・失敗メッセージ）
  const [message, setMessage] = useState("");

  // router
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.push("/mypage");
    }
  }, [isPending, session, router]);

  /**
   * 新規登録処理
   * メール・パスワードで新規ユーザーを作成
   */
  const handleSignUp = async () => {
    setMessage(""); // メッセージをクリア

    // authClientを使用してメール登録を実行]
    // 成功したらerror=null 失敗したら情報
    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    // エラーハンドリング
    if (error) {
      setMessage(`登録失敗: ${error.message ?? "unknown error"}`);
      return;
    }

    // 成功時はメッセージを表示してセッション情報を再取得
    setMessage("登録成功");
    await refetch();

    router.push("/mypage");

  };

  /**
   * ログイン処理
   * メール・パスワードで既存ユーザーとしてログイン
   */
  const handleSignIn = async () => {
    setMessage(""); // メッセージをクリア

    // authClientを使用してメールログインを実行
    const { error } = await authClient.signIn.email({
      email: loginEmail,
      password: loginPassword,
    });

    // エラーハンドリング
    if (error) {
      setMessage(`ログイン失敗: ${error.message ?? "unknown error"}`);
      return;
    }

    // 成功時はメッセージを表示してセッション情報を再取得
    setMessage("ログイン成功");
    await refetch();

    // ログイン成功時に/mypageに遷移
    router.push("/mypage");
  };

  /**
   * ログアウト処理
   * 現在のセッションを終了
   */
  const handleSignOut = async () => {
    setMessage(""); // メッセージをクリア

    // authClientを使用してログアウトを実行
    const { error } = await authClient.signOut();

    // エラーハンドリング
    if (error) {
      setMessage(`ログアウト失敗: ${error.message ?? "unknown error"}`);
      return;
    }

    // 成功時はメッセージを表示してセッション情報を再取得
    setMessage("ログアウト成功");
    await refetch();
  };

  // セッション読み込み中の表示
  if (isPending) {
    return <main className="p-6">読み込み中...</main>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">betterAuth 学習アプリ</h1>
        <ModeToggle />
      </div>


      {/* メッセージ表示エリア（成功・失敗メッセージ） */}
      {message && (
        <p className="rounded border p-3 text-sm">
          {message}
        </p>
      )}


          {/* 新規登録セクション */}
          <section className="space-y-3 rounded border p-4">
            <h2 className="text-xl font-semibold">新規登録</h2>
            <input
              className="w-full rounded border p-2"
              placeholder="名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full rounded border p-2"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full rounded border p-2"
              placeholder="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleSignUp}
              className="rounded border px-4 py-2"
            >
              登録
            </button>
          </section>

          {/* ログインセクション */}
          <section className="space-y-3 rounded border p-4">
            <h2 className="text-xl font-semibold">ログイン</h2>
            <input
              className="w-full rounded border p-2"
              placeholder="メールアドレス"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              className="w-full rounded border p-2"
              placeholder="パスワード"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button
              onClick={handleSignIn}
              className="rounded border px-4 py-2"
            >
              ログイン
            </button>
          </section>
    </main>
  );
}