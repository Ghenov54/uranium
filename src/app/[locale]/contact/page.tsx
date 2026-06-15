import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "./ContactForm";

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-4 border-b" style={{ borderColor: "var(--color-border)" }}>
      <p className="text-xs uppercase tracking-widest" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className="mt-1 text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
        {value}
      </p>
    </div>
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  return (
    <>
      <PageHero
        label={t("label")}
        title={t("heading")}
        subtitle={t("subtitle")}
      />
      <section className="py-16" style={{ background: "var(--color-bg)" }}>
        <div className="section-container">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Form */}
            <div>
              <ContactForm />
            </div>
            {/* Info */}
            <div className="pt-2">
              <InfoRow label={t("infoEmail")} value={t("infoEmailValue")} />
              <InfoRow label={t("infoPhone")} value={t("infoPhoneValue")} />
              <InfoRow label={t("infoHours")} value={t("infoHoursValue")} />
              <InfoRow label={t("infoAddress")} value={t("infoAddressValue")} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
