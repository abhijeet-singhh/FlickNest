import Link from "next/link";

import { routes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";
import type { SearchMediaType } from "@/types/search";

const MEDIA_TYPE_OPTIONS: Array<{
  label: string;
  value?: SearchMediaType;
}> = [
  { label: "All" },
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
];

interface SearchFiltersProps {
  query: string;
  mediaType?: SearchMediaType;
}

function buildFilterHref(query: string, mediaType?: SearchMediaType) {
  const params = new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (mediaType) {
    params.set("mediaType", mediaType);
  }

  const queryString = params.toString();

  return queryString ? `${routes.search}?${queryString}` : routes.search;
}

export function SearchFilters({ query, mediaType }: SearchFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter search results by media type"
      className="flex flex-wrap gap-2"
    >
      {MEDIA_TYPE_OPTIONS.map((option) => {
        const isActive = mediaType === option.value;

        return (
          <Link
            key={option.label}
            href={buildFilterHref(query, option.value)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-md border px-3 text-sm font-medium transition-colors",
              isActive
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}
