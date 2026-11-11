"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Project artwork drawn as a technical collage: outlined UI fragments with
 * micro labels, dimension and leader lines with arrowheads, elements that
 * overlap and run past the sheet edge, with accent reserved for verified
 * figures. Objects are illustrative, not screenshots or operational records.
 */

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

const frag = (i: number) =>
  ({
    className: "site-art__frag",
    style: { "--i": i } as React.CSSProperties,
  }) as const;

function Note({
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

/** Paper sheet colours: objects sit on the raised panel tone. */
const SHEET = "var(--color-paper)";
const PANEL = "var(--color-paper-raised)";

const beat = (at: number, span = 0.06) =>
  ({ "--at": at, "--span": span }) as React.CSSProperties;

/** A receipt outline with a torn zigzag foot. */
const receiptPath = (w: number, h: number, tooth: number) => {
  let d = `M0 0H${w}V${h}`;
  for (let x = w; x > 0; x -= tooth * 2)
    d += `l${-tooth} ${tooth} ${-tooth} ${-tooth}`;
  return `${d}Z`;
};

const BARCODE = [2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2];

type Layer = "back" | "front";

/** Voucher with a perforated stub; stamped when the booking lands. */
function Voucher() {
  return (
    <g transform="translate(560 550) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
      >
        <rect x="5" y="5" width="360" height="150" fill={SHEET} stroke={RULE} />
        <rect width="360" height="150" fill={SHEET} stroke={INK} />
        <line
          x1="268"
          y1="10"
          x2="268"
          y2="140"
          stroke={RULE}
          strokeDasharray="3 4"
        />
        <circle cx="268" cy="0" r="6" fill={PANEL} stroke={INK} />
        <circle cx="268" cy="150" r="6" fill={PANEL} stroke={INK} />
        <Note x="16" y="24">
          Hotel voucher
        </Note>
        <line x1="16" y1="34" x2="252" y2="34" stroke={RULE} />
        <Note x="16" y="58" size={13} fill={INK} weight={500}>
          Casa Miraflores
        </Note>
        <Note x="16" y="74">
          madrid
        </Note>
        <Note x="16" y="100" size={8} fill={INK}>
          in · 12 mar
        </Note>
        <Note x="120" y="100" size={8} fill={INK}>
          out · 18 mar
        </Note>
        <Note x="16" y="122">
          guest · wheel the world
        </Note>
        <Note x="16" y="138">
          2 rooms · accessible
        </Note>
        <Note x="282" y="24" size={7}>
          no. 0417
        </Note>
        {BARCODE.slice(0, 14).map((w, i) => (
          <rect
            key={i}
            x={282 + BARCODE.slice(0, i).reduce((a, n) => a + n + 2, 0)}
            y="40"
            width={w}
            height="62"
            fill={INK}
          />
        ))}
        <Note x="282" y="128" size={8} fill={INK}>
          wtw
        </Note>
        <g transform="translate(176 74) rotate(-12)">
          <g className="site-stamp" style={beat(0.66, 0.08)}>
            <rect
              x="-66"
              y="-20"
              width="132"
              height="40"
              fill={SHEET}
              fillOpacity="0.4"
              stroke={INK}
              strokeWidth="1.6"
            />
            <rect
              x="-61"
              y="-15"
              width="122"
              height="30"
              fill="none"
              stroke={INK}
              strokeWidth="0.8"
            />
            <Note x="0" y="5" size={13} fill={INK} anchor="middle" weight={600}>
              confirmed
            </Note>
          </g>
        </g>
      </g>
    </g>
  );
}

/** Luggage tag: the trip's own label, flagged priority once booked. */
function LuggageTag() {
  const body = "M22 0H148L170 22V250H0V22Z";
  return (
    <g transform="translate(1112 198) rotate(-10)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <path
          d="M85 17C78 -18 118 -42 142 -20"
          fill="none"
          stroke={INK}
          strokeWidth="1.2"
        />
        <path d={body} transform="translate(4 4)" fill={SHEET} stroke={RULE} />
        <path d={body} fill={SHEET} stroke={INK} />
        <circle cx="85" cy="28" r="14" fill="none" stroke={RULE} />
        <circle cx="85" cy="28" r="8" fill={PANEL} stroke={INK} />
        <Note x="20" y="94" size={36} fill={INK} weight={600}>
          mad
        </Note>
        <Note x="20" y="112">
          madrid · barajas
        </Note>
        <line x1="20" y1="126" x2="150" y2="126" stroke={RULE} />
        <Note x="20" y="148" size={9} fill={INK}>
          wheel the world
        </Note>
        <Note x="20" y="166">
          assist · wheelchair
        </Note>
        <g className="site-step-in" style={beat(0.52)}>
          <rect x="20" y="180" width="66" height="17" fill={INK} />
          <Note x="53" y="192" size={7} fill={PAPER} anchor="middle">
            priority
          </Note>
        </g>
        {BARCODE.slice(0, 16).map((w, i) => (
          <rect
            key={i}
            x={20 + BARCODE.slice(0, i).reduce((a, n) => a + n + 2, 0)}
            y="212"
            width={w}
            height="24"
            fill={INK}
          />
        ))}
      </g>
    </g>
  );
}

/**
 * Expedia, as a booking playing out on a desk: results load, one hotel gets
 * picked, the receipt prints, the voucher is stamped, the tag is flagged,
 * the dates are circled, and the figure lands. The voucher is also drawn in
 * a front layer above the title, so it can cross it.
 */
function ExpediaArt({ layer = "back" }: { layer?: Layer }) {
  const hatch = `hatch-${useId().replace(/[^a-z0-9]/gi, "")}`;

  if (layer === "front") return <Voucher />;

  const results = [
    ["Hotel Aurora", "step-free · roll-in shower", "$120"],
    ["Casa Miraflores", "lift · wide doors · grab bars", "$98"],
    ["Gran Via Suites", "step-free entrance", "$210"],
  ];
  const items = [
    ["6 nights", "$720"],
    ["2 rooms", "$240"],
    ["accessible transfer", "$280"],
  ];
  // March 2023 starts on a Wednesday (Monday-first grid).
  const dayPos = (d: number) => {
    const i = d - 1 + 2;
    return [24 + (i % 7) * 28, 84 + Math.floor(i / 7) * 22] as const;
  };

  return (
    <>
      <defs>
        <pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 6 6 0" stroke={RULE} strokeWidth="1" />
        </pattern>
      </defs>

      {/* Calendar page, behind the browser's top-right corner */}
      <g transform="translate(700 64) rotate(6)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="220"
            height="204"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="220" height="204" fill={SHEET} stroke={INK} />
          {Array.from({ length: 8 }, (_, i) => (
            <circle
              key={i}
              cx={22 + i * 25}
              cy="11"
              r="3.2"
              fill={PANEL}
              stroke={INK}
            />
          ))}
          <Note x="16" y="40" size={11} fill={INK} weight={500}>
            March 2023
          </Note>
          <line x1="16" y1="50" x2="204" y2="50" stroke={RULE} />
          {["m", "t", "w", "t", "f", "s", "s"].map((d, i) => (
            <Note key={i} x={24 + i * 28} y="66" anchor="middle" size={7}>
              {d}
            </Note>
          ))}
          {Array.from({ length: 31 }, (_, k) => {
            const [x, y] = dayPos(k + 1);
            const stay = k + 1 >= 12 && k + 1 <= 18;
            return (
              <Note
                key={k}
                x={x}
                y={y}
                anchor="middle"
                size={8}
                fill={stay ? INK : MUTED}
              >
                {String(k + 1)}
              </Note>
            );
          })}
          {[12, 18].map((d, i) => {
            const [x, y] = dayPos(d);
            return (
              <circle
                key={d}
                className="site-draw"
                style={beat(0.78 + i * 0.06, 0.06)}
                cx={x}
                cy={y - 3}
                r="10"
                fill="none"
                stroke={INK}
                strokeWidth="1.2"
                pathLength={1}
              />
            );
          })}
        </g>
      </g>

      {/* Browser, a size up: the search results load and one hotel is picked */}
      <g transform="translate(250 168) rotate(-2) scale(1.12)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-3deg" } as React.CSSProperties}
        >
          <rect width="430" height="276" rx="6" fill={SHEET} stroke={INK} />
          <line x1="0" y1="28" x2="430" y2="28" stroke={INK} />
          {[14, 26, 38].map((cx) => (
            <circle key={cx} cx={cx} cy="14" r="3.2" fill="none" stroke={INK} />
          ))}
          <rect
            x="62"
            y="7"
            width="262"
            height="14"
            rx="7"
            fill="none"
            stroke={RULE}
          />
          <Note x="74" y="17" size={7}>
            wheeltheworld.com/hotels?city=madrid
          </Note>
          <rect
            x="14"
            y="40"
            width="402"
            height="30"
            fill="none"
            stroke={RULE}
          />
          <Note x="26" y="59" size={9} fill={INK}>
            Madrid · 12–18 Mar · 2 guests
          </Note>
          <rect x="316" y="46" width="92" height="18" rx="9" fill={INK} />
          <Note x="362" y="58" size={7} fill={PAPER} anchor="middle">
            accessible
          </Note>
          <Note x="14" y="90" size={7}>
            3 of 600,000+ properties
          </Note>
          {results.map(([name, tags, price], i) => {
            const y = 100 + i * 56;
            return (
              <g
                key={name}
                className="site-step-in"
                style={beat(0.04 + i * 0.06)}
              >
                <rect
                  x="14"
                  y={y}
                  width="58"
                  height="44"
                  fill={`url(#${hatch})`}
                  stroke={RULE}
                />
                <Note x="84" y={y + 17} size={10} fill={INK}>
                  {name}
                </Note>
                <Note x="84" y={y + 33} size={7}>
                  {tags}
                </Note>
                <Note x="416" y={y + 17} size={10} fill={INK} anchor="end">
                  {price}
                </Note>
                <Note x="416" y={y + 33} size={7} anchor="end">
                  per night
                </Note>
                <line x1="14" y1={y + 50} x2="416" y2={y + 50} stroke={RULE} />
              </g>
            );
          })}
          <g className="site-step-in" style={beat(0.26)}>
            <rect
              x="8"
              y="152"
              width="414"
              height="52"
              rx="3"
              fill="none"
              stroke={INK}
              strokeWidth="1.4"
            />
            <rect x="344" y="145" width="64" height="14" fill={INK} />
            <Note x="376" y="155" size={6.5} fill={PAPER} anchor="middle">
              selected
            </Note>
          </g>
        </g>
      </g>

      <LuggageTag />

      {/* Receipt: prints line by line */}
      <g transform="translate(140 540) rotate(4)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <path
            d={receiptPath(240, 262, 10)}
            transform="translate(4 4)"
            fill={SHEET}
            stroke={RULE}
          />
          <path d={receiptPath(240, 262, 10)} fill={SHEET} stroke={INK} />
          <Note x="120" y="28" anchor="middle" size={9} fill={INK} weight={500}>
            Wheel the world
          </Note>
          <Note x="120" y="42" anchor="middle" size={7}>
            booking · #0417
          </Note>
          <line
            x1="16"
            y1="54"
            x2="224"
            y2="54"
            stroke={RULE}
            strokeDasharray="3 3"
          />
          {items.map(([label, amount], i) => (
            <g
              key={label}
              className="site-step-in"
              style={beat(0.4 + i * 0.05)}
            >
              <Note x="16" y={80 + i * 26} size={8.5} fill={INK}>
                {label}
              </Note>
              <Note x="224" y={80 + i * 26} size={8.5} fill={INK} anchor="end">
                {amount}
              </Note>
            </g>
          ))}
          <line
            x1="16"
            y1="168"
            x2="224"
            y2="168"
            stroke={RULE}
            strokeDasharray="3 3"
          />
          <g className="site-step-in" style={beat(0.56)}>
            <Note x="16" y="194" size={9} fill={INK}>
              total
            </Note>
            <Note
              x="224"
              y="196"
              size={14}
              fill={INK}
              anchor="end"
              weight={500}
            >
              $1,240
            </Note>
          </g>
          <g className="site-step-in" style={beat(0.6)}>
            <Note x="16" y="220" size={7}>
              paid · stripe · 12 mar
            </Note>
            {BARCODE.map((w, i) => (
              <rect
                key={i}
                x={16 + BARCODE.slice(0, i).reduce((a, n) => a + n + 2, 0)}
                y="230"
                width={w}
                height="16"
                fill={INK}
              />
            ))}
          </g>
        </g>
      </g>

      {/* The voucher's back copy is hidden on the pinned stage, where the
          front layer draws it above the title. */}
      <g className="site-art__lift">
        <Voucher />
      </g>

      {/* Room key card, now where the figure was */}
      <g transform="translate(960 650) rotate(11)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "6deg" } as React.CSSProperties}
        >
          <rect
            x="4"
            y="4"
            width="170"
            height="108"
            rx="8"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="170" height="108" rx="8" fill={SHEET} stroke={INK} />
          <rect x="0" y="18" width="170" height="18" fill={INK} />
          <rect
            x="128"
            y="58"
            width="26"
            height="20"
            rx="3"
            fill="none"
            stroke={INK}
          />
          <path d="M128 68h26M141 58v20" stroke={INK} strokeWidth="0.8" />
          <g className="site-step-in" style={beat(0.72)}>
            <Note x="14" y="66" size={12} fill={INK} weight={500}>
              Room 412
            </Note>
            <Note x="14" y="82" size={7}>
              casa miraflores
            </Note>
          </g>
        </g>
      </g>

      {/* The figure, bigger, where the key card was; it lands last */}
      <g transform="translate(1190 600)">
        <g className="site-rise" style={beat(0.84, 0.12)}>
          <text
            x="0"
            y="104"
            fill={ACCENT}
            fontSize="124"
            fontWeight="500"
            letterSpacing="-0.045em"
          >
            39%
          </text>
          <Note x="4" y="128" size={9}>
            more bookings · Q1 2023
          </Note>
        </g>
      </g>

      <Leader
        d="M491 160v-24"
        x={491}
        y={128}
        label="get /properties"
        anchor="middle"
        order={1}
      />
      <Tip x={491} y={138} angle={-90} />
      <Leader
        d="M560 612h-34v-22"
        x={526}
        y={582}
        label="hold + book"
        anchor="middle"
        order={2}
      />
      <Tip x={526} y={590} angle={-90} />
    </>
  );
}

/** A corrugated shipping container: the same image from test to production. */
function CicdContainer() {
  return (
    <g transform="translate(474 560) rotate(-4)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
      >
        <g
          data-cicd="cargo"
          style={{
            transform:
              "translateX(calc((1 - clamp(0, (var(--p) - 0.28) / 0.42, 1)) * -110px))",
          }}
        >
          <path d="M0 20 46 0H490L444 20Z" fill={SHEET} stroke={INK} />
          <path d="M444 20 490 0V156L444 178Z" fill={SHEET} stroke={INK} />
          <rect y="20" width="444" height="158" fill={SHEET} stroke={INK} />
          <path d="M0 32H444M0 166H444" fill="none" stroke={RULE} />
          {Array.from({ length: 17 }, (_, i) => (
            <path
              key={i}
              d={`M${17 + i * 25} 38v114m5-114v114`}
              fill="none"
              stroke={RULE}
              strokeWidth="0.8"
            />
          ))}
          <rect
            x="38"
            y="62"
            width="236"
            height="74"
            fill={SHEET}
            stroke={RULE}
          />
          <Note x="50" y="81" size={8}>
            WTW · release image
          </Note>
          <Note x="50" y="104" size={14} fill={INK} weight={500}>
            app / production
          </Note>
          <Note x="50" y="124" size={8}>
            same image · dev / test / deploy
          </Note>
          <rect
            x="306"
            y="62"
            width="108"
            height="66"
            fill={SHEET}
            stroke={INK}
          />
          <Note x="318" y="80" size={7}>
            multistage build
          </Note>
          <Note x="318" y="100" size={11} fill={INK}>
            1.5 GB
          </Note>
          <path
            className="site-draw"
            style={beat(0.56, 0.08)}
            d="M314 99 385 89"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            pathLength={1}
          />
          <g className="site-step-in" style={beat(0.62)}>
            <rect x="312" y="105" width="94" height="19" fill={SHEET} />
            <Note x="318" y="119" size={12} fill={INK} weight={500}>
              200 MB
            </Note>
          </g>
          {/* Corner castings, door hinges, locking bars and handles. */}
          {[4, 426].flatMap((x) =>
            [24, 160].map((y) => (
              <rect
                key={`${x}-${y}`}
                x={x}
                y={y}
                width="14"
                height="13"
                rx="2"
                fill={SHEET}
                stroke={INK}
              />
            ))
          )}
          <path
            d="M451 28 483 13V145L451 161ZM465 21V152M457 34V146M477 25V138"
            fill="none"
            stroke={INK}
          />
          <path d="M453 63l8-4m-8 54 8-4m10-54 10-5m-10 56 10-5" stroke={INK} />
          <path d="M460 87l10-5v13l-10 5Z" fill={SHEET} stroke={INK} />
          <Note x="42" y="156" size={7}>
            sealed · versioned · reproducible
          </Note>
        </g>
      </g>
    </g>
  );
}

/**
 * Wheel The World: a release crosses a desk. The notebook passes its checks,
 * the container travels toward production, the stopwatch falls from 40 to 10
 * minutes, and the estimated monthly bill is revised. Figures come from this
 * project's case study, not from decorative sample logs.
 */
function CicdArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <CicdContainer />;

  const stages = [
    ["Build", "multistage image", 0.08],
    ["Test", "parallel jobs", 0.24],
    ["Push", "versioned artifact", 0.46],
    ["Deploy", "only if tests pass", 0.68],
  ] as const;

  return (
    <>
      {/* Spiral notebook: cover, stacked pages, binding and a release checklist. */}
      <g transform="translate(234 156) rotate(-5)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
        >
          <rect
            x="-10"
            y="-5"
            width="550"
            height="326"
            rx="5"
            fill={SHEET}
            stroke={INK}
          />
          <rect
            x="8"
            y="7"
            width="526"
            height="308"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="526" height="308" fill={SHEET} stroke={INK} />
          <path d="M50 0V308M64 74H504" stroke={RULE} fill="none" />
          {Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <circle
                cx="16"
                cy={26 + i * 32}
                r="4"
                fill={PANEL}
                stroke={RULE}
              />
              <path
                d={`M17 ${22 + i * 32}C-20 ${8 + i * 32}-21 ${40 + i * 32}17 ${30 + i * 32}`}
                fill="none"
                stroke={INK}
              />
            </g>
          ))}
          <Note x="66" y="27" size={8}>
            Wheel The World · release notebook
          </Note>
          <Note x="66" y="55" size={19} fill={INK} weight={500}>
            CI / continuous delivery
          </Note>
          <Note x="504" y="27" size={7} anchor="end">
            GitHub Actions
          </Note>
          <Note x="66" y="94" size={8}>
            main → image → checks → production
          </Note>
          {stages.map(([name, detail, at], i) => {
            const y = 112 + i * 42;
            return (
              <g key={name}>
                <path d={`M68 ${y + 20}H504`} stroke={RULE} />
                <rect
                  x="68"
                  y={y - 3}
                  width="14"
                  height="14"
                  rx="2"
                  fill="none"
                  stroke={INK}
                />
                <Note x="96" y={y + 8} size={11} fill={INK}>
                  {name}
                </Note>
                <Note x="186" y={y + 8} size={8}>
                  {detail}
                </Note>
                <Note x="498" y={y + 8} size={8} anchor="end">
                  queued
                </Note>
                <g
                  className="site-step-in"
                  style={beat(at, 0.09)}
                  data-cicd={`stage-${name.toLowerCase()}`}
                >
                  <path
                    d={`M71 ${y + 3}l4 4 6-8`}
                    stroke={INK}
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <rect x="432" y={y - 7} width="72" height="22" fill={SHEET} />
                  <Note x="498" y={y + 8} size={8} fill={INK} anchor="end">
                    passed
                  </Note>
                </g>
              </g>
            );
          })}
          <g className="site-step-in" style={beat(0.76)}>
            <Note x="66" y="300" size={7}>
              all checks passed · release ready
            </Note>
          </g>
        </g>
      </g>

      {/* Mechanical stopwatch, with a knurled crown and a moving hand. */}
      <g transform="translate(832 70) rotate(9)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="105"
            y="6"
            width="30"
            height="22"
            rx="3"
            fill={SHEET}
            stroke={INK}
          />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${109 + i * 4} 9v15`} stroke={RULE} />
          ))}
          <rect
            x="114"
            y="28"
            width="12"
            height="19"
            fill={SHEET}
            stroke={INK}
          />
          <path d="M183 59l14-16 13 11-14 16" fill={SHEET} stroke={INK} />
          <circle cx="120" cy="142" r="98" fill={SHEET} stroke={INK} />
          <circle cx="120" cy="142" r="89" fill="none" stroke={RULE} />
          {Array.from({ length: 60 }, (_, i) => {
            const a = (i / 60) * Math.PI * 2;
            const r = i % 5 === 0 ? 73 : 79;
            // Quantise SVG coordinates: Node and Chrome can disagree at
            // trig's final decimal, which otherwise trips hydration.
            return (
              <path
                key={i}
                d={`M${(120 + Math.sin(a) * r).toFixed(3)} ${(142 - Math.cos(a) * r).toFixed(3)}L${(120 + Math.sin(a) * 84).toFixed(3)} ${(142 - Math.cos(a) * 84).toFixed(3)}`}
                stroke={i % 5 === 0 ? INK : RULE}
                fill="none"
              />
            );
          })}
          {[
            [120, 81, "0"],
            [175, 112, "10"],
            [175, 177, "20"],
            [120, 208, "30"],
            [66, 177, "40"],
            [66, 112, "50"],
          ].map(([x, y, n]) => (
            <Note key={n} x={x} y={y} size={9} fill={INK} anchor="middle">
              {String(n)}
            </Note>
          ))}
          <g transform="translate(120 142)">
            <g
              data-cicd="stopwatch-hand"
              style={{
                transform:
                  "rotate(calc(240deg - clamp(0, (var(--p) - 0.12) / 0.64, 1) * 180deg))",
                transformOrigin: "0 0",
              }}
            >
              <path d="M0 15V-65" fill="none" stroke={INK} strokeWidth="1.8" />
            </g>
          </g>
          <circle cx="120" cy="142" r="4.5" fill={INK} />
          <Note x="120" y="164" size={6.5} anchor="middle">
            deploy / minutes
          </Note>
          <Note x="120" y="260" size={9} fill={INK} anchor="middle">
            40 min → 10 min
          </Note>
        </g>
      </g>

      {/* Cloud console: release gate and an affirmative deployment state. */}
      <g transform="translate(1170 244) rotate(7)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="300"
            height="226"
            rx="5"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="300" height="226" rx="5" fill={SHEET} stroke={INK} />
          <path d="M0 30H300M18 65H282" stroke={RULE} fill="none" />
          <circle cx="16" cy="15" r="3" fill="none" stroke={INK} />
          <Note x="30" y="19" size={8} fill={INK}>
            production console
          </Note>
          <Note x="18" y="51" size={8}>
            release / main
          </Note>
          <Note x="282" y="51" size={7} anchor="end">
            Google Cloud
          </Note>
          <Note x="18" y="89" size={8}>
            image
          </Note>
          <Note x="282" y="89" size={9} fill={INK} anchor="end">
            app:release
          </Note>
          <Note x="18" y="111" size={8}>
            checks
          </Note>
          <Note x="282" y="111" size={8} anchor="end">
            waiting
          </Note>
          <g className="site-step-in" style={beat(0.64)}>
            <rect x="216" y="98" width="68" height="18" fill={SHEET} />
            <Note x="282" y="111" size={8} fill={INK} anchor="end">
              passed
            </Note>
          </g>
          <rect
            x="18"
            y="134"
            width="264"
            height="7"
            rx="3"
            fill="none"
            stroke={RULE}
          />
          <path
            className="site-draw"
            style={beat(0.64, 0.15)}
            d="M22 137.5H278"
            stroke={INK}
            strokeWidth="4"
            pathLength={1}
          />
          <rect
            x="18"
            y="160"
            width="264"
            height="42"
            rx="3"
            fill="none"
            stroke={INK}
          />
          <Note x="150" y="186" size={9} anchor="middle">
            deploy on passing tests
          </Note>
          <g className="site-step-in" style={beat(0.8)} data-cicd="release">
            <rect x="18" y="160" width="264" height="42" rx="3" fill={INK} />
            <path
              d="M72 181l4 4 7-9"
              fill="none"
              stroke={SHEET}
              strokeWidth="1.3"
            />
            <Note x="166" y="186" size={10} fill={SHEET} anchor="middle">
              deployed
            </Note>
          </g>
        </g>
      </g>

      {/* A folded, revised bill. This is the case study's website estimate,
          not a claim about the whole company's cloud spend. */}
      <g transform="translate(138 566) rotate(6)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <path d="M5 5H245L275 35V251H5Z" fill={SHEET} stroke={RULE} />
          <path d="M0 0H240L270 30V246H0Z" fill={SHEET} stroke={INK} />
          <path d="M240 0V30H270" fill={PANEL} stroke={INK} />
          <Note x="18" y="27" size={8}>
            Monthly pipeline estimate
          </Note>
          <Note x="18" y="47" size={7}>
            website frontend · one application
          </Note>
          <line x1="18" y1="61" x2="252" y2="61" stroke={RULE} />
          <Note x="18" y="84" size={8}>
            original pipeline
          </Note>
          <Note x="252" y="84" size={12} fill={INK} anchor="end">
            $32 / mo
          </Note>
          <path
            className="site-draw"
            style={beat(0.82, 0.06)}
            d="M15 80 255 73"
            fill="none"
            stroke={INK}
            strokeWidth="1.5"
            pathLength={1}
          />
          <g className="site-step-in" style={beat(0.88, 0.08)} data-cicd="bill">
            <Note x="18" y="112" size={8} fill={INK}>
              revised estimate
            </Note>
            <Note
              x="252"
              y="113"
              size={15}
              fill={INK}
              anchor="end"
              weight={500}
            >
              $8 / mo
            </Note>
            <path d="M198 125q30 9 56-4" stroke={INK} fill="none" />
          </g>
          <line x1="18" y1="144" x2="252" y2="144" stroke={RULE} />
          <Note x="18" y="165" size={7}>
            5 runs per day
          </Note>
          <Note x="18" y="181" size={7}>
            $0.008 per deployment minute
          </Note>
          <Note x="18" y="213" size={7}>
            illustrated from the case study
          </Note>
          <path d="M14 238H252" stroke={RULE} strokeDasharray="3 3" />
        </g>
      </g>

      {/* The rail is behind the solid container; its payload moves with scroll. */}
      <g stroke={RULE} fill="none">
        <path d="M394 760H1010M394 766H1010M394 752v23M1010 752v23" />
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${410 + i * 33} 760l-7 6`} />
        ))}
      </g>
      <g className="site-art__lift">
        <CicdContainer />
      </g>

      <g transform="translate(1128 692)">
        <g className="site-rise" style={beat(0.88, 0.1)} data-cicd="outcome">
          <text
            y="48"
            fill={INK}
            fontSize="64"
            fontWeight="500"
            letterSpacing="-0.04em"
          >
            40 → 10
          </text>
          <Note x="4" y="72" size={9}>
            deploy minutes · website pipeline
          </Note>
        </g>
      </g>

      <Leader
        d="M485 128v-22"
        x={485}
        y={96}
        label="GitHub Actions"
        anchor="middle"
      />
      <Tip x={485} y={108} angle={-90} />
    </>
  );
}

/** A clinical-review sheet on a real clipboard, lifted over the title. */
function SoleitReport() {
  return (
    <g transform="translate(530 552) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <rect
          x="-10"
          y="-9"
          width="410"
          height="237"
          rx="8"
          fill={SHEET}
          stroke={INK}
        />
        <rect x="3" y="3" width="388" height="214" fill={SHEET} stroke={RULE} />
        <rect width="386" height="211" fill={SHEET} stroke={INK} />
        <path d="M146 0v-12q0-8 8-8h70q8 0 8 8V0" fill={SHEET} stroke={INK} />
        <rect
          x="135"
          y="-7"
          width="106"
          height="17"
          rx="4"
          fill={SHEET}
          stroke={INK}
        />
        <circle cx="188" cy="-12" r="3" fill="none" stroke={INK} />
        <Note x="20" y="33" size={8}>
          Soleit / clinical review
        </Note>
        <Note x="20" y="58" size={18} fill={INK} weight={500}>
          Scan report
        </Note>
        <line x1="20" y1="70" x2="365" y2="70" stroke={RULE} />
        {[
          ["Capture", "acquired"],
          ["Analysis", "ready for review"],
          ["Record", "saved"],
        ].map(([k, v], i) => (
          <g
            key={k}
            className="site-step-in"
            style={beat(0.4 + i * 0.12, 0.08)}
            data-story={`report-${i}`}
          >
            <Note x="20" y={94 + i * 25} size={9}>
              {k}
            </Note>
            <Note x="364" y={94 + i * 25} size={9} fill={INK} anchor="end">
              {v}
            </Note>
            <path d={`M20 ${103 + i * 25}H365`} stroke={RULE} />
          </g>
        ))}
        <Note x="20" y="193" size={7}>
          clinician / signature
        </Note>
        <path d="M176 193H365" stroke={RULE} />
        <path
          className="site-draw"
          style={beat(0.8, 0.12)}
          d="M188 185q8-24 11-9t8-4q8-14 7 6t12-5q3 22 17 8t11 0q20-13 39-4"
          fill="none"
          stroke={INK}
          pathLength={1}
        />
      </g>
    </g>
  );
}

/** Soleit: an insole is captured, the desktop app analyses it, a report fills. */
function SoleitArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <SoleitReport />;

  // Schematic shapes, not patient measurements or a clinical conclusion.
  const sole =
    "M90 8C133 0 161 31 156 73 154 109 125 136 125 167 128 204 121 234 92 239 65 244 48 225 50 197 52 161 66 140 57 116 43 77 50 30 72 15Z";
  return (
    <>
      {/* Desktop app: native window controls, sidebar, contour scan and status. */}
      <g transform="translate(226 164) rotate(-3)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="650"
            height="286"
            rx="6"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="650" height="286" rx="6" fill={SHEET} stroke={INK} />
          <path d="M0 28H650M116 28V286" stroke={INK} fill="none" />
          {[15, 28, 41].map((x) => (
            <circle key={x} cx={x} cy="14" r="3.2" fill="none" stroke={INK} />
          ))}
          <Note x="325" y="18" size={8} anchor="middle">
            Soleit · desktop / Electron
          </Note>
          {["Patients", "Scans", "Reports", "Settings"].map((label, i) => (
            <g key={label}>
              {i === 1 && (
                <rect
                  x="10"
                  y={53 + i * 33}
                  width="95"
                  height="25"
                  rx="3"
                  fill={INK}
                />
              )}
              <Note
                x="23"
                y={70 + i * 33}
                size={8}
                fill={i === 1 ? PAPER : MUTED}
              >
                {label}
              </Note>
            </g>
          ))}
          <Note x="135" y="54" size={8}>
            Capture / left foot
          </Note>
          <Note x="630" y="54" size={7} anchor="end">
            schematic · not patient data
          </Note>
          <path d="M136 65H630" stroke={RULE} />
          <g transform="translate(218 80) scale(.64)">
            <path d={sole} fill={PANEL} stroke={RULE} />
            {[1, 0.78, 0.56].map((scale, i) => (
              <g
                key={scale}
                transform={`translate(${(1 - scale) * 94} ${(1 - scale) * 118}) scale(${scale})`}
              >
                <path
                  className="site-draw"
                  style={beat(0.1 + i * 0.12, 0.12)}
                  d={sole}
                  fill="none"
                  stroke={INK}
                  strokeWidth="1.5"
                  pathLength={1}
                  data-story={`contour-${i}`}
                />
              </g>
            ))}
          </g>
          <Note x="395" y="98" size={8}>
            device
          </Note>
          <Note x="616" y="98" size={8} fill={INK} anchor="end">
            connected
          </Note>
          <path d="M395 109H616" stroke={RULE} />
          <Note x="395" y="130" size={8}>
            capture
          </Note>
          <Note x="616" y="130" size={8} anchor="end">
            waiting
          </Note>
          <g className="site-step-in" style={beat(0.38)}>
            <rect x="535" y="116" width="85" height="18" fill={SHEET} />
            <Note x="616" y="130" size={8} fill={INK} anchor="end">
              complete
            </Note>
          </g>
          <path d="M395 141H616" stroke={RULE} />
          <Note x="395" y="162" size={8}>
            analysis
          </Note>
          <g className="site-step-in" style={beat(0.54)}>
            <Note x="616" y="162" size={8} fill={INK} anchor="end">
              ready
            </Note>
          </g>
          <rect
            x="136"
            y="246"
            width="494"
            height="24"
            rx="3"
            fill="none"
            stroke={INK}
          />
          <Note x="383" y="262" size={8} anchor="middle">
            capture → analyse → review
          </Note>
          <g className="site-step-in" style={beat(0.7)}>
            <rect x="136" y="246" width="494" height="24" rx="3" fill={INK} />
            <Note x="383" y="262" size={8} fill={PAPER} anchor="middle">
              report ready for clinician review
            </Note>
          </g>
        </g>
      </g>

      {/* Physical insole with printed trace lines and three illustrative nodes. */}
      <g transform="translate(928 154) rotate(13)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "6deg" } as React.CSSProperties}
        >
          <path
            d={sole}
            transform="translate(5 5) scale(1.1)"
            fill={SHEET}
            stroke={RULE}
          />
          <path
            d={sole}
            transform="scale(1.1)"
            fill={SHEET}
            stroke={INK}
            strokeWidth="1.3"
          />
          <path
            d="M98 251V203L77 171V62M98 203l30-36V78M77 136h51"
            fill="none"
            stroke={RULE}
          />
          {[
            [76, 72, "A"],
            [129, 111, "B"],
            [98, 216, "C"],
          ].map(([x, y, label], i) => (
            <g key={label}>
              <circle cx={x} cy={y} r="10" fill={SHEET} stroke={INK} />
              <g
                className="site-step-in"
                style={beat(0.08 + i * 0.12)}
                data-story={`node-${label}`}
              >
                <circle cx={x} cy={y} r="5" fill={INK} />
              </g>
              <Note x={Number(x) + 15} y={Number(y) - 8} size={7}>
                {String(label)}
              </Note>
            </g>
          ))}
          <Note x="93" y="281" size={7} anchor="middle">
            scan illustration
          </Note>
        </g>
      </g>

      {/* Hardware bridge card: the Python driver embedded in Electron. */}
      <g transform="translate(1220 250) rotate(7)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <rect width="275" height="172" rx="4" fill={SHEET} stroke={INK} />
          <Note x="16" y="24" size={8}>
            Device bridge
          </Note>
          <path d="M16 35H259" stroke={RULE} />
          <rect
            x="16"
            y="54"
            width="100"
            height="48"
            fill="none"
            stroke={RULE}
          />
          <Note x="66" y="82" size={9} fill={INK} anchor="middle">
            Python
          </Note>
          <path
            className="site-draw"
            style={beat(0.2, 0.18)}
            d="M116 78h42"
            stroke={INK}
            fill="none"
            pathLength={1}
          />
          <path d="M153 74l5 4-5 4" stroke={INK} fill="none" />
          <rect
            x="158"
            y="54"
            width="101"
            height="48"
            fill="none"
            stroke={RULE}
          />
          <Note x="208" y="82" size={9} fill={INK} anchor="middle">
            Electron
          </Note>
          <Note x="16" y="131" size={7}>
            hardware → endpoints → app
          </Note>
          <Note x="16" y="151" size={7}>
            Ionic React / Node.js
          </Note>
        </g>
      </g>

      {/* Measuring tape, with a curled end and an exposed spool. */}
      <g transform="translate(136 666) rotate(7)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <path
            d="M0 0H255Q305 0 305 42V93H273V42Q273 33 255 33H0Z"
            fill={SHEET}
            stroke={INK}
          />
          {Array.from({ length: 25 }, (_, i) => (
            <path
              key={i}
              d={`M${8 + i * 10} 0v${i % 5 === 0 ? 15 : 8}`}
              stroke={INK}
            />
          ))}
          {[0, 5, 10, 15, 20].map((n) => (
            <Note key={n} x={8 + n * 10} y="27" size={6.5}>
              {String(n)}
            </Note>
          ))}
          <rect
            x="-7"
            y="-2"
            width="12"
            height="37"
            fill={SHEET}
            stroke={INK}
          />
          <circle cx="290" cy="98" r="33" fill={SHEET} stroke={INK} />
          {[23, 14, 5].map((r) => (
            <circle key={r} cx="290" cy="98" r={r} fill="none" stroke={RULE} />
          ))}
          <Note x="12" y="57" size={7}>
            measure / fit / review
          </Note>
        </g>
      </g>
      <g className="site-art__lift">
        <SoleitReport />
      </g>
      <g transform="translate(1135 721)">
        <g
          className="site-rise"
          style={beat(0.88, 0.1)}
          data-story="soleit-outcome"
        >
          <text
            y="25"
            fill={INK}
            fontSize="41"
            fontWeight="500"
            letterSpacing="-.04em"
          >
            scan → report
          </text>
          <Note x="2" y="49" size={8}>
            a desktop workflow for the clinic
          </Note>
        </g>
      </g>
    </>
  );
}

/** An actual shelf, with crates sliding onto it as the builds pass. */
function DockershelfRack() {
  return (
    <g transform="translate(424 556) rotate(-3)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
      >
        {/* Angle-iron uprights, shelf lip, bolt heads and braces. */}
        <path d="M0 0h14v228H0ZM686 0h14v228h-14Z" fill={SHEET} stroke={INK} />
        {[12, 70, 128, 186, 216].flatMap((y) =>
          [7, 693].map((x) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="2"
              fill="none"
              stroke={INK}
            />
          ))
        )}
        <path
          d="M14 213h672M14 186l40 27m632-27-40 27"
          fill="none"
          stroke={RULE}
        />
        {["python", "node", "debian"].map((name, i) => (
          <g key={name} transform={`translate(${38 + i * 214} 26)`}>
            <g
              data-story={`crate-${name}`}
              style={{
                transform: `translateX(calc((1 - clamp(0, (var(--p) - ${0.08 + i * 0.15}) / 0.2, 1)) * -120px))`,
              }}
            >
              <path d="M0 18 22 0H198L176 18Z" fill={SHEET} stroke={INK} />
              <path d="M176 18 198 0V146L176 164Z" fill={SHEET} stroke={INK} />
              <rect y="18" width="176" height="146" fill={SHEET} stroke={INK} />
              <path
                d="M0 30H176M0 151H176M12 18V164M164 18V164M0 73H176M0 119H176"
                fill="none"
                stroke={RULE}
              />
              <path
                d="m12 31 152 119M12 151 164 31"
                fill="none"
                stroke={RULE}
              />
              <rect
                x="27"
                y="53"
                width="122"
                height="62"
                fill={SHEET}
                stroke={INK}
              />
              <Note x="88" y="73" size={7} anchor="middle">
                dockershelf
              </Note>
              <Note
                x="88"
                y="96"
                size={15}
                fill={INK}
                anchor="middle"
                weight={500}
              >
                {name}
              </Note>
              {[
                [6, 24],
                [170, 24],
                [6, 158],
                [170, 158],
              ].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="1.5" fill={INK} />
              ))}
              <g className="site-step-in" style={beat(0.25 + i * 0.15)}>
                <rect
                  x="128"
                  y="125"
                  width="35"
                  height="16"
                  fill={SHEET}
                  stroke={INK}
                />
                <path d="m134 132 4 4 7-8" fill="none" stroke={INK} />
                <Note x="150" y="136" size={6}>
                  ok
                </Note>
              </g>
            </g>
          </g>
        ))}
        <path d="M-12 191H712v19H-12Z" fill={SHEET} stroke={INK} />
        <path d="M-12 197H712" stroke={RULE} />
        <Note x="350" y="205" size={7} anchor="middle">
          Debian stable + sid / amd64 + arm64
        </Note>
      </g>
    </g>
  );
}

/** Dockershelf: assemble the shelf, verify a pull, tick the weekly builds. */
function DockershelfArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <DockershelfRack />;
  return (
    <>
      {/* Terminal session, with layered downloads rather than fake log metrics. */}
      <g transform="translate(230 160) rotate(-3)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="640"
            height="281"
            rx="6"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="640" height="281" rx="6" fill={SHEET} stroke={INK} />
          <path d="M0 29H640" stroke={INK} />
          {[16, 29, 42].map((x) => (
            <circle key={x} cx={x} cy="14" r="3.2" fill="none" stroke={INK} />
          ))}
          <Note x="320" y="18" size={8} anchor="middle">
            dockershelf / terminal
          </Note>
          <Note x="20" y="59" size={11} fill={INK}>
            $ docker pull dockershelf/python
          </Note>
          <Note x="20" y="82" size={8}>
            Debian-based images / build + test + publish
          </Note>
          {["base", "runtime", "packages"].map((name, i) => (
            <g key={name}>
              <Note x="20" y={116 + i * 31} size={9}>
                {name}
              </Note>
              <rect
                x="132"
                y={105 + i * 31}
                width="374"
                height="11"
                rx="2"
                fill="none"
                stroke={RULE}
              />
              <path
                className="site-draw"
                style={beat(0.12 + i * 0.12, 0.2)}
                d={`M136 ${110.5 + i * 31}H502`}
                pathLength={1}
                stroke={INK}
                strokeWidth="5"
              />
              <g className="site-step-in" style={beat(0.32 + i * 0.12)}>
                <Note x="618" y={116 + i * 31} size={8} fill={INK} anchor="end">
                  verified
                </Note>
              </g>
            </g>
          ))}
          <path d="M20 204H620" stroke={RULE} />
          <g
            className="site-step-in"
            style={beat(0.6)}
            data-story="pull-verified"
          >
            <Note x="20" y="229" size={10} fill={INK}>
              status: downloaded and verified
            </Note>
            <Note x="20" y="253" size={8}>
              weekly builds / tests pass before publication
            </Note>
          </g>
        </g>
      </g>

      {/* A steel ruler and size specimen: four units against one. */}
      <g transform="translate(1195 236) rotate(8)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="-5"
            y="-5"
            width="290"
            height="237"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="280" height="227" fill={SHEET} stroke={INK} />
          <Note x="16" y="25" size={8}>
            Image size / specimen
          </Note>
          <path d="M16 37H264" stroke={RULE} />
          <Note x="16" y="61" size={8}>
            official Python / Node
          </Note>
          <rect
            x="16"
            y="75"
            width="240"
            height="28"
            fill={SHEET}
            stroke={INK}
          />
          <path d="M76 75V103M136 75V103M196 75V103" stroke={RULE} />
          <Note x="16" y="129" size={8}>
            dockershelf equivalent
          </Note>
          <rect x="16" y="143" width="60" height="28" fill={INK} />
          <rect
            x="9"
            y="192"
            width="255"
            height="23"
            rx="2"
            fill={SHEET}
            stroke={INK}
          />
          {Array.from({ length: 25 }, (_, i) => (
            <path
              key={i}
              d={`M${16 + i * 10} 192v${i % 5 === 0 ? 14 : 7}`}
              stroke={INK}
            />
          ))}
          <g className="site-step-in" style={beat(0.72)}>
            <Note x="122" y="161" size={11} fill={INK}>
              ≈ 4× smaller
            </Note>
          </g>
        </g>
      </g>

      {/* Build docket, clipped to a slim board. */}
      <g transform="translate(937 143) rotate(6)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <rect
            x="-6"
            y="-5"
            width="213"
            height="247"
            rx="4"
            fill={SHEET}
            stroke={INK}
          />
          <rect width="200" height="234" fill={SHEET} stroke={RULE} />
          <rect
            x="62"
            y="-9"
            width="76"
            height="16"
            rx="3"
            fill={SHEET}
            stroke={INK}
          />
          <Note x="16" y="33" size={8}>
            Build docket
          </Note>
          <path d="M16 45H184" stroke={RULE} />
          {["Debian stable", "Debian sid", "amd64", "arm64"].map((label, i) => (
            <g key={label}>
              <rect
                x="16"
                y={63 + i * 30}
                width="11"
                height="11"
                fill="none"
                stroke={INK}
              />
              <Note x="37" y={72 + i * 30} size={8}>
                {label}
              </Note>
              <path
                className="site-draw"
                style={beat(0.28 + i * 0.12)}
                d={`M18 ${68 + i * 30}l3 3 5-7`}
                fill="none"
                stroke={INK}
                pathLength={1}
              />
            </g>
          ))}
          <Note x="16" y="214" size={7}>
            publish only if tests pass
          </Note>
        </g>
      </g>

      {/* A weekly calendar strip with six successive build checks. */}
      <g transform="translate(123 635) rotate(5)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="4"
            y="4"
            width="230"
            height="163"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="230" height="163" fill={SHEET} stroke={INK} />
          {Array.from({ length: 7 }, (_, i) => (
            <circle
              key={i}
              cx={22 + i * 31}
              cy="10"
              r="3"
              fill={PANEL}
              stroke={INK}
            />
          ))}
          <Note x="16" y="40" size={10} fill={INK}>
            Weekly build + test
          </Note>
          <path d="M16 53H214" stroke={RULE} />
          {Array.from({ length: 6 }, (_, i) => (
            <g key={i}>
              <rect
                x={18 + (i % 3) * 69}
                y={69 + Math.floor(i / 3) * 37}
                width="58"
                height="27"
                fill="none"
                stroke={RULE}
              />
              <Note
                x={24 + (i % 3) * 69}
                y={86 + Math.floor(i / 3) * 37}
                size={6.5}
              >{`W${i + 1}`}</Note>
              <path
                className="site-draw"
                style={beat(0.5 + i * 0.055, 0.06)}
                d={`M${50 + (i % 3) * 69} ${82 + Math.floor(i / 3) * 37}l3 3 7-9`}
                pathLength={1}
                fill="none"
                stroke={INK}
              />
            </g>
          ))}
        </g>
      </g>
      <g className="site-art__lift">
        <DockershelfRack />
      </g>
      <g transform="translate(1200 676)">
        <g
          className="site-rise"
          style={beat(0.86, 0.12)}
          data-story="dockershelf-outcome"
        >
          <text
            y="62"
            fill={ACCENT}
            fontSize="102"
            fontWeight="500"
            letterSpacing="-.045em"
          >
            294K
          </text>
          <Note x="4" y="87" size={9}>
            Python image downloads
          </Note>
          <Note x="4" y="105" size={7}>
            reported in the case study
          </Note>
        </g>
      </g>
    </>
  );
}

/** Institutional deployment note, stamped in ink rather than a copied seal. */
function CanaimaMemo() {
  return (
    <g transform="translate(530 551) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
      >
        <path d="M5 5H362L395 38V233H5Z" fill={SHEET} stroke={RULE} />
        <path d="M0 0H357L390 33V228H0Z" fill={SHEET} stroke={INK} />
        <path d="M357 0V33H390" fill={PANEL} stroke={INK} />
        <Note x="20" y="27" size={8}>
          Canaima GNU/Linux
        </Note>
        <Note x="20" y="52" size={17} fill={INK} weight={500}>
          Deployment record
        </Note>
        <path d="M20 66H370" stroke={RULE} />
        {["Schools", "Universities", "Public offices"].map((label, i) => (
          <g
            key={label}
            className="site-step-in"
            style={beat(0.4 + i * 0.13)}
            data-story={`deployment-${i}`}
          >
            <rect
              x="20"
              y={82 + i * 29}
              width="12"
              height="12"
              fill="none"
              stroke={INK}
            />
            <path d={`M23 ${87 + i * 29}l3 3 5-7`} fill="none" stroke={INK} />
            <Note x="43" y={92 + i * 29} size={10} fill={INK}>
              {label}
            </Note>
            <path d={`M20 ${104 + i * 29}H370`} stroke={RULE} />
          </g>
        ))}
        <Note x="20" y="205" size={7}>
          Debian-based / built to be shared
        </Note>
        <g transform="translate(281 171) rotate(-10)">
          <g
            className="site-stamp"
            style={beat(0.78, 0.1)}
            data-story="free-software-stamp"
          >
            <rect
              x="-79"
              y="-18"
              width="158"
              height="36"
              fill={SHEET}
              stroke={INK}
              strokeWidth="1.5"
            />
            <rect
              x="-74"
              y="-13"
              width="148"
              height="26"
              fill="none"
              stroke={INK}
              strokeWidth=".7"
            />
            <Note x="0" y="4" size={12} fill={INK} anchor="middle" weight={600}>
              software libre
            </Note>
          </g>
        </g>
      </g>
    </g>
  );
}

/** Canaima: build packages and an ISO, ship the disc, boot the desktop. */
function CanaimaArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <CanaimaMemo />;
  return (
    <>
      {/* Canaima Semilla, the Debian-based package and image build system. */}
      <g transform="translate(225 164) rotate(-4)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "-4deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="640"
            height="286"
            rx="6"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="640" height="286" rx="6" fill={SHEET} stroke={INK} />
          <path d="M0 29H640" stroke={INK} />
          {[16, 29, 42].map((x) => (
            <circle key={x} cx={x} cy="14" r="3.2" fill="none" stroke={INK} />
          ))}
          <Note x="320" y="18" size={8} anchor="middle">
            Canaima Semilla / build log
          </Note>
          <Note x="20" y="59" size={11} fill={INK}>
            Debian packages → ISO image
          </Note>
          {[
            "Preparing the Debian base",
            "Building packages",
            "Assembling the ISO image",
            "Including Cunaguaro browser",
            "Ready for distribution",
          ].map((label, i) => (
            <g
              key={label}
              className="site-step-in"
              style={beat(0.05 + i * 0.12)}
              data-story={`build-line-${i}`}
            >
              <Note
                x="20"
                y={91 + i * 25}
                size={9}
                fill={i === 4 ? INK : MUTED}
              >
                {label}
              </Note>
              <Note x="618" y={91 + i * 25} size={8} anchor="end">
                ok
              </Note>
            </g>
          ))}
          <rect
            x="20"
            y="232"
            width="600"
            height="12"
            rx="2"
            fill="none"
            stroke={RULE}
          />
          <path
            className="site-draw"
            style={beat(0.1, 0.55)}
            d="M25 238H615"
            pathLength={1}
            stroke={INK}
            strokeWidth="6"
            data-story="install-progress"
          />
          <Note x="20" y="270" size={7}>
            build system / packages + images / several architectures
          </Note>
        </g>
      </g>

      {/* Optical disc in a thumb-cut paper sleeve; its printed face turns. */}
      <g transform="translate(947 170) rotate(8)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "6deg" } as React.CSSProperties}
        >
          <rect
            x="-5"
            y="67"
            width="230"
            height="191"
            fill={SHEET}
            stroke={RULE}
          />
          <circle cx="110" cy="112" r="105" fill={SHEET} stroke={INK} />
          <g
            data-story="disc-turn"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              transform:
                "rotate(calc((1 - clamp(0, (var(--p) - .1) / .55, 1)) * -80deg))",
            }}
          >
            <circle cx="110" cy="112" r="99" fill="none" stroke={RULE} />
            <circle cx="110" cy="112" r="88" fill="none" stroke={RULE} />
            <path
              d="M20 69 88 95M26 53 92 91M46 29 98 86M152 205 127 137M169 196 131 135"
              stroke={RULE}
            />
            <Note
              x="110"
              y="64"
              size={14}
              fill={INK}
              anchor="middle"
              weight={500}
            >
              Canaima 3.0
            </Note>
            <Note x="110" y="80" size={7} anchor="middle">
              GNU / Linux
            </Note>
            <circle cx="110" cy="112" r="26" fill={PANEL} stroke={INK} />
            <circle cx="110" cy="112" r="10" fill={SHEET} stroke={INK} />
            <Note x="110" y="171" size={7} anchor="middle">
              Debian base / freely shareable
            </Note>
          </g>
          <path
            d="M0 113H77a33 33 0 0 0 66 0H220V252H0Z"
            fill={SHEET}
            stroke={INK}
          />
          <Note x="18" y="204" size={10} fill={INK}>
            Installation media
          </Note>
          <Note x="18" y="226" size={7}>
            .iso / Canaima Semilla
          </Note>
          <path d="M18 237H202" stroke={RULE} />
        </g>
      </g>

      {/* Parcel: fold lines, sealing tape, package label and barcode. */}
      <g transform="translate(1258 270) rotate(9)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "4deg" } as React.CSSProperties}
        >
          <path d="M0 20 35 0H225L190 20Z" fill={SHEET} stroke={INK} />
          <path d="M190 20 225 0V173L190 193Z" fill={SHEET} stroke={INK} />
          <rect y="20" width="190" height="173" fill={SHEET} stroke={INK} />
          <path d="M78 20 113 0h32L110 20v173H78Z" fill={PANEL} stroke={RULE} />
          <rect
            x="13"
            y="66"
            width="163"
            height="104"
            fill={SHEET}
            stroke={INK}
          />
          <Note x="24" y="87" size={8}>
            Debian package
          </Note>
          <Note x="24" y="110" size={18} fill={INK} weight={500}>
            .deb
          </Note>
          <Note x="24" y="128" size={7}>
            Canaima repository
          </Note>
          {BARCODE.slice(0, 17).map((w, i) => (
            <rect
              key={i}
              x={24 + BARCODE.slice(0, i).reduce((sum, v) => sum + v + 2, 0)}
              y="141"
              width={w}
              height="16"
              fill={INK}
            />
          ))}
        </g>
      </g>

      {/* A desktop menu, not a second browser window. */}
      <g transform="translate(130 624) rotate(5)">
        <g
          className="site-obj"
          style={{ "--tilt-in": "5deg" } as React.CSSProperties}
        >
          <rect
            x="5"
            y="5"
            width="245"
            height="190"
            rx="3"
            fill={SHEET}
            stroke={RULE}
          />
          <rect width="245" height="190" rx="3" fill={SHEET} stroke={INK} />
          <rect width="245" height="28" fill={INK} />
          <Note x="15" y="19" size={8} fill={PAPER}>
            Aplicaciones
          </Note>
          {["Cunaguaro", "Oficina", "Educación", "Sistema"].map((label, i) => (
            <g key={label}>
              <rect
                x="14"
                y={43 + i * 33}
                width="15"
                height="14"
                fill="none"
                stroke={RULE}
              />
              <Note x="41" y={54 + i * 33} size={9} fill={INK}>
                {label}
              </Note>
              <path
                d={`M222 ${46 + i * 33}l4 4-4 4`}
                stroke={INK}
                fill="none"
              />
            </g>
          ))}
          <g
            className="site-step-in"
            style={beat(0.82)}
            data-story="desktop-ready"
          >
            <rect x="8" y="103" width="229" height="28" rx="2" fill={INK} />
            <Note x="41" y="122" size={9} fill={PAPER}>
              Educación
            </Note>
            <path d="m222 113 4 4-4 4" stroke={PAPER} fill="none" />
          </g>
        </g>
      </g>
      <g className="site-art__lift">
        <CanaimaMemo />
      </g>
      <g transform="translate(1202 686)">
        <g
          className="site-rise"
          style={beat(0.88, 0.1)}
          data-story="canaima-outcome"
        >
          <text
            y="65"
            fill={ACCENT}
            fontSize="104"
            fontWeight="500"
            letterSpacing="-.045em"
          >
            110K
          </text>
          <Note x="3" y="90" size={9}>
            Canaima 3.0 downloads / first month
          </Note>
        </g>
      </g>
    </>
  );
}

type Entry = {
  Art: (props: { layer?: Layer }) => React.JSX.Element | null;
  view: string;
  /** Draws part of itself again above the title on the pinned stage. */
  front?: boolean;
};

/** All five drawings share the wide sheet and the stage's scroll progress. */
const ART: Record<string, Entry> = {
  "/case-studies/expedia": {
    Art: ExpediaArt,
    view: "0 0 1600 900",
    front: true,
  },
  "/case-studies/wheeltheworld": {
    Art: CicdArt,
    view: "0 0 1600 900",
    front: true,
  },
  "/case-studies/soleit": {
    Art: SoleitArt,
    view: "0 0 1600 900",
    front: true,
  },
  "/case-studies/dockershelf": {
    Art: DockershelfArt,
    view: "0 0 1600 900",
    front: true,
  },
  "/case-studies/canaima": {
    Art: CanaimaArt,
    view: "0 0 1600 900",
    front: true,
  },
};

export function WorkArtwork({
  slug,
  layer = "back",
}: {
  slug: string;
  layer?: Layer;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);
  const entry = ART[slug];
  const Art = entry?.Art;

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
      <svg viewBox={entry.view} role="presentation" focusable="false">
        <Art layer={layer} />
      </svg>
    </div>
  );
}

/** True when the drawing has a layer that crosses in front of the title. */
export const hasFrontLayer = (slug: string) => Boolean(ART[slug]?.front);

/** True when an artwork exists for this project; the caller falls back to the shot. */
export const hasArtwork = (slug: string) => Boolean(ART[slug]);
