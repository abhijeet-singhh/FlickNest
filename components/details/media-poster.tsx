import Image from "next/image";

interface MediaPosterProps {
  title: string;
  posterUrl: string | null;
}

export function MediaPoster({ title, posterUrl }: MediaPosterProps) {
  if (!posterUrl) {
    return (
      <div className="flex aspect-[2/3] items-center justify-center rounded-md bg-muted">
        <span className="px-3 text-center text-sm text-muted-foreground">
          No poster available
        </span>
      </div>
    );
  }

  return (
    <div className="group relative aspect-[2/3] overflow-hidden rounded-md bg-muted">
      <Image
        src={posterUrl}
        alt={title}
        fill
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        unoptimized
      />
    </div>
  );
}
