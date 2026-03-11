import { betterAuth } from "better-auth";
import { db } from "@/lib/db";

// const db = new Database("database.sqlite");

export const auth = betterAuth({
  database: db,
  emailAndPassword: {
    enabled: true,
  },
});