interface DetailsOverviewProps {
  overview: string;
}

export function DetailsOverview({ overview }: DetailsOverviewProps) {
  return (
    <section aria-labelledby="details-overview-heading" className="space-y-2">
      <h2 id="details-overview-heading" className="text-lg font-semibold">
        Overview
      </h2>

      <p className="text-sm leading-7 text-muted-foreground md:text-base">
        {overview || "No overview available."}
      </p>
    </section>
  );
}
