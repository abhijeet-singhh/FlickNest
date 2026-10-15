import type { MovieDetails } from "@/types/movie";
import type { TVDetails } from "@/types/tv";

type DetailsMetaProps =
  | {
      mediaType: "movie";
      media: MovieDetails;
    }
  | {
      mediaType: "tv";
      media: TVDetails;
    };

export function DetailsMeta({ mediaType, media }: DetailsMetaProps) {
  const releaseDate =
    mediaType === "movie" ? media.releaseDate : media.firstAirDate;

  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

  const runtime =
    mediaType === "movie" && media.runtime
      ? `${Math.floor(media.runtime / 60)}h ${media.runtime % 60}m`
      : null;

  const seasons =
    mediaType === "tv" && media.numberOfSeasons > 0
      ? `${media.numberOfSeasons} ${
          media.numberOfSeasons === 1 ? "Season" : "Seasons"
        }`
      : null;

  const episodes =
    mediaType === "tv" && media.numberOfEpisodes > 0
      ? `${media.numberOfEpisodes} ${
          media.numberOfEpisodes === 1 ? "Episode" : "Episodes"
        }`
      : null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      {releaseYear ? <span>{releaseYear}</span> : null}

      {runtime ? <span>{runtime}</span> : null}

      {seasons ? <span>{seasons}</span> : null}

      {episodes ? <span>{episodes}</span> : null}

      <span aria-label={`Rating ${media.rating.toFixed(1)} out of 10`}>
        ★ {media.rating.toFixed(1)}
      </span>

      {media.genres.length > 0 ? (
        <ul className="flex flex-wrap items-center gap-2">
          {media.genres.map((genre) => (
            <li
              key={genre.id}
              className="rounded-full border border-border px-2.5 py-1 text-xs"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
