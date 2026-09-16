type ImageSize =
  "w185" | "w342" | "w500" | "w780" | "w300" | "w1280" | "original";

type Path = string | null;

export function getImageUrl(path: Path, imageSize: ImageSize): string | null {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${imageSize}${path}`;
}
