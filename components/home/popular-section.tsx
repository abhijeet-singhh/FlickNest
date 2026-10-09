import type { Movie } from "@/types/movie";

import { MovieRow } from "@/components/movie/movie-row";

import { HomeSection } from "./home-section";

interface PopularSectionProps {
  movies: Movie[];
}

export function PopularSection({ movies }: PopularSectionProps) {
  return (
    <HomeSection title="Popular">
      <MovieRow movies={movies} />
    </HomeSection>
  );
}
