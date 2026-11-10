import type { Metadata } from "next";

import { SearchEmpty } from "@/components/search/search-empty";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchInput } from "@/components/search/search-input";
import { SearchResults } from "@/components/search/search-results";
import { parseSearchParams } from "@/lib/validations/search";
import { search } from "@/server/services/search.service";
import type { SearchItem, SearchResult } from "@/types/search";

export const metadata: Metadata = {
  title: "Search | FlickNest",
};

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page, mediaType } = parseSearchParams(await searchParams);

  let result: SearchResult<SearchItem> | null = null;
  let failed = false;

  if (q) {
    try {
      result = await search({ query: q, page, mediaType });
    } catch {
      failed = true;
    }
  }

  return (
    <main className="container mx-auto space-y-8 px-4 py-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground">
          Find movies and TV shows and build your next watchlist.
        </p>
      </header>

      <div className="space-y-4">
        <SearchInput initialQuery={q} mediaType={mediaType} />
        <SearchFilters query={q} mediaType={mediaType} />
      </div>

      {q ? (
        failed ? (
          <p
            role="alert"
            className="rounded-lg border border-dashed px-4 py-12 text-center text-sm text-muted-foreground"
          >
            We couldn&apos;t load search results. Please try again.
          </p>
        ) : result && result.results.length > 0 ? (
          <section aria-label="Search results" className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {result.totalResults.toLocaleString()} result
              {result.totalResults === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
            </p>

            <SearchResults result={result} />
          </section>
        ) : (
          <SearchEmpty query={q} />
        )
      ) : (
        <SearchEmpty />
      )}
    </main>
  );
}
