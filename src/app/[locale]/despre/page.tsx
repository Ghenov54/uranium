import { getTranslations, getLocale } from "next-intl/server";
import { PageHero } from "@/components/ui/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { client } from "@/sanity/client";
import { TEAM_QUERY } from "@/sanity/queries/team";
import { t as tLocale } from "@/sanity/lib/locale";
import { urlFor } from "@/sanity/lib/image";

const valueIcons = [
  // Award
  <svg key="award" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
  // Zap
  <svg key="zap" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  // Lightbulb
  <svg key="bulb" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>,
  // Eye
  <svg key="eye" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
];

type LocaleField = Record<string, string | null | undefined> | null;
type SanityTeamMember = {
  _id: string;
  name: LocaleField;
  role: LocaleField;
  bio: LocaleField;
  photo?: { asset?: { _ref?: string } } | null;
  order?: number | null;
};

export default async function AboutPage() {
  const [t, locale] = await Promise.all([
    getTranslations("aboutPage"),
    getLocale(),
  ]);

  const teamMembers: SanityTeamMember[] = await client
    .fetch<SanityTeamMember[]>(TEAM_QUERY)
    .catch(() => []);

  const values = [
    { title: t("value1Title"), desc: t("value1Desc"), icon: valueIcons[0] },
    { title: t("value2Title"), desc: t("value2Desc"), icon: valueIcons[1] },
    { title: t("value3Title"), desc: t("value3Desc"), icon: valueIcons[2] },
    { title: t("value4Title"), desc: t("value4Desc"), icon: valueIcons[3] },
  ];

  return (
    <>
      <PageHero label={t("label")} title={t("heading")} subtitle={t("subtitle")} />

      {/* Mission */}
      <section className="py-24" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p
                className="mb-4 text-xs uppercase tracking-widest"
                style={{ color: "var(--color-text-muted)" }}
              >
                {t("missionLabel")}
              </p>
              <p
                className="text-2xl font-bold leading-relaxed"
                style={{ color: "var(--color-text-primary)" }}
              >
                {t("missionText")}
              </p>
            </div>
            <div
              className="aspect-[4/3] rounded-3xl"
              style={{
                background: "linear-gradient(135deg, var(--color-card-from) 0%, var(--color-card-to) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="py-24 border-t"
        style={{ borderColor: "var(--color-border)", background: "var(--color-bg-surface)" }}
      >
        <div className="section-container">
          <p
            className="mb-12 text-xs uppercase tracking-widest"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("valuesLabel")}
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl p-8"
                style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              >
                <div
                  className="mb-4 flex size-12 items-center justify-center rounded-xl"
                  style={{ background: "var(--color-accent)", color: "#000" }}
                >
                  {v.icon}
                </div>
                <h3
                  className="mb-2 text-base font-black uppercase tracking-tight"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {teamMembers.length > 0 && (
        <section className="py-24" style={{ background: "var(--color-bg)" }}>
          <div className="section-container">
            <p
              className="mb-12 text-xs uppercase tracking-widest"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("teamLabel")}
            </p>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {teamMembers.map((member) => {
                const name = tLocale(member.name, locale);
                const role = tLocale(member.role, locale);
                const photoUrl = member.photo?.asset?._ref
                  ? urlFor(member.photo).width(400).url()
                  : null;

                return (
                  <div key={member._id} className="flex flex-col items-center text-center">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={name}
                        width={96}
                        height={96}
                        className="mb-4 size-24 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="mb-4 size-24 rounded-full"
                        style={{
                          background: "linear-gradient(135deg, var(--color-card-from) 0%, var(--color-bg) 100%)",
                        }}
                      />
                    )}
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {name}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
                      {role}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
