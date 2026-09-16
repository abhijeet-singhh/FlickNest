export function formatDate(date: string | null): string | null {
  if (!date) {
    return null;
  }

  const parsedDate = new Date(date);

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);

  return formatted;
}
