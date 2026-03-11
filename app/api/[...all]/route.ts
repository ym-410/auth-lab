import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// Next.jsのAPIとして使えるように変換
export const { GET, POST } = toNextJsHandler(auth);