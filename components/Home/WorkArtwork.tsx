"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Project artwork drawn as a technical collage: outlined UI fragments with
 * micro labels, dimension and leader lines with arrowheads, and the project's
 * key figure in the accent. Nothing raster, nothing traced — every path is
 * drawn from the project's own facts.
 */

type ArtworkProps = { slug: string };

const INK = "var(--color-ink)";
const MUTED = "var(--color-ink-muted)";
const RULE = "var(--color-rule-strong)";
const ACCENT = "var(--color-signal)";
const PAPER = "var(--color-paper)";

const mono = {
  fontFamily: "var(--font-site-mono)",
  letterSpacing: "0.02em",
  textTransform: "uppercase" as const,
};

function Note({
  x,
  y,
  children,
  fill = MUTED,
  size = 8,
  anchor = "start",
}: {
  x: number | string;
  y: number | string;
  children: string;
  fill?: string;
  size?: number;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={size}
      textAnchor={anchor}
      style={mono}
    >
      {children}
    </text>
  );
}

/** A leader line with an arrowhead pointing at the fragment it explains. */
function Leader({
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
    <g
      className="site-art__frag"
      style={{ "--i": order + 4 } as React.CSSProperties}
    >
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

/** Arrowhead at (x, y), pointing along `angle` in degrees. */
function Tip({
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

/** A horizontal dimension with end ticks and its measurement above. */
function Dimension({
  x1,
  x2,
  y,
  label,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
}) {
  return (
    <g className="site-art__frag" style={{ "--i": 8 } as React.CSSProperties}>
      <path
        d={`M${x1} ${y}h${x2 - x1}`}
        stroke={MUTED}
        strokeWidth="1"
        fill="none"
      />
      <path
        d={`M${x1} ${y - 5}v10M${x2} ${y - 5}v10`}
        stroke={MUTED}
        strokeWidth="1"
        fill="none"
      />
      <Note x={(x1 + x2) / 2} y={y - 8} anchor="middle">
        {label}
      </Note>
    </g>
  );
}

/** Expedia: search, availability, booking — and the bookings that followed. */
function ExpediaArt() {
  return (
    <>
      {/* Search */}
      <g className="site-art__frag" style={{ "--i": 0 } as React.CSSProperties}>
        <rect
          x="52"
          y="72"
          width="248"
          height="124"
          fill="none"
          stroke={RULE}
        />
        <Note x="70" y="94">
          Search
        </Note>
        <line x1="70" y1="106" x2="282" y2="106" stroke={RULE} />
        <Note x="70" y="126" size={11} fill={INK}>
          Madrid · 12–18 Mar · 2 guests
        </Note>
        <line x1="70" y1="140" x2="214" y2="140" stroke={RULE} />
        <Note x="70" y="158">
          accessible · hotel
        </Note>
        <rect x="214" y="146" width="68" height="24" fill={INK} />
        <Note x="248" y="161" fill={PAPER} anchor="middle">
          search
        </Note>
      </g>

      {/* Availability */}
      <g className="site-art__frag" style={{ "--i": 1 } as React.CSSProperties}>
        <rect
          x="352"
          y="150"
          width="280"
          height="176"
          fill="none"
          stroke={RULE}
        />
        <Note x="370" y="172">
          Availability
        </Note>
        <line x1="370" y1="184" x2="614" y2="184" stroke={RULE} />
        {[
          ["Hotel Aurora", "12 rooms", "$120"],
          ["Casa Miraflores", "4 rooms", "$98"],
          ["Gran Via Suites", "27 rooms", "$210"],
        ].map(([name, rooms, price], i) => (
          <g key={name}>
            <Note x="370" y={210 + i * 34} size={10} fill={INK}>
              {name}
            </Note>
            <Note x="520" y={210 + i * 34}>
              {rooms}
            </Note>
            <Note x="614" y={210 + i * 34} size={10} fill={INK} anchor="end">
              {price}
            </Note>
            <line
              x1="370"
              y1={220 + i * 34}
              x2="614"
              y2={220 + i * 34}
              stroke={RULE}
            />
            {i === 1 && (
              <line
                x1="370"
                y1={220 + i * 34}
                x2="428"
                y2={220 + i * 34}
                stroke={INK}
              />
            )}
          </g>
        ))}
      </g>

      {/* Booking */}
      <g className="site-art__frag" style={{ "--i": 2 } as React.CSSProperties}>
        <rect
          x="590"
          y="352"
          width="256"
          height="112"
          fill="none"
          stroke={RULE}
        />
        <circle cx="614" cy="378" r="9" fill="none" stroke={INK} />
        <path d="M610 378l3 3 6-7" fill="none" stroke={INK} />
        <Note x="634" y="382" size={11} fill={INK}>
          Booking confirmed
        </Note>
        <Note x="610" y="406">
          WTW-2023-0417
        </Note>
        <line x1="610" y1="418" x2="826" y2="418" stroke={RULE} />
        <Note x="610" y="440">
          shopping + booking engines
        </Note>
      </g>

      {/* The figure: the one accent in the panel. */}
      <g className="site-art__frag" style={{ "--i": 3 } as React.CSSProperties}>
        <text
          x="694"
          y="130"
          fill={ACCENT}
          fontSize="62"
          fontWeight="500"
          letterSpacing="-0.045em"
        >
          39%
        </text>
        <Note x="696" y="150">
          more bookings · Q1 2023
        </Note>
      </g>

      {/* Leaders: each points at the fragment it explains. */}
      <Leader
        d="M176 196v18h-52v16"
        x={124}
        y={244}
        label="search engine"
        anchor="middle"
      />
      <Tip x={124} y={230} angle={90} />
      <Leader
        d="M420 150v-26"
        x={420}
        y={112}
        label="get /properties"
        order={1}
      />
      <Tip x={420} y={136} angle={-90} />
      <Leader
        d="M590 400h-30v-16"
        x={560}
        y={370}
        label="hold + book"
        anchor="middle"
        order={2}
      />
      <Tip x={560} y={384} angle={-90} />

      {/* Order */}
      <g className="site-art__frag" style={{ "--i": 4 } as React.CSSProperties}>
        <rect
          x="52"
          y="286"
          width="248"
          height="150"
          fill="none"
          stroke={RULE}
        />
        <Note x="70" y="308">
          Booking · job #0417
        </Note>
        <line x1="70" y1="320" x2="282" y2="320" stroke={RULE} />
        {[
          ["6 nights", "$720"],
          ["2 rooms", "$240"],
          ["accessible transfer", "$280"],
        ].map(([label, amount], i) => (
          <g key={label}>
            <Note x="70" y={342 + i * 22} size={9} fill={INK}>
              {label}
            </Note>
            <Note x="282" y={342 + i * 22} size={9} fill={INK} anchor="end">
              {amount}
            </Note>
          </g>
        ))}
        <line x1="70" y1="392" x2="282" y2="392" stroke={RULE} />
        <Note x="70" y="415" size={9} fill={INK}>
          total
        </Note>
        <Note x="282" y="415" size={11} fill={INK} anchor="end">
          $1,240
        </Note>
      </g>

      <Dimension x1={52} x2={300} y={478} label="1,000 → 600,000 properties" />

      {/* Registration marks, as on a drawing sheet. */}
      <g stroke={RULE} strokeWidth="1" fill="none">
        <path d="M40 60h-8M40 60v-8M860 60h8M860 60v-8M40 500h-8M40 500v8M860 500h8M860 500v8" />
      </g>
    </>
  );
}

const ART: Record<string, () => React.JSX.Element> = {
  "/case-studies/expedia": ExpediaArt,
};

export function WorkArtwork({ slug }: ArtworkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const Art = ART[slug];

  useEffect(() => {
    const host = ref.current;
    if (!host || !Art) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.requestAnimationFrame(() => setDrawn(true));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [Art]);

  if (!Art) return null;

  return (
    <div ref={ref} className="site-art" data-drawn={drawn}>
      <svg viewBox="0 0 900 560" role="presentation" focusable="false">
        <Art />
      </svg>
    </div>
  );
}

/** True when an artwork exists for this project; the caller falls back to the shot. */
export const hasArtwork = (slug: string) => Boolean(ART[slug]);
