import { headers } from "next/headers";
import { randomUUID } from "crypto";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const note = db
    .prepare("SELECT id, userId, content, createdAt, updatedAt FROM notes WHERE userId = ?")
    .get(session.user.id);

  return Response.json({ note: note ?? null });
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return Response.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await req.json();
  const content = String(body.content ?? "").trim();

  if (!content) {
    return Response.json({ error: "CONTENT_REQUIRED" }, { status: 400 });
  }

  const now = new Date().toISOString();

  const existingNote = db
    .prepare("SELECT id FROM notes WHERE userId = ?")
    .get(session.user.id) as { id: string } | undefined;

  if (existingNote) {
    db.prepare(
      "UPDATE notes SET content = ?, updatedAt = ? WHERE userId = ?"
    ).run(content, now, session.user.id);
  } else {
    db.prepare(
      "INSERT INTO notes (id, userId, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)"
    ).run(randomUUID(), session.user.id, content, now, now);
  }

  const savedNote = db
    .prepare("SELECT id, userId, content, createdAt, updatedAt FROM notes WHERE userId = ?")
    .get(session.user.id);

  return Response.json({ note: savedNote });
}