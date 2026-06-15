"use server";

export type ContactState = {
  success: boolean;
  error?: string;
};

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

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

  if (message.length > 2000) {
    return { success: false, error: "Mesajul este prea lung (max 2000 caractere)." };
  }

  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (!BOT_TOKEN || !CHAT_ID) {
    return { success: false, error: "Configurare server incompletă." };
  }

  const text =
    `🔔 <b>Nou mesaj de contact — Uranium</b>\n\n` +
    `👤 <b>Nume:</b> ${esc(name)}\n` +
    `📧 <b>Email:</b> ${esc(email)}\n` +
    `📞 <b>Telefon:</b> ${esc(phone) || "—"}\n` +
    `🛠 <b>Serviciu:</b> ${esc(service)}\n\n` +
    `💬 <b>Mesaj:</b>\n${esc(message)}`;

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
      const body = await res.json().catch(() => null);
      console.error("Telegram API error:", body);
      return { success: false, error: "Eroare la trimitere. Încearcă din nou." };
    }
    return { success: true };
  } catch (err) {
    console.error("Contact form network error:", err);
    return { success: false, error: "Eroare de rețea. Încearcă din nou." };
  }
}
