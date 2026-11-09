import { PageContainer } from "@/components/layout/page-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function MovieDetailsLoading() {
  return (
    <PageContainer>
      <div className="space-y-8">
        <Skeleton className="h-72 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      </div>
    </PageContainer>
  );
}
