"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h1>Something went wrong</h1>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </main>
  );
}
