import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { TEAM_QUERY } from "@/sanity/queries/team";
import { t as tl } from "@/sanity/lib/locale";
import { img, type Localized, type SanityImage } from "@/lib/sanity-helpers";
import { PageIntro } from "@/components/u/PageIntro";

type TeamMember = { _id: string; name: Localized; role: Localized; bio: Localized; photo?: SanityImage };

export default async function AboutPage() {
  const [locale, t, ta, team] = await Promise.all([
    getLocale(),
    getTranslations("pages"),
    getTranslations("aboutPage"),
    client.fetch<TeamMember[]>(TEAM_QUERY).catch(() => []),
  ]);

  const values = [1, 2, 3, 4].map((n) => ({ title: ta(`value${n}Title`), desc: ta(`value${n}Desc`) }));

  return (
    <>
      <PageIntro title={t("aboutTitle")} lead={t("aboutLead")} />

      <section className="u-section u-section--flush">
        <div className="u-wrap">
          <p className="u-lede u-lede--xl">{ta("missionText")}</p>
        </div>
      </section>

      <section className="u-section">
        <div className="u-wrap">
          <div className="u-head">
            <h2 className="u-h2">{t("valuesTitle")}</h2>
          </div>
          <ul className="u-features">
            {values.map((v) => (
              <li key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {team.length > 0 && (
        <section className="u-section u-section--flush-top">
          <div className="u-wrap">
            <div className="u-head">
              <h2 className="u-h2">{t("teamTitle")}</h2>
            </div>
            <ul className="u-team">
              {team.map((m) => {
                const name = tl(m.name, locale);
                const photo = img(m.photo, 800, 1000);
                return (
                  <li key={m._id}>
                    <div className="u-team__photo">
                      {photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={photo} alt={name} loading="lazy" decoding="async" />
                      ) : (
                        <span aria-hidden>{name.charAt(0)}</span>
                      )}
                    </div>
                    <h3>{name}</h3>
                    <p>{tl(m.role, locale)}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

    </>
  );
}
