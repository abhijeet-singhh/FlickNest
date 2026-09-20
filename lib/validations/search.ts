import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().trim().min(1),
  page: z.coerce.number().int().positive().optional(),
  mediaType: z.enum(["movie", "tv"]).optional(),
});
