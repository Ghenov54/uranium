"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { submitContact } from "@/app/actions/contact";

type Status = "idle" | "pending" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const inputStyle: React.CSSProperties = {
    background: "var(--color-bg-surface)",
    color: "var(--color-text-primary)",
    border: "1px solid var(--color-border)",
  };
  const inputClass =
    "w-full rounded-lg px-4 py-3 text-sm outline-none transition-colors focus:ring-1 focus:ring-[var(--color-accent)]";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("pending");
    const formData = new FormData(e.currentTarget);
    const result = await submitContact(formData);
    if (result.success) {
      setStatus("success");
    } else {
      setErrorMsg(result.error ?? t("errorGeneric"));
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div
          className="mb-6 flex size-16 items-center justify-center rounded-full text-2xl font-bold"
          style={{ background: "var(--color-accent)", color: "#000" }}
        >
          ✓
        </div>
        <h3
          className="text-2xl font-black uppercase tracking-tight"
          style={{ color: "var(--color-text-primary)" }}
        >
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {t("successDesc")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          placeholder={t("namePlaceholder")}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>
      <input
        name="phone"
        type="tel"
        placeholder={t("phonePlaceholder")}
        className={inputClass}
        style={inputStyle}
      />
      <select
        name="service"
        required
        className={inputClass}
        style={{ ...inputStyle, appearance: "none" as const }}
        defaultValue=""
      >
        <option value="" disabled>
          {t("servicePlaceholder")}
        </option>
        <option value="Dezvoltare Web">{t("serviceWeb")}</option>
        <option value="Aplicații">{t("serviceApps")}</option>
        <option value="Marketing Digital">{t("serviceMarketing")}</option>
        <option value="Soluții Business">{t("serviceBusiness")}</option>
        <option value="Design & Branding">{t("serviceDesign")}</option>
        <option value="Altul">{t("serviceOther")}</option>
      </select>
      <textarea
        name="message"
        rows={5}
        placeholder={t("messagePlaceholder")}
        required
        className={inputClass}
        style={inputStyle}
      />
      {status === "error" && (
        <p className="text-sm text-red-500">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full rounded-lg px-6 py-4 text-sm font-bold uppercase tracking-wide transition-opacity disabled:opacity-50"
        style={{ background: "var(--color-accent)", color: "#000" }}
      >
        {status === "pending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
