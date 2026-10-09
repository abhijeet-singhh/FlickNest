import Image from "next/image";
import Link from "next/link";

import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";

interface HomeHeroProps {
  movie: Movie;
}

export function HomeHero({ movie }: HomeHeroProps) {
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : null;

  return (
    <section className="relative min-h-105 overflow-hidden rounded-xl md:min-h-130">
      {movie.backdropUrl ? (
        <Image
          src={movie.backdropUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />

      <div className="relative flex min-h-105 items-end md:min-h-130">
        <div className="max-w-2xl space-y-5 p-6 md:p-10 lg:p-12">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {releaseYear ? <span>{releaseYear}</span> : null}
            <span>★ {movie.rating.toFixed(1)}</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {movie.title}
          </h1>

          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground md:text-base">
            {movie.overview || "No overview available."}
          </p>

          <Link
            href={routes.movie(movie.id)}
            className="inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View details
          </Link>
        </div>
      </div>
    </section>
  );
}
