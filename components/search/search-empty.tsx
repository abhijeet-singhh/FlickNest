interface SearchEmptyProps {
  query?: string;
}

export function SearchEmpty({ query }: SearchEmptyProps) {
  return (
    <div className="flex min-h-[30vh] items-center justify-center rounded-lg border border-dashed px-6 py-12 text-center">
      <div className="max-w-md space-y-2">
        <h2 className="text-lg font-semibold">
          {query ? `No results for "${query}"` : "Search FlickNest"}
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          {query
            ? "Try a different title, check your spelling, or remove a filter."
            : "Type a movie or TV show title to start searching."}
        </p>
      </div>
    </div>
  );
}
