export function t(
  field: Record<string, string> | null | undefined,
  locale: string
): string {
  if (!field) return "";
  return field[locale] ?? field.ro ?? "";
}
