import Link from "next/link";

import { MediaPoster } from "@/components/details/media-poster";
import { MovieGrid } from "@/components/movie/movie-grid";
import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";
import type { TV } from "@/types/tv";

type DiscoverResultsProps =
  { mediaType: "movie"; items: Movie[] } | { mediaType: "tv"; items: TV[] };

export function DiscoverResults(props: DiscoverResultsProps) {
  if (props.mediaType === "movie") {
    return <MovieGrid movies={props.items} />;
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {props.items.map((show) => {
        const year = show.firstAirDate
          ? new Date(show.firstAirDate).getFullYear()
          : null;

        return (
          <li key={show.id} className="group min-w-0">
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
          </li>
        );
      })}
    </ul>
  );
}
