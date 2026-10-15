import Image from "next/image";

import type { ReactNode } from "react";

type DetailsHeroMedia =
  | {
      title: string;
      posterUrl: string | null;
      backdropUrl: string | null;
    }
  | {
      name: string;
      posterUrl: string | null;
      backdropUrl: string | null;
    };

interface DetailsHeroProps {
  media: DetailsHeroMedia;
  children: ReactNode;
}

export function DetailsHero({ media, children }: DetailsHeroProps) {
  const title = "title" in media ? media.title : media.name;
  return (
    <section className="relative isolate overflow-hidden rounded-xl">
      {media.backdropUrl ? (
        <Image
          src={media.backdropUrl}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-background/40" />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />

      <div className="relative grid min-h-120 items-end gap-8 p-6 md:min-h-140 md:grid-cols-[220px_minmax(0,1fr)] md:items-center md:p-10">
        {media.posterUrl ? (
          <div className="relative mx-auto aspect-[2/3] w-40 overflow-hidden rounded-lg shadow-xl md:mx-0 md:w-full">
            <Image
              src={media.posterUrl}
              alt={`${title} poster`}
              fill
              sizes="(max-width: 768px) 160px, 220px"
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-[2/3] w-40 items-center justify-center rounded-lg bg-muted text-center text-sm text-muted-foreground md:w-full">
            No poster available
          </div>
        )}

        <div className="min-w-0 max-w-3xl space-y-5">{children}</div>
      </div>
    </section>
  );
}
