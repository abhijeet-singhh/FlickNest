import { z } from "zod";

export const watchlistSchema = z.object({
  tmdbId: z.number().int().positive(),
  mediaType: z.enum(["movie", "tv"]),
});
