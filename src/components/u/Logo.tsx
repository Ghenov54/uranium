/** Uranium mark: a solid disc with a glowing nucleus, beside the lowercase wordmark. */
export function Logo() {
  return (
    <span className="u-logo">
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
        <circle cx="15" cy="15" r="14" fill="currentColor" />
        <circle cx="19.5" cy="10.5" r="4.5" fill="var(--uranium)" />
      </svg>
      <span>uranium</span>
    </span>
  );
}
