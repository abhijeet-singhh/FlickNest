import Image from "next/image";
import type { CastMember } from "@/types/credits";

interface CastListProps {
  cast: CastMember[];
}

export function CastList({ cast }: CastListProps) {
  if (cast.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="details-cast-heading" className="space-y-4">
      <h2 id="details-cast-heading" className="text-lg font-semibold">
        Top Cast
      </h2>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {cast.slice(0, 12).map((member) => (
          <li key={`${member.id}-${member.character}`} className="min-w-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-muted">
              {member.profileUrl ? (
                <Image
                  src={member.profileUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 160px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full items-center justify-center px-3 text-center text-sm text-muted-foreground">
                  No photo available
                </div>
              )}
            </div>

            <div className="mt-2 space-y-1">
              <p className="truncate text-sm font-medium">{member.name}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">
                {member.character || "Unknown role"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
