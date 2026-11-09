import { z } from "zod";

const currentYear = new Date().getFullYear();

export const discoverSortOptions = [
  "popularity",
  "rating",
  "release-date",
] as const;

export const discoverSchema = z.object({
  genre: z.coerce.number().int().positive().optional(),
  year: z.coerce
    .number()
    .int()
    .min(1870)
    .max(currentYear + 10)
    .optional(),
  sort: z.enum(discoverSortOptions).optional(),
});

export type DiscoverQueryParams = z.infer<typeof discoverSchema>;
