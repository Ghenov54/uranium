"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  const serviceLinks = [
    { label: "Web", href: "#" },
    { label: "Aplicații", href: "#" },
    { label: "Marketing", href: "#" },
    { label: "Business", href: "#" },
    { label: "Design", href: "#" },
  ];

  const companyLinks = [
    { label: t("aboutUs"), href: "#" },
    { label: t("ourWork"), href: "#" },
    { label: t("careers"), href: "#" },
    { label: t("blogLink"), href: "#" },
    { label: t("contactLink"), href: "#" },
  ];

  const socialLinks = [
    { label: "LI", href: "#", title: "LinkedIn" },
    { label: "TW", href: "#", title: "Twitter/X" },
    { label: "IG", href: "#", title: "Instagram" },
  ];

  return (
    <footer
      className="border-t py-16"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-bg-surface)",
      }}
    >
      <div className="section-container">
        {/* Top grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          {/* Column 1 — Brand */}
          <div>
            <span
              className="text-2xl font-black"
              style={{ color: "var(--color-text-primary)" }}
            >
              URANIUM.
            </span>
            <p
              className="mt-3 text-sm"
              style={{ color: "var(--color-text-muted)" }}
            >
              Creăm experiențe digitale extraordinare.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  title={social.title}
                  className="text-xs font-mono uppercase tracking-widest transition-colors"
                  style={{ color: "var(--color-text-muted)" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.color = "var(--color-accent)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = "var(--color-text-muted)")
                  }
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Services */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("services")}
            </p>
            <ul className="space-y-0">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-1 text-sm transition-colors"
                    style={{ color: "var(--color-text-primary)" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--color-accent)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-primary)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("company")}
            </p>
            <ul className="space-y-0">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-1 text-sm transition-colors"
                    style={{ color: "var(--color-text-primary)" }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.color = "var(--color-accent)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color =
                        "var(--color-text-primary)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("newsletter")}
            </p>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("newsletterDesc")}
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                className="flex-1 rounded-lg px-4 py-2 text-sm bg-transparent focus:outline-none"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-accent)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "var(--color-border)")
                }
              />
              <button
                type="button"
                className="rounded-lg px-4 py-2 text-sm font-bold"
                style={{ background: "var(--color-accent)", color: "#000" }}
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: "var(--color-text-muted)" }}
        >
          <span>{t("copyright")}</span>
          <div className="flex gap-2">
            <a
              href="#"
              className="hover:underline"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("privacy")}
            </a>
            <span>·</span>
            <a
              href="#"
              className="hover:underline"
              style={{ color: "var(--color-text-muted)" }}
            >
              {t("terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
