import { existsSync } from "node:fs";
import { loadEnvFile } from "node:process";

export function loadDatabaseEnv() {
  if (existsSync(".env.local")) {
    loadEnvFile(".env.local");
  } else if (existsSync(".env")) {
    loadEnvFile(".env");
  }

  if (process.env.DATABASE_URL_UNPOOLED) {
    process.env.DATABASE_URL = process.env.DATABASE_URL_UNPOOLED;
  }
}
