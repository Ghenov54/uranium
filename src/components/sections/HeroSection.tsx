import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

type Props = {
  title?: string;
  subtitle?: string;
  cta?: string;
};

export function HeroSection({ title, subtitle, cta }: Props) {
  const t = useTranslations("hero");
  const displayTitle = title || t("tagline");
  const displaySubtitle = subtitle || t("subtitle");
  const displayCta = cta || t("cta");

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black pb-20">
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/60 via-black/40 to-black"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden"
        aria-hidden
      >
        <p className="text-[20vw] font-black uppercase leading-none tracking-tight text-white/5">
          {displayTitle}
        </p>
      </div>
      <div className="section-container relative z-10 w-full">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-widest text-[var(--color-text-muted)]">
            Uranium Digital Agency
          </p>
          <h1 className="mb-6 text-4xl font-black uppercase leading-none tracking-tight text-white sm:text-5xl md:text-6xl lg:text-8xl">
            {displayTitle}
          </h1>
          <p className="mb-8 max-w-md text-lg text-[var(--color-text-muted)]">
            {displaySubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" className="px-8 py-4 text-base">
              {displayCta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Button>
            <Button variant="secondary" className="px-8 py-4 text-base">
              {t("scroll")} ↓
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
