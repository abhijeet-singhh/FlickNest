"use client";

import { MOVIE_GENRES, TV_GENRES } from "@/lib/constants/genres";
import type { DiscoverMediaType } from "@/types/discover";

interface GenreFilterProps {
  mediaType: DiscoverMediaType;
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function GenreFilter({ mediaType, value, onChange }: GenreFilterProps) {
  const genres = mediaType === "tv" ? TV_GENRES : MOVIE_GENRES;

  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      Genre
      <select
        value={value !== undefined ? String(value) : ""}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue ? Number(nextValue) : undefined);
        }}
        className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">All genres</option>

        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </label>
  );
}
