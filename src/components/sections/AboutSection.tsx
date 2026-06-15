import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section
      className="py-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — team photo */}
          <div className="relative w-full overflow-hidden rounded-3xl" style={{ minHeight: 440 }}>
            <img
              src="https://picsum.photos/seed/uranium-office/900/660"
              alt="Echipa Uranium"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Overlay badge */}
            <div
              className="absolute bottom-6 left-6 rounded-2xl px-5 py-3 backdrop-blur-md"
              style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-accent)" }}>
                URANIUM STUDIO
              </p>
              <p className="mt-1 text-sm font-bold text-white">Chișinău, Moldova</p>
            </div>
          </div>

          {/* Right column — Content */}
          <div>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("label")}
            </p>

            <h2
              className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight mt-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              {t("heading")}
            </h2>

            <div
              className="rounded-2xl p-6 mt-6"
              style={{
                background: "linear-gradient(135deg, var(--color-card-from), var(--color-card-to))",
              }}
            >
              <p
                className="text-sm uppercase tracking-widest font-bold"
                style={{ color: "var(--color-accent)" }}
              >
                {t("mission")}
              </p>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("missionText")}
              </p>
            </div>

            {/* Mini-stats row */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black" style={{ color: "var(--color-accent)" }}>
                  100%
                </span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  {t("delivery")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black" style={{ color: "var(--color-accent)" }}>
                  {t("supportLabel")}
                </span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  {t("support")}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-black" style={{ color: "var(--color-accent)" }}>
                  {t("countriesLabel")}
                </span>
                <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
                  {t("countries")}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`/${locale}/despre`}
                className="inline-flex items-center gap-2 rounded-full border px-7 py-3 text-sm font-semibold transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
              >
                Despre echipă
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
