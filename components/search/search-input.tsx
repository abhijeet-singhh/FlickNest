"use client";

import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useDebounce } from "@/hooks/use-debounce";
import { routes } from "@/lib/constants/routes";
import type { SearchMediaType } from "@/types/search";

const DEBOUNCE_MS = 350;

interface SearchInputProps {
  initialQuery: string;
  mediaType?: SearchMediaType;
}

function buildSearchHref(query: string, mediaType?: SearchMediaType) {
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

export function SearchInput({ initialQuery, mediaType }: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();
  const debouncedValue = useDebounce(value, DEBOUNCE_MS);
  const pendingQueries = useRef<Set<string>>(new Set());

  useEffect(() => {
    const nextQuery = debouncedValue.trim();

    if (nextQuery === initialQuery) {
      return;
    }

    pendingQueries.current.add(nextQuery);

    startTransition(() => {
      router.replace(buildSearchHref(nextQuery, mediaType), {
        scroll: false,
      });
    });
  }, [debouncedValue, initialQuery, mediaType, router]);

  useEffect(() => {
    if (pendingQueries.current.has(initialQuery)) {
      pendingQueries.current.delete(initialQuery);
      return;
    }

    setValue(initialQuery);
  }, [initialQuery]);

  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />

      <Input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search movies and TV shows..."
        aria-label="Search movies and TV shows"
        className="pr-10 pl-9"
      />

      {isPending ? (
        <Spinner className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground" />
      ) : value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
