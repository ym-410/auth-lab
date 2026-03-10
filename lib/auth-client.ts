"use client";

import { createAuthClient } from "better-auth/react";

// ログイン、ログアウトなどを簡単に呼ぶ関数
export const authClient = createAuthClient();

// authClient.signIn()
// authClient.signUp()
// authClient.signOut()
// authClient.useSession()