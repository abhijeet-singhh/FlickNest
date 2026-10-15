import type { MovieDetails } from "@/types/movie";
import type { TVDetails } from "@/types/tv";

type DetailsHeaderProps =
  | {
      mediaType: "movie";
      media: MovieDetails;
    }
  | {
      mediaType: "tv";
      media: TVDetails;
    };

export function DetailsHeader({ mediaType, media }: DetailsHeaderProps) {
  const title = mediaType === "movie" ? media.title : media.name;

  return (
    <header className="space-y-3">
      <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
        {title}
      </h1>

      {media.tagline ? (
        <p className="text-base italic text-muted-foreground md:text-lg">
          {media.tagline}
        </p>
      ) : null}
    </header>
  );
}
