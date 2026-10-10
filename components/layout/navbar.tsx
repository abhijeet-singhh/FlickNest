import Link from "next/link";

import { routes } from "@/lib/constants/routes";

import { MobileNav } from "./mobile-nav";

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href={routes.home} className="text-xl font-bold">
          FlickNest
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
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
            TV Shows
          </Link>

          <Link
            href={routes.search}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Search
          </Link>
        </nav>
      </div>

      <MobileNav />
    </header>
  );
}
