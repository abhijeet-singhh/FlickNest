import {
  index,
  integer,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { mediaTypeEnum } from "./enums";

export const watchHistory = pgTable(
  "watch_history",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tmdbId: integer("tmdb_id").notNull(),
    mediaType: mediaTypeEnum("media_type").notNull(),
    watchedAt: timestamp("watched_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    uniqueIndex("watch_history_unique_media_idx").on(
      table.userId,
      table.tmdbId,
      table.mediaType,
    ),
    index("watch_history_user_id_idx").on(table.userId),
  ],
);
