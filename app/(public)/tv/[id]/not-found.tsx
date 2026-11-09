import Link from "next/link";

import { routes } from "@/lib/constants/routes";

export default function TVDetailsNotFound() {
  return (
    <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <p className="text-sm font-medium text-muted-foreground">
        404 — TV Show Not Found
      </p>

      <h1 className="text-3xl font-bold tracking-tight">
        We couldn&apos;t find that TV show
      </h1>

      <p className="max-w-md text-muted-foreground">
        The show may have been removed, or the URL might be incorrect.
      </p>

      <Link
        href={routes.tv}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        Browse TV Shows
      </Link>
    </main>
  );
}
