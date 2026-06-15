"use server";

export type ContactState = {
  success: boolean;
  error?: string;
};

export async function submitContact(formData: FormData): Promise<ContactState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const phone = (formData.get("phone") as string | null)?.trim() ?? "";
  const service = (formData.get("service") as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !service || !message) {
    return { success: false, error: "Completează toate câmpurile obligatorii." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Adresă de email invalidă." };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return { success: false, error: "Configurare server incompletă." };
  }

  const text =
    `🔔 <b>Nou mesaj de contact — Uranium</b>\n\n` +
    `👤 <b>Nume:</b> ${name}\n` +
    `📧 <b>Email:</b> ${email}\n` +
    `📞 <b>Telefon:</b> ${phone || "—"}\n` +
    `🛠 <b>Serviciu:</b> ${service}\n\n` +
    `💬 <b>Mesaj:</b>\n${message}`;

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: "HTML" }),
      }
    );
    if (!res.ok) {
      return { success: false, error: "Eroare la trimitere. Încearcă din nou." };
    }
    return { success: true };
  } catch {
    return { success: false, error: "Eroare de rețea. Încearcă din nou." };
  }
}
