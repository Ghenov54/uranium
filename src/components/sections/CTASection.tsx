import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  const t = useTranslations("cta");

  return (
    <section
      className="relative py-24 border-t overflow-hidden"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Decorative blob — top right */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "var(--color-accent)",
          opacity: 0.05,
        }}
      />

      {/* Decorative blob — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-3xl"
        style={{
          background: "var(--color-accent)",
          opacity: 0.05,
        }}
      />

      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto">
          {/* Label */}
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--color-text-muted)" }}
          >
            {t("label")}
          </p>

          {/* Heading */}
          <h2
            className="text-5xl md:text-7xl font-black leading-none"
            style={{ color: "var(--color-text-primary)" }}
          >
            {t("heading")}
          </h2>

          {/* CTA Button */}
          <div className="mt-10">
            <Link href="/contact">
              <Button
                variant="primary"
                className="px-10 py-4 text-lg"
              >
                {t("button")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
