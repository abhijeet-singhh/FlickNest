interface HomeSectionProps {
  title: string;
  children: React.ReactNode;
}

export function HomeSection({ title, children }: HomeSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}
