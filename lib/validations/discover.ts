import { z } from "zod";

import type { DiscoverSort } from "@/types/discover";

import { firstParamValue, type RawSearchParams } from "./query-params";

const currentYear = new Date().getFullYear();

export const discoverMediaTypes = ["movie", "tv"] as const;

export const discoverSortOptions = [
  "popularity",
  "rating",
  "release-date",
] as const satisfies readonly DiscoverSort[];

export const discoverSchema = z.object({
  type: z.enum(discoverMediaTypes).default("movie"),
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

export function parseDiscoverParams(
  params: RawSearchParams,
): DiscoverQueryParams {
  const result = discoverSchema.safeParse({
    type: firstParamValue(params.type),
    genre: firstParamValue(params.genre),
    year: firstParamValue(params.year),
    sort: firstParamValue(params.sort),
  });

  return result.success ? result.data : discoverSchema.parse({});
}
