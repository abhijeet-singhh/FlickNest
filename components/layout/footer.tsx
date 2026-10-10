import Link from "next/link";

import { routes } from "@/lib/constants/routes";

export function Footer() {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <Link href={routes.home} className="font-semibold">
            FlickNest
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            Discover movies and TV shows.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
          <Link
            href={routes.home}
            className="transition-colors hover:text-foreground"
          >
            Home
          </Link>

          <Link
            href={routes.movies}
            className="transition-colors hover:text-foreground"
          >
            Movies
          </Link>

          <Link
            href={routes.tv}
            className="transition-colors hover:text-foreground"
          >
            TV Shows
          </Link>

          <Link
            href={routes.search}
            className="transition-colors hover:text-foreground"
          >
            Search
          </Link>
        </nav>
      </div>
    </footer>
  );
}
