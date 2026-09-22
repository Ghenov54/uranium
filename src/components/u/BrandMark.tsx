import type { PlaceholderBrand } from "@/data/placeholders";

/** A simple geometric mark plus wordmark for a placeholder brand (single colour, inherits currentColor). */
export function BrandMark({ brand, size = 26 }: { brand: PlaceholderBrand; size?: number }) {
  return (
    <span className="u-brand">
      <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden>
        {brand.mark === "ring" && <circle cx="13" cy="13" r="9.5" fill="none" stroke="currentColor" strokeWidth="4" />}
        {brand.mark === "split" && (
          <>
            <path d="M13 2a11 11 0 0 0 0 22Z" fill="currentColor" />
            <path d="M15.5 2.3a11 11 0 0 1 0 21.4Z" fill="currentColor" opacity="0.45" />
          </>
        )}
        {brand.mark === "dot" && (
          <>
            <rect x="2" y="2" width="22" height="22" rx="7" fill="currentColor" />
            <circle cx="17" cy="9" r="3.4" fill="var(--bg, #fff)" />
          </>
        )}
        {brand.mark === "stack" && (
          <>
            <rect x="2" y="3" width="22" height="5" rx="2.5" fill="currentColor" />
            <rect x="6" y="10.5" width="18" height="5" rx="2.5" fill="currentColor" />
            <rect x="10" y="18" width="14" height="5" rx="2.5" fill="currentColor" />
          </>
        )}
        {brand.mark === "wave" && <path d="M2 16c3.5-7 7-7 11 0s7.5 7 11 0" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />}
        {brand.mark === "tri" && <path d="M13 2 24.5 23h-23Z" fill="currentColor" />}
      </svg>
      <span>{brand.name}</span>
    </span>
  );
}
