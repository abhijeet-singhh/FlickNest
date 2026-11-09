export default function TVDetailsLoading() {
  return (
    <main className="container mx-auto space-y-10 px-4 py-8">
      <section
        aria-label="Loading TV show details"
        className="relative grid min-h-120 animate-pulse items-end gap-8 overflow-hidden rounded-xl bg-muted p-6 md:min-h-140 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:p-10"
      >
        <div className="mx-auto aspect-[2/3] w-40 rounded-lg bg-background/40 md:mx-0 md:w-full" />

        <div className="space-y-5">
          <div className="h-9 w-3/4 rounded bg-background/40" />
          <div className="h-5 w-1/2 rounded bg-background/40" />

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-background/40" />
            <div className="h-4 w-5/6 rounded bg-background/40" />
            <div className="h-4 w-2/3 rounded bg-background/40" />
          </div>

          <div className="h-10 w-36 rounded bg-background/40" />
        </div>
      </section>

      <section aria-label="Loading cast" className="space-y-4">
        <div className="h-7 w-32 animate-pulse rounded bg-muted" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {Array.from({ length: 5 }, (_, index) => (
            <div key={index} className="space-y-2">
              <div className="aspect-[2/3] animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
