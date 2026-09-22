/**
 * The Uranium wordmark (primary) or the square icon.
 * Black versions sit on light grounds; white versions on ink panels.
 */
export function Logo({ variant = "wordmark", tone = "dark", height = 34 }: { variant?: "wordmark" | "icon"; tone?: "dark" | "light"; height?: number }) {
  const file = `/brand/uranium-${variant === "icon" ? "icon" : "logo"}${tone === "light" ? "-white" : ""}.png`;
  const width = variant === "icon" ? height : Math.round((height * 1119) / 283);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="u-logo" src={file} alt="Uranium" width={width} height={height} style={{ height, width: "auto" }} />
  );
}
