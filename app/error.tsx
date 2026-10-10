"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Something went wrong
        </h1>

        <p className="text-sm leading-6 text-muted-foreground">
          We couldn&apos;t load this page. Please try again.
        </p>

        <button
          type="button"
          onClick={reset}
          className="inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
