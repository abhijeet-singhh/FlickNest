import { z } from "zod";

import { firstParamValue, type RawSearchParams } from "./query-params";

export const searchMediaTypes = ["movie", "tv"] as const;

export const searchSchema = z.object({
  q: z
    .string()
    .trim()
    .optional()
    .transform((query) => query ?? ""),
  page: z.coerce.number().int().positive().optional(),
  mediaType: z.enum(searchMediaTypes).optional(),
});

export type SearchQueryParams = z.infer<typeof searchSchema>;

export function parseSearchParams(params: RawSearchParams): SearchQueryParams {
  const result = searchSchema.safeParse({
    q: firstParamValue(params.q),
    page: firstParamValue(params.page),
    mediaType: firstParamValue(params.mediaType),
  });

  return result.success ? result.data : searchSchema.parse({});
}
