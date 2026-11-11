import "server-only";

import { findUserByEmail } from "@/lib/db/queries/users";

const DEV_STUB_USER_EMAIL = "dev@flicknest.local";

export interface CurrentUser {
  id: string;
  email: string;
  username: string;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const email = process.env.DEV_AUTH_EMAIL ?? DEV_STUB_USER_EMAIL;
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    username: user.username,
  };
}
