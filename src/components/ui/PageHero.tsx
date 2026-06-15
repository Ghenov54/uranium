type PageHeroProps = {
  label?: string;
  title: string;
  subtitle?: string;
};

export function PageHero({ label, title, subtitle }: PageHeroProps) {
  return (
    <section className="pb-16 pt-32" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {label && (
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8" style={{ background: "var(--color-text-muted)" }} />
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {label}
            </span>
          </div>
        )}
        <h1
          className="text-5xl font-black uppercase leading-none tracking-tight sm:text-6xl md:text-7xl"
          style={{ color: "var(--color-text-primary)" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-6 max-w-xl text-lg"
            style={{ color: "var(--color-text-muted)" }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
