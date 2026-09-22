"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { submitContact } from "@/app/actions/contact";
import { ArrowUpRight } from "@/components/u/icons";

type Status = "idle" | "pending" | "success" | "error";

// Values stay in Romanian: the Telegram message the team receives is read in Romanian.
const SERVICES = [
  { value: "Dezvoltare Web", key: "serviceWeb" },
  { value: "Aplicații", key: "serviceApps" },
  { value: "Marketing Digital", key: "serviceMarketing" },
  { value: "Soluții Business", key: "serviceBusiness" },
  { value: "Design & Branding", key: "serviceDesign" },
  { value: "Altul", key: "serviceOther" },
] as const;

export function ContactForm() {
  const t = useTranslations("contact");
  const tp = useTranslations("pages");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    try {
      const result = await submitContact(new FormData(e.currentTarget));
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div
          key="done"
          className="u-form-done"
          role="status"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <h2>{t("successTitle")}</h2>
          <p>{t("successDesc")}</p>
        </motion.div>
      ) : (
        <motion.form key="form" className="u-form" onSubmit={handleSubmit} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          <fieldset className="u-field">
            <legend>{tp("formService")}</legend>
            <div className="u-choices">
              {SERVICES.map((s, i) => (
                <label key={s.value}>
                  <input type="radio" name="service" value={s.value} required={i === 0} />
                  <span>{t(s.key)}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="u-form__row">
            <div className="u-field">
              <label htmlFor="cf-name">{tp("formName")}</label>
              <input id="cf-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="u-field">
              <label htmlFor="cf-email">{tp("formEmail")}</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>

          <div className="u-field">
            <label htmlFor="cf-phone">
              {tp("formPhone")} <span className="u-field__hint">{tp("formPhoneHint")}</span>
            </label>
            <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="u-field">
            <label htmlFor="cf-message">{tp("formMessage")}</label>
            <textarea id="cf-message" name="message" rows={5} maxLength={2000} required aria-describedby="cf-message-hint" />
            <p id="cf-message-hint" className="u-field__hint">
              {tp("formMessageHint")}
            </p>
          </div>

          {status === "error" && (
            <p className="u-form__error" role="alert">
              {t("errorGeneric")}
            </p>
          )}

          <button type="submit" className="u-btn u-btn--accent u-btn--lg u-form__submit" disabled={status === "pending"}>
            {status === "pending" ? t("sending") : t("submit")}
            <ArrowUpRight />
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
