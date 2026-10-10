import Link from "next/link";

import { routes } from "@/lib/constants/routes";

export function MobileNav() {
  return (
    <nav className="border-t md:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-around px-4 py-3">
        <Link
          href={routes.home}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Home
        </Link>

        <Link
          href={routes.movies}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Movies
        </Link>

        <Link
          href={routes.tv}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          TV
        </Link>

        <Link
          href={routes.search}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Search
        </Link>
      </div>
    </nav>
  );
}
