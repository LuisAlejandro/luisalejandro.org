export type ArrowKind = "internal" | "external" | "down";
export type ArrowSize = "sm" | "md" | "lg";

/**
 * Where a link goes decides its arrow (R1): another page here is →, leaving
 * the site (another domain, mail, a booking) is ↗, the same page further down
 * or a file to download (a PDF, a feed) is ↓.
 */
export function arrowKind(href: string): ArrowKind {
  // A file is downloaded rather than read: documents and the feeds.
  if (
    href.startsWith("#") ||
    href.startsWith("/files/") ||
    /\.(xml|json|pdf)$/.test(href)
  )
    return "down";
  if (/^(https?:|mailto:)/.test(href)) return "external";
  return "internal";
}

const GLYPH: Record<ArrowKind, string> = {
  internal: "→",
  external: "↗",
  down: "↓",
};

/**
 * The one interface arrow (R6). Size comes from the element it sits in (R2),
 * colour from the link text (R3), and the motion plays when its link or row is
 * hovered or focused (R4); the stylesheet keys all of it on `.site-arrow`.
 * Arrows used as words in prose are plain text and never use this.
 */
export function Arrow({
  href,
  kind,
  size = "md",
  className = "",
}: {
  /** The link's destination; or pass `kind` directly. */
  href?: string;
  kind?: ArrowKind;
  size?: ArrowSize;
  className?: string;
}) {
  const resolved = kind ?? (href ? arrowKind(href) : "internal");
  return (
    <span
      aria-hidden="true"
      className={`site-arrow ${className}`.trim()}
      data-kind={resolved}
      data-size={size}
    >
      {GLYPH[resolved]}
    </span>
  );
}
