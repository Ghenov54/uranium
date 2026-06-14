import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section
      className="py-24 border-t"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — Team photo placeholder */}
          <div
            className="w-full aspect-[4/3] rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--color-card-from), var(--color-card-to))",
            }}
          >
            <span
              className="text-3xl font-black tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              ECHIPA URANIUM
            </span>
          </div>

          {/* Right column — Content */}
          <div>
            {/* Label badge */}
            <p
              className="text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("label")}
            </p>

            {/* Heading */}
            <h2
              className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight mt-4"
              style={{ color: "var(--color-text-primary)" }}
            >
              {t("heading")}
            </h2>

            {/* Mission card */}
            <div
              className="rounded-2xl p-6 mt-6"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-card-from), var(--color-card-to))",
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
              {/* Stat 1: Delivery */}
              <div className="flex flex-col gap-1">
                <span
                  className="text-2xl font-black"
                  style={{ color: "var(--color-accent)" }}
                >
                  100%
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t("delivery")}
                </span>
              </div>

              {/* Stat 2: Support */}
              <div className="flex flex-col gap-1">
                <span
                  className="text-2xl font-black"
                  style={{ color: "var(--color-accent)" }}
                >
                  {t("supportLabel")}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t("support")}
                </span>
              </div>

              {/* Stat 3: Countries */}
              <div className="flex flex-col gap-1">
                <span
                  className="text-2xl font-black"
                  style={{ color: "var(--color-accent)" }}
                >
                  {t("countriesLabel")}
                </span>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {t("countries")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
