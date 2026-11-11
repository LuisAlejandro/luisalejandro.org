"use client";

import { useEffect, useId, useRef, useState } from "react";

/**
 * Project artwork drawn as a technical collage: outlined UI fragments with
 * micro labels, dimension and leader lines with arrowheads, elements that
 * overlap and run past the sheet edge, and one accent element per panel.
 * Nothing raster, nothing traced — every path is drawn from the project's own
 * facts.
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

function Dimension({
  x1,
  x2,
  y,
  label,
  order = 0,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  order?: number;
}) {
  return (
    <g {...frag(order)}>
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

/** Sheet corner marks, as on a drawing. */
function Sheet() {
  return (
    <g stroke={RULE} strokeWidth="1" fill="none">
      <path d="M34 58h-9M34 58v-9M866 58h9M866 58v-9M34 502h-9M34 502v9M866 502h9M866 502v9" />
    </g>
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

/** Wheel The World: the pipeline that started shipping on its own. */
function CicdArt() {
  const steps = ["build", "test", "push", "deploy"];
  return (
    <>
      <g {...frag(0)}>
        <rect
          x="30"
          y="54"
          width="470"
          height="150"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="76">
          Pipeline · GitHub Actions
        </Note>
        <line x1="48" y1="88" x2="482" y2="88" stroke={RULE} />
        {steps.map((step, i) => (
          <g key={step}>
            <rect
              x={48 + i * 108}
              y="104"
              width="88"
              height="52"
              fill={i === 3 ? INK : "none"}
              stroke={i === 3 ? INK : RULE}
            />
            <Note
              x={92 + i * 108}
              y="136"
              size={9}
              fill={i === 3 ? PAPER : INK}
              anchor="middle"
            >
              {step}
            </Note>
            <circle
              cx={56 + i * 108}
              cy={116}
              r="2.6"
              fill={i === 3 ? PAPER : INK}
            />
            {i < 3 && (
              <path
                d={`M${136 + i * 108} 130h14`}
                stroke={MUTED}
                strokeWidth="1"
                fill="none"
              />
            )}
          </g>
        ))}
        <Note x="48" y="182">
          staging from day one · weekly
        </Note>
      </g>

      <g {...frag(1)}>
        <rect
          x="540"
          y="50"
          width="330"
          height="176"
          fill="none"
          stroke={RULE}
        />
        <Note x="558" y="72">
          Image
        </Note>
        <line x1="558" y1="84" x2="852" y2="84" stroke={RULE} />
        {[
          ["app", 558, 94, 250],
          ["runtime", 568, 106, 230],
          ["base", 578, 118, 210],
        ].map(([label, x, y, w]) => (
          <g key={label as string}>
            <rect
              x={x as number}
              y={y as number}
              width={w as number}
              height="32"
              fill="none"
              stroke={RULE}
            />
            <Note
              x={(x as number) + 12}
              y={(y as number) + 21}
              size={9}
              fill={INK}
            >
              {label as string}
            </Note>
          </g>
        ))}
        <Note x="558" y="176">
          docker · built weekly
        </Note>
      </g>

      <g {...frag(2)}>
        <rect
          x="30"
          y="238"
          width="470"
          height="150"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="260">
          Run · main
        </Note>
        <line x1="48" y1="272" x2="482" y2="272" stroke={RULE} />
        {[
          "08:04 build     ok   41s",
          "08:05 test      ok   2m08",
          "08:07 push      ok   36s",
          "08:08 deploy    ok   1m12",
        ].map((line, i) => (
          <Note
            key={line}
            x="48"
            y={294 + i * 20}
            size={9}
            fill={i === 3 ? INK : MUTED}
          >
            {line}
          </Note>
        ))}
        <Note x="392" y="374" size={11} fill={ACCENT}>
          costs down
        </Note>
      </g>

      <g {...frag(3)}>
        <rect
          x="540"
          y="264"
          width="330"
          height="150"
          fill="none"
          stroke={RULE}
        />
        <Note x="558" y="286">
          Monthly spend
        </Note>
        <path
          d="M558 366h286M558 306v60"
          stroke={RULE}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M558 312h86v18h86v22h114"
          stroke={INK}
          strokeWidth="1.5"
          fill="none"
        />
        <Note x="558" y="390">
          reliability up · spend down
        </Note>
      </g>

      <Leader
        d="M265 54v-22"
        x={265}
        y={24}
        label="github actions"
        anchor="middle"
        order={4}
      />
      <Tip x={265} y={32} angle={-90} />
      <Leader
        d="M540 140h-30v-14"
        x={510}
        y={112}
        label="docker"
        anchor="end"
        order={5}
      />
      <Tip x={510} y={126} angle={-90} />
      <Leader
        d="M540 414h-24v14"
        x={516}
        y={446}
        label="google cloud"
        anchor="end"
        order={6}
      />
      <Tip x={516} y={428} angle={90} />

      <Dimension x1={540} x2={870} y={450} label="cost per build" order={7} />
      <Sheet />
    </>
  );
}

/** Soleit: a desktop shell around a pressure map. */
function SoleitArt() {
  return (
    <>
      <g {...frag(0)}>
        <rect
          x="30"
          y="52"
          width="470"
          height="316"
          fill="none"
          stroke={RULE}
        />
        <line x1="30" y1="82" x2="500" y2="82" stroke={RULE} />
        <circle cx="46" cy="67" r="3.4" fill="none" stroke={MUTED} />
        <circle cx="58" cy="67" r="3.4" fill="none" stroke={MUTED} />
        <circle cx="70" cy="67" r="3.4" fill="none" stroke={MUTED} />
        <Note x="265" y="71" anchor="middle">
          Soleit · desktop
        </Note>

        <line x1="150" y1="82" x2="150" y2="368" stroke={RULE} />
        {["patients", "scans", "reports", "settings"].map((item, i) => (
          <g key={item}>
            {i === 1 && (
              <rect
                x="38"
                y={112 + i * 28 - 11}
                width="104"
                height="17"
                fill="none"
                stroke={RULE}
              />
            )}
            <Note x="48" y={112 + i * 28} size={9} fill={i === 1 ? INK : MUTED}>
              {item}
            </Note>
          </g>
        ))}

        {/* pressure map: concentric contours with the three sensor readings */}
        <g>
          {[58, 44, 30, 16].map((rx, i) => (
            <ellipse
              key={rx}
              cx="318"
              cy="176"
              rx={rx}
              ry={rx * 1.28}
              fill="none"
              stroke={i === 0 ? INK : RULE}
            />
          ))}
          {[
            [300, 132, "11"],
            [352, 178, "38"],
            [304, 226, "24"],
          ].map(([cx, cy, value]) => (
            <g key={`${cx}-${cy}`}>
              <circle
                cx={cx as number}
                cy={cy as number}
                r="4.4"
                fill={PAPER}
                stroke={MUTED}
              />
              <circle
                cx={cx as number}
                cy={cy as number}
                r="1.5"
                fill={MUTED}
              />
              <Note x={(cx as number) + 9} y={(cy as number) - 6} size={7}>
                {value as string}
              </Note>
            </g>
          ))}
        </g>

        <line x1="182" y1="244" x2="468" y2="244" stroke={RULE} />
        <Note x="182" y="266">
          scan · left foot · 42 kg
        </Note>
        <Note x="182" y="286">
          pressure map · 3 sensors
        </Note>
        <path d="M182 306h286v34H182z" fill="none" stroke={RULE} />
        <Note x="196" y="328" size={9} fill={INK}>
          run diagnosis
        </Note>
      </g>

      <g {...frag(1)}>
        <rect
          x="536"
          y="86"
          width="330"
          height="150"
          fill="none"
          stroke={RULE}
        />
        <Note x="554" y="108">
          Result
        </Note>
        <line x1="554" y1="120" x2="848" y2="120" stroke={RULE} />
        <circle cx="572" cy="146" r="8" fill="none" stroke={INK} />
        <path d="M568 146l3 3 5-6" fill="none" stroke={INK} />
        <Note x="592" y="150" size={11} fill={INK}>
          Diagnosis issued
        </Note>
        <Note x="554" y="176">
          plantar pressure · within range
        </Note>
        <line x1="554" y1="190" x2="848" y2="190" stroke={RULE} />
        <Note x="554" y="212">
          export · pdf · for the clinic
        </Note>
      </g>

      <g {...frag(2)}>
        <rect
          x="536"
          y="268"
          width="330"
          height="132"
          fill="none"
          stroke={RULE}
        />
        <Note x="554" y="290">
          Milestone
        </Note>
        <line x1="554" y1="302" x2="848" y2="302" stroke={RULE} />
        <Note x="554" y="330" size={11} fill={INK}>
          Growth stage funded
        </Note>
        <Note x="554" y="352">
          the app that helped get them there
        </Note>
      </g>

      <g {...frag(3)}>
        <rect
          x="30"
          y="392"
          width="330"
          height="96"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="414">
          Shell
        </Note>
        <line x1="48" y1="426" x2="342" y2="426" stroke={RULE} />
        <Note x="48" y="448" size={9} fill={INK}>
          electron · ionic react
        </Note>
        <Note x="48" y="468">
          express · sequelize · python
        </Note>
      </g>

      <Leader d="M468 323h20" x={494} y={326} label="ionic ui" order={4} />
      <Tip x={486} y={323} angle={180} />
      <Leader
        d="M700 86v-22"
        x={700}
        y={56}
        label="diagnosis"
        anchor="middle"
        order={5}
      />
      <Tip x={700} y={64} angle={-90} />
      <Leader d="M392 196h26v-16" x={418} y={166} label="sensors" order={6} />
      <Tip x={418} y={182} angle={-90} />

      <Dimension
        x1={536}
        x2={866}
        y={452}
        label="one desktop install"
        order={7}
      />
      <Sheet />
    </>
  );
}

/** Dockershelf: layers, pulls, and a size comparison. */
function DockershelfArt() {
  return (
    <>
      <g {...frag(0)}>
        <rect
          x="30"
          y="54"
          width="320"
          height="252"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="76">
          Image · layers
        </Note>
        <line x1="48" y1="88" x2="332" y2="88" stroke={RULE} />
        {[
          ["app", 96, 210],
          ["runtime", 138, 240],
          ["base · debian", 180, 270],
        ].map(([label, y, w]) => (
          <g key={label as string}>
            <path
              d={`M48 ${y as number}l34 -16h${w as number}l-34 16z`}
              fill="none"
              stroke={RULE}
            />
            <rect
              x="48"
              y={(y as number) + 2}
              width={w as number}
              height="30"
              fill="none"
              stroke={RULE}
            />
            <Note x={58} y={(y as number) + 22} size={9} fill={INK}>
              {label as string}
            </Note>
          </g>
        ))}
        <Note x="48" y="248">
          deb stable + sid
        </Note>
        <Note x="48" y="270">
          built + tested weekly
        </Note>
        <Note x="48" y="292">
          lean by default
        </Note>
      </g>

      <g {...frag(1)}>
        <rect
          x="386"
          y="54"
          width="484"
          height="188"
          fill="none"
          stroke={RULE}
        />
        <Note x="404" y="76">
          Terminal
        </Note>
        <line x1="404" y1="88" x2="852" y2="88" stroke={RULE} />
        {[
          "$ docker pull dockershelf/python",
          "  pulling from library/python",
          "  digest: sha256:9f2c…41ab",
          "  status: verified",
        ].map((line, i) => (
          <Note
            key={line}
            x="404"
            y={112 + i * 20}
            size={9}
            fill={i === 0 ? INK : MUTED}
          >
            {line}
          </Note>
        ))}
        <text
          x="404"
          y="224"
          fill={ACCENT}
          fontSize="40"
          fontWeight="500"
          letterSpacing="-0.04em"
        >
          294K
        </text>
        <Note x="512" y="222" size={9}>
          pulls
        </Note>
      </g>

      <g {...frag(2)}>
        <rect
          x="386"
          y="266"
          width="484"
          height="152"
          fill="none"
          stroke={RULE}
        />
        <Note x="404" y="288">
          Size against the official image
        </Note>
        <line x1="404" y1="300" x2="852" y2="300" stroke={RULE} />
        <Note x="404" y="322">
          official
        </Note>
        <rect
          x="470"
          y="312"
          width="356"
          height="14"
          fill="none"
          stroke={RULE}
        />
        <Note x="404" y="352">
          ours
        </Note>
        <rect x="470" y="342" width="89" height="14" fill={INK} />
        <Note x="404" y="386">
          roughly four times smaller
        </Note>
      </g>

      <g {...frag(3)}>
        <rect
          x="30"
          y="330"
          width="320"
          height="118"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="352">
          CI · weekly
        </Note>
        <line x1="48" y1="364" x2="332" y2="364" stroke={RULE} />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${52 + i * 24} 388v${i === 11 ? 16 : 12}`}
            stroke={i === 11 ? INK : RULE}
            strokeWidth="2"
            fill="none"
          />
        ))}
        <Note x="48" y="428">
          every tag tested before it ships
        </Note>
      </g>

      <Leader
        d="M600 54v-22"
        x={600}
        y={24}
        label="docker hub"
        anchor="middle"
        order={4}
      />
      <Tip x={600} y={32} angle={-90} />
      <Leader
        d="M824 312v-18"
        x={824}
        y={280}
        label="size"
        anchor="end"
        order={5}
      />
      <Tip x={824} y={302} angle={-90} />

      <Dimension x1={470} x2={826} y={452} label="official image" order={6} />
      <Sheet />
    </>
  );
}

/** Canaima: a distribution built on Debian, shipped to public offices. */
function CanaimaArt() {
  return (
    <>
      <g {...frag(0)}>
        <rect
          x="30"
          y="52"
          width="470"
          height="196"
          fill="none"
          stroke={RULE}
        />
        <line x1="30" y1="82" x2="500" y2="82" stroke={RULE} />
        <circle cx="46" cy="67" r="3.4" fill="none" stroke={MUTED} />
        <circle cx="58" cy="67" r="3.4" fill="none" stroke={MUTED} />
        <circle cx="70" cy="67" r="3.4" fill="none" stroke={MUTED} />
        <Note x="46" y="108" size={9} fill={INK}>
          $ apt-get install canaima-desktop
        </Note>
        {[
          "reading package lists…",
          "building dependency tree…",
          "unpacking canaima-desktop (4.1)",
          "setting up… done",
        ].map((line, i) => (
          <Note key={line} x="46" y={132 + i * 20} size={9}>
            {line}
          </Note>
        ))}
        <Note x="46" y="226" size={9} fill={INK}>
          $ _
        </Note>
      </g>

      <g {...frag(1)}>
        <rect
          x="536"
          y="52"
          width="334"
          height="150"
          fill="none"
          stroke={RULE}
        />
        <Note x="554" y="74">
          Package
        </Note>
        <line x1="554" y1="86" x2="852" y2="86" stroke={RULE} />
        <Note x="554" y="110" size={11} fill={INK}>
          canaima-desktop_4.1_amd64.deb
        </Note>
        <Note x="554" y="132">
          debian base · python · django
        </Note>
        <line x1="554" y1="146" x2="852" y2="146" stroke={RULE} />
        <Note x="554" y="168">
          packaging · bash · python
        </Note>
        <Note x="554" y="188">
          signed · versioned · shipped
        </Note>
      </g>

      <g {...frag(2)}>
        <rect
          x="30"
          y="272"
          width="320"
          height="196"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="294">
          Menu
        </Note>
        <line x1="48" y1="306" x2="332" y2="306" stroke={RULE} />
        {["internet", "office", "education", "system"].map((item, i) => (
          <g key={item}>
            {i === 2 && (
              <rect
                x="40"
                y={332 + i * 26 - 11}
                width="96"
                height="17"
                fill="none"
                stroke={RULE}
              />
            )}
            <Note x="48" y={332 + i * 26} size={9} fill={i === 2 ? INK : MUTED}>
              {item}
            </Note>
          </g>
        ))}
        <Note x="48" y="446">
          free software by default
        </Note>
      </g>

      <g {...frag(3)}>
        <rect
          x="386"
          y="268"
          width="484"
          height="170"
          fill="none"
          stroke={RULE}
        />
        <Note x="404" y="290">
          Timeline
        </Note>
        <line x1="404" y1="302" x2="852" y2="302" stroke={RULE} />
        <path d="M404 352h448" stroke={RULE} strokeWidth="1" fill="none" />
        {[
          [404, "2009"],
          [556, "2012"],
          [708, "2016"],
          [852, "2020"],
        ].map(([x, year], i) => (
          <g key={year as string}>
            <path
              d={`M${x} 346v12`}
              stroke={i === 0 ? ACCENT : RULE}
              strokeWidth="1"
              fill="none"
            />
            <Note
              x={x as number}
              y="376"
              size={i === 0 ? 13 : 9}
              fill={i === 0 ? ACCENT : MUTED}
              weight={i === 0 ? 500 : undefined}
            >
              {year as string}
            </Note>
          </g>
        ))}
        <Note x="404" y="404">
          public administration · several projects
        </Note>
        <Note x="404" y="424">
          start of the distribution
        </Note>
      </g>

      <Leader
        d="M700 52v-22"
        x={700}
        y={24}
        label="debian"
        anchor="middle"
        order={4}
      />
      <Tip x={700} y={30} angle={-90} />
      <Leader
        d="M180 468v18"
        x={180}
        y={502}
        label="desktop"
        anchor="middle"
        order={5}
      />
      <Tip x={180} y={486} angle={90} />

      <Sheet />
    </>
  );
}

type Entry = {
  Art: (props: { layer?: Layer }) => React.JSX.Element | null;
  view: string;
  /** Draws part of itself again above the title on the pinned stage. */
  front?: boolean;
};

/** Each drawing declares its own sheet: Expedia is laid out wide, for the
    full-bleed stage; the others still use the old 900×560 panel. */
const ART: Record<string, Entry> = {
  "/case-studies/expedia": {
    Art: ExpediaArt,
    view: "0 0 1600 900",
    front: true,
  },
  "/case-studies/wheeltheworld": { Art: CicdArt, view: "0 0 900 560" },
  "/case-studies/soleit": { Art: SoleitArt, view: "0 0 900 560" },
  "/case-studies/dockershelf": { Art: DockershelfArt, view: "0 0 900 560" },
  "/case-studies/canaima": { Art: CanaimaArt, view: "0 0 900 560" },
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
