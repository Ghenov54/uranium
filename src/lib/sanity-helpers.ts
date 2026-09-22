import { urlFor } from "@/sanity/lib/image";

export type Localized = Record<string, string | null | undefined> | null;
export type SanityImage = { asset?: { _ref?: string } } | null | undefined;

/** Cropped, format-negotiated Sanity image URL, or null when the image is missing. */
export const img = (src: SanityImage, w: number, h?: number) => {
  if (!src?.asset?._ref) return null;
  const b = urlFor(src).width(w).auto("format").quality(82);
  return (h ? b.height(h).fit("crop") : b).url();
};

/** Service slug to the portfolio category it shows work from. */
export const SERVICE_CATEGORY: Record<string, string> = {
  web: "web",
  aplicatii: "apps",
  marketing: "marketing",
  business: "business",
  design: "design",
};

/** The seeded placeholder number; never show it as if it were real. */
export const realPhone = (p?: string | null) => (p && !/60\s*000\s*000/.test(p) ? p : null);
