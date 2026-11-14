import {
  BROW_LEFT,
  BROW_RIGHT,
  GLASSES,
  HAIR,
} from "@components/common/Site/siteMarkPaths";

/**
 * Where each path's segments meet, read from its own data so the handles sit
 * exactly on the outline. Handles both absolute and relative commands.
 */
function anchors(d: string): [number, number][] {
  const tokens = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e-?\d+)?/g) ?? [];
  const points: [number, number][] = [];
  let i = 0;
  let cmd = "";
  let x = 0;
  let y = 0;
  let startX = 0;
  let startY = 0;
  const num = () => Number(tokens[i++]);
  const counts: Record<string, number> = { c: 6, s: 4, q: 4, l: 2, m: 2 };

  while (i < tokens.length) {
    if (/[a-zA-Z]/.test(tokens[i])) cmd = tokens[i++];
    const lower = cmd.toLowerCase();
    const relative = cmd === lower;
    if (lower === "z") {
      x = startX;
      y = startY;
      continue;
    }
    if (lower === "h" || lower === "v") {
      const v = num();
      if (lower === "h") x = relative ? x + v : v;
      else y = relative ? y + v : v;
      points.push([x, y]);
      continue;
    }
    const n = counts[lower];
    if (!n) {
      i++;
      continue;
    }
    const v = Array.from({ length: n }, num);
    const [ex, ey] = v.slice(-2);
    x = relative ? x + ex : ex;
    y = relative ? y + ey : ey;
    if (lower === "m") {
      startX = x;
      startY = y;
      cmd = relative ? "l" : "L";
    }
    points.push([x, y]);
  }
  return points;
}

const SHAPES = [HAIR, BROW_LEFT, BROW_RIGHT, GLASSES];
// Every other anchor: enough to read as a construction, not a pincushion.
const HANDLES = SHAPES.flatMap((d) => anchors(d).filter((_, i) => i % 2 === 0));

/**
 * The face mark as a draft on the drawing board: the outlines unfilled and
 * thin, the construction around them (centre line, eye line, bounding box
 * with its size, the anchor points the curves were built from). Static: the
 * mark already plots itself in the header.
 */
export function SiteMarkDraft({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-8 -8 116 116"
      aria-hidden="true"
      className={`site-mark-draft ${className}`}
    >
      {/* construction: centre line, eye line, brow line, bounding box */}
      <g className="site-mark-draft__guides">
        <path d="M50 -6V106" />
        <path d="M-6 82.5H106" />
        <path d="M-6 66H106" />
        <rect x="4" y="3.9" width="92" height="92.6" />
      </g>

      {/* dimensions */}
      <g className="site-mark-draft__dims">
        <path d="M4 -3H96M4 -5V-1M96 -5V-1" />
        <path d="M101 3.9V96.5M99 3.9H103M99 96.5H103" />
        <text x="50" y="-4.5" textAnchor="middle">
          92
        </text>
        <text
          x="102.5"
          y="50"
          textAnchor="middle"
          transform="rotate(90 102.5 50)"
        >
          93
        </text>
        <circle cx="31" cy="82.5" r="11.5" />
        <circle cx="72" cy="82.5" r="11.5" />
      </g>

      {/* the mark itself, outlines only */}
      <g className="site-mark-draft__lines">
        {SHAPES.map((d) => (
          <path key={d.slice(0, 16)} d={d} />
        ))}
      </g>

      {/* anchor points the curves were built from */}
      <g className="site-mark-draft__handles">
        {HANDLES.map(([x, y], i) => (
          <rect key={i} x={x - 0.9} y={y - 0.9} width="1.8" height="1.8" />
        ))}
      </g>
    </svg>
  );
}
