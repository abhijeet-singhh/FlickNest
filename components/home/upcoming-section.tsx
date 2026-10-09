import type { Movie } from "@/types/movie";

import { MovieRow } from "@/components/movie/movie-row";

import { HomeSection } from "./home-section";

interface UpcomingSectionProps {
  movies: Movie[];
}

export function UpcomingSection({ movies }: UpcomingSectionProps) {
  return (
    <HomeSection title="Upcoming">
      <MovieRow movies={movies} />
    </HomeSection>
  );
}
