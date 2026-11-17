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

/** An object on the sheet: the outer group places it, the inner one settles its tilt. */
export function Obj({
  x,
  y,
  r = 0,
  tilt = 4,
  children,
}: {
  x: number;
  y: number;
  r?: number;
  tilt?: number;
  children: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <g
        className="site-obj"
        style={{ "--tilt-in": `${tilt}deg` } as React.CSSProperties}
      >
        {children}
      </g>
    </g>
  );
}

/** Window chrome: offset shadow, body, title bar with three dots and a title. */
export function Win({ w, h, title }: { w: number; h: number; title: string }) {
  return (
    <>
      <rect
        x="5"
        y="5"
        width={w}
        height={h}
        rx="6"
        fill={SHEET}
        stroke={RULE}
      />
      <rect width={w} height={h} rx="6" fill={SHEET} stroke={INK} />
      <path d={`M0 28H${w}`} stroke={INK} />
      {[15, 28, 41].map((x) => (
        <circle key={x} cx={x} cy="14" r="3.2" fill="none" stroke={INK} />
      ))}
      <Note x={w / 2} y="18" size={8} anchor="middle">
        {title}
      </Note>
    </>
  );
}

/** A tick that draws itself on its beat. */
export function Check({ x, y, at }: { x: number; y: number; at: number }) {
  return (
    <path
      className="site-draw"
      style={beat(at)}
      d={`M${x} ${y}l3 3 6-8`}
      fill="none"
      stroke={INK}
      strokeWidth="1.2"
      pathLength={1}
    />
  );
}

/** A rubber stamp, double-ruled, that lands on its beat. */
export function Stamp({
  x,
  y,
  r = -12,
  w = 132,
  at,
  children,
}: {
  x: number;
  y: number;
  r?: number;
  w?: number;
  at: number;
  children: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <g className="site-stamp" style={beat(at, 0.08)}>
        <rect
          x={-w / 2}
          y="-20"
          width={w}
          height="40"
          fill={SHEET}
          fillOpacity="0.4"
          stroke={INK}
          strokeWidth="1.6"
        />
        <rect
          x={-w / 2 + 5}
          y="-15"
          width={w - 10}
          height="30"
          fill="none"
          stroke={INK}
          strokeWidth="0.8"
        />
        <Note x="0" y="5" size={13} fill={INK} anchor="middle" weight={600}>
          {children}
        </Note>
      </g>
    </g>
  );
}

/** The headline figure under the drawing: a number (or phrase) and two notes. */
export function Figure({
  x,
  y,
  value,
  lines,
  accent = true,
  size = 102,
}: {
  x: number;
  y: number;
  value: string;
  lines: [string, string];
  accent?: boolean;
  size?: number;
}) {
  const base = size * 0.61;
  return (
    <g className="site-art__figure" transform={`translate(${x} ${y})`}>
      <g className="site-rise" style={beat(0.86, 0.12)}>
        <text
          y={base}
          fill={accent ? ACCENT : INK}
          fontSize={size}
          fontWeight="500"
          letterSpacing="-.045em"
        >
          {value}
        </text>
        <Note x="4" y={base + 25} size={9}>
          {lines[0]}
        </Note>
        <Note x="4" y={base + 43} size={7}>
          {lines[1]}
        </Note>
      </g>
    </g>
  );
}
