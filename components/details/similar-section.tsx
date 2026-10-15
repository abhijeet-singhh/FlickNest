import Link from "next/link";
import { MediaPoster } from "@/components/details/media-poster";
import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";
import type { TV } from "@/types/tv";

type SimilarSectionProps =
  { mediaType: "movie"; items: Movie[] } | { mediaType: "tv"; items: TV[] };

export function SimilarSection({ mediaType, items }: SimilarSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="similar-media-heading" className="space-y-4">
      <h2 id="similar-media-heading" className="text-xl font-semibold">
        {mediaType === "movie" ? "Similar Movies" : "Similar TV Shows"}
      </h2>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {mediaType === "movie"
          ? items.slice(0, 12).map((movie) => (
              <li key={movie.id} className="group min-w-0">
                <Link
                  href={routes.movie(movie.id)}
                  className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <MediaPoster
                    title={movie.title}
                    posterUrl={movie.posterUrl}
                  />

                  <div className="mt-2 space-y-1">
                    <h3 className="truncate text-sm font-medium">
                      {movie.title}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {movie.releaseDate
                        ? new Date(movie.releaseDate).getFullYear()
                        : "Release date unavailable"}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          : items.slice(0, 12).map((tv) => (
              <li key={tv.id} className="group min-w-0">
                <Link
                  href={routes.tvShow(tv.id)}
                  className="block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <MediaPoster title={tv.name} posterUrl={tv.posterUrl} />

                  <div className="mt-2 space-y-1">
                    <h3 className="truncate text-sm font-medium">{tv.name}</h3>

                    <p className="text-xs text-muted-foreground">
                      {tv.firstAirDate
                        ? new Date(tv.firstAirDate).getFullYear()
                        : "Release date unavailable"}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </section>
  );
}
