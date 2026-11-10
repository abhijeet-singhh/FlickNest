"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { routes } from "@/lib/constants/routes";
import type { DiscoverQueryParams } from "@/lib/validations/discover";
import type { DiscoverMediaType } from "@/types/discover";

import { GenreFilter } from "./genre-filter";
import { SortFilter } from "./sort-filter";
import { YearFilter } from "./year-filter";

const MEDIA_TYPE_OPTIONS: Array<{
  label: string;
  value: DiscoverMediaType;
}> = [
  { label: "Movies", value: "movie" },
  { label: "TV Shows", value: "tv" },
];

interface DiscoverFiltersProps {
  filters: DiscoverQueryParams;
}

function buildDiscoverHref(filters: DiscoverQueryParams) {
  const params = new URLSearchParams();

  if (filters.type !== "movie") {
    params.set("type", filters.type);
  }

  if (filters.genre !== undefined) {
    params.set("genre", String(filters.genre));
  }

  if (filters.year !== undefined) {
    params.set("year", String(filters.year));
  }

  if (filters.sort !== undefined) {
    params.set("sort", filters.sort);
  }

  const queryString = params.toString();

  return queryString ? `${routes.discover}?${queryString}` : routes.discover;
}

export function DiscoverFilters({ filters }: DiscoverFiltersProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function navigate(nextFilters: DiscoverQueryParams) {
    startTransition(() => {
      router.replace(buildDiscoverHref(nextFilters), { scroll: false });
    });
  }

  function update(patch: Partial<DiscoverQueryParams>) {
    navigate({
      type: patch.type ?? filters.type,
      genre: "genre" in patch ? patch.genre : filters.genre,
      year: "year" in patch ? patch.year : filters.year,
      sort: "sort" in patch ? patch.sort : filters.sort,
    });
  }

  const hasFilters =
    filters.genre !== undefined ||
    filters.year !== undefined ||
    filters.sort !== undefined ||
    filters.type !== "movie";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {MEDIA_TYPE_OPTIONS.map((option) => {
          const isActive = filters.type === option.value;

          return (
            <Button
              key={option.value}
              type="button"
              size="sm"
              variant={isActive ? "default" : "outline"}
              aria-pressed={isActive}
              onClick={() => update({ type: option.value, genre: undefined })}
            >
              {option.label}
            </Button>
          );
        })}

        {isPending ? <Spinner className="text-muted-foreground" /> : null}

        {hasFilters ? (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => navigate({ type: "movie" })}
          >
            Reset
          </Button>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <GenreFilter
          mediaType={filters.type}
          value={filters.genre}
          onChange={(genre) => update({ genre })}
        />

        <YearFilter
          value={filters.year}
          onChange={(year) => update({ year })}
        />

        <SortFilter
          value={filters.sort}
          onChange={(sort) => update({ sort })}
        />
      </div>
    </div>
  );
}
