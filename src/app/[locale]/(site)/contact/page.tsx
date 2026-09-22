import { getLocale, getTranslations } from "next-intl/server";
import { client } from "@/sanity/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries/site";
import { PageIntro } from "@/components/u/PageIntro";
import { realPhone } from "@/lib/sanity-helpers";
import { ContactForm } from "./ContactForm";

type Settings = {
  email?: string | null;
  phone?: string | null;
  address?: string | Record<string, string | null | undefined> | null;
  workingHours?: string | Record<string, string | null | undefined> | null;
} | null;

const pick = (v: string | Record<string, string | null | undefined> | null | undefined, locale: string): string | null => {
  if (!v) return null;
  if (typeof v === "string") return v;
  return v[locale] ?? v.ro ?? null;
};

export default async function ContactPage() {
  const [locale, t, tp, settings] = await Promise.all([
    getLocale(),
    getTranslations("contact"),
    getTranslations("pages"),
    client.fetch<Settings>(SITE_SETTINGS_QUERY).catch(() => null),
  ]);

  // Sanity settings first; the translation file holds the fallback values.
  const email = settings?.email ?? t("infoEmailValue");
  const phone = realPhone(settings?.phone ?? t("infoPhoneValue"));
  const hours = pick(settings?.workingHours, locale) ?? t("infoHoursValue");
  const address = pick(settings?.address, locale) ?? t("infoAddressValue");

  return (
    <>
      <PageIntro title={tp("contactTitle")} lead={tp("contactLead")} />
      <section className="u-section u-section--flush">
        <div className="u-wrap u-contact">
          <ContactForm />
          <aside className="u-contact__info" aria-label={tp("contactDetails")}>
            <dl>
              <div>
                <dt>{t("infoEmail")}</dt>
                <dd>
                  <a href={`mailto:${email}`} className="u-link">
                    {email}
                  </a>
                </dd>
              </div>
              {phone && (
                <div>
                  <dt>{t("infoPhone")}</dt>
                  <dd>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="u-link u-tnum">
                      {phone}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt>{t("infoHours")}</dt>
                <dd>{hours}</dd>
              </div>
              <div>
                <dt>{t("infoAddress")}</dt>
                <dd>{address}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
