import type { Movie, MovieDetails } from "@/types/movie";
import type { TV, TVDetails } from "@/types/tv";
import type { CastMember, CrewMember, Credits } from "@/types/credits";
import type { SearchItem, SearchResult } from "@/types/search";
import type {
  TMDBMovie,
  TMDBMovieDetails,
  TMDBTV,
  TMDBTVDetails,
  TMDBCastMember,
  TMDBCrewMember,
  TMDBCredits,
  TMDBSearchResult,
  TMDBSearchResponse,
} from "./types";
import { getImageUrl } from "@/lib/utils/image-url";

export function mapTMDBMovieToMovie(movie: TMDBMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    originalLanguage: movie.original_language,

    posterUrl: getImageUrl(movie.poster_path, "w500"),
    backdropUrl: getImageUrl(movie.backdrop_path, "w1280"),

    releaseDate: movie.release_date || null,

    rating: movie.vote_average,
    voteCount: movie.vote_count,

    genreIds: movie.genre_ids,
  };
}

export function mapTMDBTVToTV(tv: TMDBTV): TV {
  return {
    id: tv.id,
    name: tv.name,
    originalName: tv.original_name,
    overview: tv.overview,
    originalLanguage: tv.original_language,

    posterUrl: getImageUrl(tv.poster_path, "w500"),
    backdropUrl: getImageUrl(tv.backdrop_path, "w1280"),

    firstAirDate: tv.first_air_date || null,

    rating: tv.vote_average,
    voteCount: tv.vote_count,

    genreIds: tv.genre_ids,
    originCountry: tv.origin_country,
  };
}

export function mapTMDBMovieDetailsToMovieDetails(
  movie: TMDBMovieDetails,
): MovieDetails {
  return {
    id: movie.id,
    title: movie.title,
    originalTitle: movie.original_title,
    overview: movie.overview,
    originalLanguage: movie.original_language,

    posterUrl: getImageUrl(movie.poster_path, "w500"),
    backdropUrl: getImageUrl(movie.backdrop_path, "w1280"),

    releaseDate: movie.release_date || null,

    rating: movie.vote_average,
    voteCount: movie.vote_count,

    genreIds: movie.genres.map((genre) => genre.id),

    genres: movie.genres,
    runtime: movie.runtime,
    tagline: movie.tagline,
  };
}

export function mapTMDBTVDetailsToTVDetails(tv: TMDBTVDetails): TVDetails {
  return {
    id: tv.id,
    name: tv.name,
    originalName: tv.original_name,
    overview: tv.overview,
    originalLanguage: tv.original_language,

    posterUrl: getImageUrl(tv.poster_path, "w500"),
    backdropUrl: getImageUrl(tv.backdrop_path, "w1280"),

    firstAirDate: tv.first_air_date || null,

    rating: tv.vote_average,
    voteCount: tv.vote_count,

    genreIds: tv.genres.map((genre) => genre.id),
    originCountry: tv.origin_country,

    genres: tv.genres,
    numberOfEpisodes: tv.number_of_episodes,
    numberOfSeasons: tv.number_of_seasons,
    status: tv.status,
    tagline: tv.tagline,
  };
}

export function mapTMDBCastMemberToCastMember(
  member: TMDBCastMember,
): CastMember {
  return {
    id: member.id,
    name: member.name,
    character: member.character,
    profileUrl: getImageUrl(member.profile_path, "w185"),
    order: member.order,
  };
}

export function mapTMDBCrewMemberToCrewMember(
  member: TMDBCrewMember,
): CrewMember {
  return {
    id: member.id,
    name: member.name,
    job: member.job,
    department: member.department,
    profileUrl: getImageUrl(member.profile_path, "w185"),
  };
}

export function mapTMDBCreditsToCredits(credits: TMDBCredits): Credits {
  return {
    cast: credits.cast.map(mapTMDBCastMemberToCastMember),
    crew: credits.crew.map(mapTMDBCrewMemberToCrewMember),
  };
}

function isTMDBMovie(result: TMDBSearchResult): result is TMDBMovie {
  return "title" in result;
}

function isTMDBTV(result: TMDBSearchResult): result is TMDBTV {
  return "first_air_date" in result;
}

export function mapTMDBSearchToSearchResult(
  response: TMDBSearchResponse,
): SearchResult<SearchItem> {
  const results: SearchItem[] = [];

  for (const result of response.results) {
    if (isTMDBMovie(result)) {
      results.push(mapTMDBMovieToMovie(result));
      continue;
    }

    if (isTMDBTV(result)) {
      results.push(mapTMDBTVToTV(result));
    }
  }

  return {
    results,
    page: response.page,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  };
}
