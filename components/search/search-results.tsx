import Link from "next/link";

import { MediaPoster } from "@/components/details/media-poster";
import { MovieCard } from "@/components/movie/movie-card";
import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";
import type { SearchItem, SearchResult } from "@/types/search";
import type { TV } from "@/types/tv";

interface SearchResultsProps {
  result: SearchResult<SearchItem>;
}

function isMovie(item: SearchItem): item is Movie {
  return "title" in item;
}

function TVResultCard({ show }: { show: TV }) {
  const year = show.firstAirDate
    ? new Date(show.firstAirDate).getFullYear()
    : null;

  return (
    <article className="group">
      <Link
        href={routes.tvShow(show.id)}
        aria-label={`View ${show.name}`}
        className="block"
      >
        <MediaPoster title={show.name} posterUrl={show.posterUrl} />

        <div className="mt-3 space-y-1.5">
          <h3
            className="line-clamp-2 text-sm font-medium leading-5 transition-colors group-hover:text-primary"
            title={show.name}
          >
            {show.name}
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              {year ?? "Unknown"}
            </span>
            <span className="text-xs text-muted-foreground">
              ★ {show.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export function SearchResults({ result }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {result.results.map((item) =>
        isMovie(item) ? (
          <MovieCard key={`movie-${item.id}`} movie={item} />
        ) : (
          <TVResultCard key={`tv-${item.id}`} show={item} />
        ),
      )}
    </div>
  );
}
