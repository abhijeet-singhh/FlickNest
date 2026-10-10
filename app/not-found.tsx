import Link from "next/link";

import { routes } from "@/lib/constants/routes";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">404</h1>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Page not found</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved.
          </p>
        </div>

        <Link
          href={routes.home}
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
