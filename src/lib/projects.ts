/** "ShopNova — Platformă E-Commerce" → { name: "ShopNova", tagline: "Platformă E-Commerce" }. */
export function splitTitle(title: string) {
  const m = title.split(/\s+[—–-]\s+/);
  return m.length > 1 ? { name: m[0].trim(), tagline: m.slice(1).join(" ").trim() } : { name: title, tagline: "" };
}

/** First sentence of a description, trimmed to a caption length. */
export function firstSentence(text: string, max = 110) {
  const s = text.split(/(?<=[.!?])\s/)[0]?.trim() ?? "";
  const clean = s.replace(/[.!?]$/, "");
  return clean.length > max ? clean.slice(0, max).replace(/\s+\S*$/, "") + "…" : clean;
}
