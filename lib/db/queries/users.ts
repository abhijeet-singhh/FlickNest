import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export type UserRecord = typeof users.$inferSelect;
export type NewUserRecord = typeof users.$inferInsert;
export type UserUpdate = Partial<
  Omit<NewUserRecord, "id" | "createdAt" | "updatedAt">
>;

export async function findUserById(id: string): Promise<UserRecord | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .limit(1);

  return user ?? null;
}

export async function findUserByEmail(
  email: string,
): Promise<UserRecord | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user ?? null;
}

export async function findUserByUsername(
  username: string,
): Promise<UserRecord | null> {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  return user ?? null;
}

export async function createUser(values: NewUserRecord): Promise<UserRecord> {
  const [user] = await db.insert(users).values(values).returning();

  return user;
}

export async function updateUser(
  id: string,
  values: UserUpdate,
): Promise<UserRecord | null> {
  const [user] = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning();

  return user ?? null;
}

export async function deleteUser(id: string): Promise<UserRecord | null> {
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();

  return user ?? null;
}
