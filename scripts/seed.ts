import { loadDatabaseEnv } from "./load-env";

async function main() {
  loadDatabaseEnv();

  const { db, client } = await import("../lib/db");
  const { profiles } = await import("../lib/db/schema");
  const { createUser, findUserByEmail } = await import(
    "../lib/db/queries/users"
  );

  const email = "dev@flicknest.local";
  const username = "devuser";

  let user = await findUserByEmail(email);

  if (!user) {
    user = await createUser({
      email,
      username,
      passwordHash: "dev-seed-placeholder-not-a-real-hash",
    });
  }

  await db
    .insert(profiles)
    .values({
      userId: user.id,
      displayName: "FlickNest Dev",
    })
    .onConflictDoNothing({ target: profiles.userId });

  console.log(`Seeded dev user: ${user.email} (${user.id})`);

  await client.end();
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exitCode = 1;
});
