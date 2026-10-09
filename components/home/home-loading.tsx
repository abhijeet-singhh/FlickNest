import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";

function MovieRowSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="w-40 shrink-0 space-y-3">
          <Skeleton className="aspect-[2/3] w-full rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function HomeLoading() {
  return (
    <PageContainer>
      <div className="space-y-10">
        <Skeleton className="h-[320px] w-full rounded-lg md:h-[420px]" />

        {Array.from({ length: 3 }).map((_, index) => (
          <section key={index} className="space-y-4">
            <Skeleton className="h-7 w-32" />
            <MovieRowSkeleton />
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
