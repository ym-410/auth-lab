"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffectはクライアントサイドでのみ実行される
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // マウント前はボタンのみを表示（ハイドレーションエラー防止）
  if (!mounted) {
    return (
      <button className="inline-flex items-center justify-center rounded-md p-2 border border-border hover:bg-accent">
        <Sun className="h-5 w-5" />
        <span className="sr-only">テーマ切り替え</span>
      </button>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="inline-flex items-center justify-center rounded-md p-2 border border-border hover:bg-accent transition-colors"
      >
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">テーマ切り替え</span>
      </button>
    </div>
  );
}
