import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";
import type { Config } from "drizzle-kit";

if (existsSync(".env.local")) {
  loadEnvFile(".env.local");
} else if (existsSync(".env")) {
  loadEnvFile(".env");
}

export default {
  schema: "./lib/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.DATABASE_URL_UNPOOLED ??
      process.env.DATABASE_URL ??
      "",
  },
  strict: true,
  verbose: true,
} satisfies Config;
