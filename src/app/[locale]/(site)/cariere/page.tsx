import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/u/Reveal";
import { ArrowRight, Plus } from "@/components/u/icons";
import { Shapes } from "@/components/u/three/Shapes";

type Job = {
  id: string;
  title: string;
  team: string;
  type: string;
  place: string;
  about: string;
  reqs: string[];
};
type Perk = { t: string; d: string };

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("careers");
  return { title: `${t("eyebrow")} | Uranium`, description: t("lead") };
}

/** Careers: a short pitch, what working here is like, and the open roles as expandable rows. */
export default async function CareersPage() {
  const [locale, t] = await Promise.all([
    getLocale(),
    getTranslations("careers"),
  ]);
  const jobs = t.raw("jobs") as Job[];
  const perks = t.raw("perks") as Perk[];
  const title = t("title");
  const contact = `/${locale}/contact`;

  return (
    <>
      <section className="u-dark u-panel u-car-hero">
        <div className="u-wrap u-cx-hero__grid">
          <div className="u-car-hero__inner">
            <p
              className="u-cx-eyebrow u-enter"
              style={{ "--d": "120ms" } as React.CSSProperties}
            >
              <span className="u-cx-dot" aria-hidden />
              {t("eyebrow")}
              <b className="u-car-count">{jobs.length}</b>
            </p>
            <h1 className="u-cx-hero__title" aria-label={title}>
              {title.split(" ").map((w, i) => (
                <span key={i} className="u-rise" aria-hidden>
                  <span style={{ "--i": i } as React.CSSProperties}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="u-cx-hero__lead u-enter">{t("lead")}</p>
            <a
              href="#open"
              className="u-btn u-btn--accent u-btn--lg u-enter"
              style={{ "--d": "450ms" } as React.CSSProperties}
            >
              {t("openTitle")}
              <ArrowRight />
            </a>
          </div>
          <div className="u-cx-hero__scene">
            <Shapes variant="discs" />
          </div>
        </div>
      </section>

      <section className="u-section u-car-perks">
        <div className="u-wrap">
          <Reveal>
            <h2 className="u-cx-h2">{t("perksTitle")}</h2>
          </Reveal>
          <ol className="u-car-perks__grid">
            {perks.map((p, i) => (
              <li key={p.t}>
                <Reveal delay={i * 0.06}>
                  <span className="u-car-perks__n u-tnum">0{i + 1}</span>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="u-section u-car-open" id="open">
        <div className="u-wrap">
          <Reveal className="u-car-open__head">
            <h2 className="u-cx-h2">{t("openTitle")}</h2>
            <span className="u-tnum">{jobs.length}</span>
          </Reveal>
          <ul className="u-car-jobs">
            {jobs.map((j, i) => (
              <li key={j.id}>
                <Reveal delay={i * 0.04}>
                  <details className="u-car-job">
                    <summary>
                      <span className="u-car-job__title">{j.title}</span>
                      <span className="u-car-job__meta">
                        <span>{j.team}</span>
                        <span>{j.type}</span>
                        <span>{j.place}</span>
                      </span>
                      <span className="u-car-job__icon" aria-hidden>
                        <Plus />
                      </span>
                    </summary>
                    <div className="u-car-job__body">
                      <p>{j.about}</p>
                      <div>
                        <h4>{t("requirements")}</h4>
                        <ul>
                          {j.reqs.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                        <Link href={contact} className="u-btn u-btn--accent">
                          {t("apply")}
                          <ArrowRight />
                        </Link>
                      </div>
                    </div>
                  </details>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal className="u-car-nofit">
            <div>
              <h3>{t("noFit")}</h3>
              <p>{t("noFitBody")}</p>
            </div>
            <Link href={contact} className="u-btn u-btn--line u-btn--lg">
              {t("write")}
              <ArrowRight />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
