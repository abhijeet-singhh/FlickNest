import { z } from "zod";

export const searchSchema = z.object({
  q: z
    .string()
    .trim()
    .optional()
    .transform((query) => query ?? ""),
  page: z.coerce.number().int().positive().optional(),
  mediaType: z.enum(["movie", "tv"]).optional(),
});

export type SearchQueryParams = z.infer<typeof searchSchema>;
