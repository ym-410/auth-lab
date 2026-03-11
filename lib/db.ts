import Database from "better-sqlite3";
import { unique } from "next/dist/build/utils";
import { Noto_Sans_Tamil_Supplement } from "next/font/google";

export const db = new Database("database.sqlite");

// notesテーブル作成
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL unique,
  content TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL)`
);