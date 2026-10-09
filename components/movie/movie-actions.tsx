import Link from "next/link";

import { routes } from "@/lib/constants/routes";
import type { Movie } from "@/types/movie";

interface MovieActionsProps {
  movie: Movie;
}

export function MovieActions({ movie }: MovieActionsProps) {
  return (
    <Link
      href={routes.movie(movie.id)}
      className="text-sm font-medium hover:underline"
    >
      View details
    </Link>
  );
}
