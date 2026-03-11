"use client";

import { useEffect, useState } from "react";
import { Note } from "@/types/note";

type NoteSectionProps = {
  isLoggedIn: boolean;
};

export default function NoteSection({ isLoggedIn }: NoteSectionProps) {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loadingNote, setLoadingNote] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoadingNote(true);

      const res = await fetch("/api/note");
      const data: { note: Note | null } = await res.json();

      if (data.note) {
        setContent(data.note.content);
      }

      setLoadingNote(false);
    };

    if (isLoggedIn) {
      fetchNote();
    }
  }, [isLoggedIn]);

  const handleSave = async () => {
    setMessage("");

    const res = await fetch("/api/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(`保存失敗: ${data.error ?? "unknown error"}`);
      return;
    }

    setMessage("保存成功");
  };

  return (
    <section className="space-y-3 rounded border p-4">
      <h2 className="text-xl font-semibold">一言メモ</h2>

      {loadingNote ? (
        <p>メモを読み込み中...</p>
      ) : (
        <>
          <textarea
            className="w-full rounded border p-2 min-h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="今日のメモを書く"
          />

          <button
            onClick={handleSave}
            className="rounded border px-4 py-2"
          >
            保存
          </button>

          {message && <p className="text-sm">{message}</p>}
        </>
      )}
    </section>
  );
}