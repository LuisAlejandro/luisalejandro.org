/**

 * Drawing vocabulary shared by the project artworks: the sheet palette, the

 * mono micro-label style, and the annotation primitives every scene reuses.

 */

export const INK = "var(--color-ink)";

export const MUTED = "var(--color-ink-muted)";

export const RULE = "var(--color-rule-strong)";

export const ACCENT = "var(--color-signal)";

export const PAPER = "var(--color-paper)";

export const mono = {
  fontFamily: "var(--font-site-mono)",
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
};

export const frag = (i: number) =>
  ({
    className: "site-art__frag",
    style: { "--i": i } as React.CSSProperties,
  }) as const;

export function Note({
  x,
  y,
  children,
  fill = MUTED,
  size = 8,
  anchor = "start",
  weight,
}: {
  x: number | string;
  y: number | string;
  children: string;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      fontWeight={weight}
      textAnchor={anchor}
      style={mono}
    >
      {children}
    </text>
  );
}

export function Leader({
  d,
  x,
  y,
  label,
  anchor = "start",
  order = 0,
}: {
  d: string;
  x: number | string;
  y: number | string;
  label: string;
  anchor?: "start" | "middle" | "end";
  order?: number;
}) {
  return (
    <g {...frag(order)}>
      <path
        className="site-art__lead"
        d={d}
        fill="none"
        stroke={MUTED}
        strokeWidth="1"
        pathLength={1}
      />
      <Note x={x} y={y} anchor={anchor}>
        {label}
      </Note>
    </g>
  );
}

export function Tip({
  x,
  y,
  angle = 0,
}: {
  x: number | string;
  y: number | string;
  angle?: number;
}) {
  return (
    <path
      d="M-6.5 -3 0 0 -6.5 3"
      fill="none"
      stroke={MUTED}
      strokeWidth="1"
      transform={`translate(${x} ${y}) rotate(${angle})`}
    />
  );
}

/** Paper sheet colours: objects sit on the raised panel tone. */

/** Paper sheet colours: objects sit on the raised panel tone. */
export const SHEET = "var(--color-paper)";

export const PANEL = "var(--color-paper-raised)";

export const beat = (at: number, span = 0.06) =>
  ({ "--at": at, "--span": span }) as React.CSSProperties;

/** A receipt outline with a torn zigzag foot. */

/** A receipt outline with a torn zigzag foot. */
export const receiptPath = (w: number, h: number, tooth: number) => {
  let d = `M0 0H${w}V${h}`;
  for (let x = w; x > 0; x -= tooth * 2)
    d += `l${-tooth} ${tooth} ${-tooth} ${-tooth}`;
  return `${d}Z`;
};

export const BARCODE = [
  2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2,
];

export type Layer = "back" | "front";

/** Voucher with a perforated stub; stamped when the booking lands. */
