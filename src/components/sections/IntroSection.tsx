import { useTranslations } from "next-intl";
import { AnimateIn } from "@/components/ui/AnimateIn";

const icons = {
  award: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  bolt: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  chart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  ),
};

export function IntroSection() {
  const t = useTranslations("intro");

  const cards = [
    { icon: icons.award, stat: "15+", statLabel: "AWARDS", title: t("card1Title"), desc: t("card1Desc"), delay: 0 },
    { icon: icons.bolt, stat: "2-4", statLabel: "WEEKS", title: t("card2Title"), desc: t("card2Desc"), delay: 130 },
    { icon: icons.chart, stat: "+64%", statLabel: "AVG GROWTH", title: t("card3Title"), desc: t("card3Desc"), delay: 260 },
  ];

  return (
    <section className="py-24" style={{ background: "var(--color-bg)" }}>
      <div className="section-container">
        {/* Heading */}
        <AnimateIn className="mb-20 max-w-4xl">
          <h2
            className="text-3xl font-black uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            <span>{t("heading1")} </span>
            <span>{t("heading2")}</span>
            <br />
            <span>{t("heading3")} </span>
            <span style={{ color: "var(--color-text-muted)" }}>{t("heading4")}</span>
          </h2>
        </AnimateIn>

        {/* Feature cards — staggered */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <AnimateIn key={i} delay={card.delay}>
              <div
                className="group flex min-h-[350px] flex-col justify-between rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-2"
                style={{
                  background: "linear-gradient(135deg, #1e3a8a 0%, #000000 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-white/20 text-white transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-white">{card.stat}</p>
                    <p className="text-xs text-white/60">{card.statLabel}</p>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold uppercase text-white">{card.title}</h3>
                  <p className="text-sm text-white/70">{card.desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
