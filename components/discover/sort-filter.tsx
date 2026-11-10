"use client";

import type { DiscoverSort } from "@/types/discover";

const SORT_OPTIONS: Array<{ label: string; value: DiscoverSort }> = [
  { label: "Popularity", value: "popularity" },
  { label: "Rating", value: "rating" },
  { label: "Release date", value: "release-date" },
];

interface SortFilterProps {
  value?: DiscoverSort;
  onChange: (value: DiscoverSort | undefined) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      Sort by
      <select
        value={value ?? ""}
        onChange={(event) => {
          const nextValue = event.target.value as DiscoverSort | "";
          onChange(nextValue ? nextValue : undefined);
        }}
        className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Default</option>

        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
