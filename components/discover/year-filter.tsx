"use client";

const currentYear = new Date().getFullYear();
const YEARS = Array.from(
  { length: currentYear - 1900 + 1 },
  (_, index) => currentYear - index,
);

interface YearFilterProps {
  value?: number;
  onChange: (value: number | undefined) => void;
}

export function YearFilter({ value, onChange }: YearFilterProps) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium">
      Year
      <select
        value={value !== undefined ? String(value) : ""}
        onChange={(event) => {
          const nextValue = event.target.value;
          onChange(nextValue ? Number(nextValue) : undefined);
        }}
        className="h-10 rounded-md border border-border bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Any year</option>

        {YEARS.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </label>
  );
}
