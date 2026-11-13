"use client";

import { useId } from "react";

import {
  INK,
  MUTED,
  RULE,
  ACCENT,
  PAPER,
  Note,
  Leader,
  Tip,
  SHEET,
  PANEL,
  beat,
  receiptPath,
  BARCODE,
  Layer,
} from "./shared";

/** Voucher with a perforated stub; stamped when the booking lands. */
export function Voucher() {
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

/** Luggage tag: the trip's own label, flagged priority once booked. */
export function LuggageTag() {
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

/**
 * Expedia, as a booking playing out on a desk: results load, one hotel gets
 * picked, the receipt prints, the voucher is stamped, the tag is flagged,
 * the dates are circled, and the figure lands. The voucher is also drawn in
 * a front layer above the title, so it can cross it.
 */
export function ExpediaArt({ layer = "back" }: { layer?: Layer }) {
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
      <g className="site-art__figure" transform="translate(1190 600)">
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
