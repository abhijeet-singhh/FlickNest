import type { Movie } from "@/types/movie";

import { MovieRow } from "@/components/movie/movie-row";

import { HomeSection } from "./home-section";

interface TrendingSectionProps {
  movies: Movie[];
}

export function TrendingSection({ movies }: TrendingSectionProps) {
  return (
    <HomeSection title="Trending">
      <MovieRow movies={movies} />
    </HomeSection>
  );
}
