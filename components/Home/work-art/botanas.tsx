"use client";

import {
  INK,
  RULE,
  ACCENT,
  Note,
  SHEET,
  PANEL,
  beat,
  Layer,
  Obj,
  Win,
  Stamp,
  Figure,
} from "./shared";

/** The gate's verdict slip: efficiency under the floor, refused before money moved. */
export function BotanasSlip() {
  return (
    <g transform="translate(580 556) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <rect x="5" y="5" width="320" height="200" fill={SHEET} stroke={RULE} />
        <rect width="320" height="200" fill={SHEET} stroke={INK} />
        <Note x="18" y="24" size={7}>
          overfit gate · rsiquiv5
        </Note>
        <path d="M18 34H302" stroke={RULE} />
        <Note x="18" y="58" size={8}>
          walk-forward efficiency
        </Note>
        <Note x="18" y="96" size={36} fill={INK} weight={500}>
          0.19
        </Note>
        <Note x="104" y="96" size={9}>
          {"< 0.20 floor"}
        </Note>
        <path d="M18 112H302" stroke={RULE} />
        {[
          ["oos calmar / is calmar", "0.19"],
          ["parameters", "rolled back"],
          ["deployed", "0 of 1"],
        ].map(([k, v], i) => (
          <g key={k}>
            <Note x="18" y={134 + i * 20} size={7}>
              {k}
            </Note>
            <Note x="302" y={134 + i * 20} size={7} fill={INK} anchor="end">
              {v}
            </Note>
          </g>
        ))}
        <Stamp x={240} y={62} r={-10} w={110} at={0.7}>
          refused
        </Stamp>
      </g>
    </g>
  );
}

/** Botanas: five walk-forward windows, nine stress regimes, a gate that says no. */
export function BotanasArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <BotanasSlip />;

  // An in-sample curve that looks too good, then the out-of-sample slide.
  const curve =
    "M30 230 70 214 100 220 130 196 160 200 190 172 220 176 250 150 280 140 310 118 340 120 370 92";
  const oos = "M370 92 400 110 430 104 460 132 490 126 520 150 550 146 590 170";
  return (
    <>
      {/* The backtest chart, split into five windows. */}
      <Obj x={212} y={152} r={-3} tilt={-4}>
        <Win w={660} h={296} title="botanas · walk-forward" />
        {Array.from({ length: 5 }, (_, i) => (
          <g key={i}>
            <rect
              x={30 + i * 120}
              y="56"
              width="84"
              height="196"
              fill={PANEL}
            />
            <rect
              x={114 + i * 120}
              y="56"
              width="36"
              height="196"
              fill="none"
              stroke={RULE}
              strokeDasharray="3 3"
            />
            <Note x={36 + i * 120} y="72" size={6.5}>
              {`in · ${i + 1}`}
            </Note>
            <Note x={118 + i * 120} y="72" size={6.5}>
              oos
            </Note>
          </g>
        ))}
        <path d="M30 252H630M30 56V252" stroke={INK} />
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M30 ${96 + i * 40}H630`}
            stroke={RULE}
            strokeDasharray="1 4"
          />
        ))}
        <path
          className="site-draw"
          style={beat(0.06, 0.34)}
          d={curve}
          fill="none"
          stroke={INK}
          strokeWidth="2"
          pathLength={1}
        />
        <path
          className="site-draw"
          style={beat(0.42, 0.2)}
          d={oos}
          fill="none"
          stroke={ACCENT}
          strokeWidth="2"
          pathLength={1}
        />
        <g className="site-step-in" style={beat(0.38)}>
          <circle cx="370" cy="92" r="4" fill={INK} />
          <Note x="378" y="86" size={7} fill={INK}>
            in-sample peak
          </Note>
        </g>
        <g className="site-step-in" style={beat(0.62)}>
          <Note x="596" y="186" size={7} fill={ACCENT} anchor="end">
            out of sample
          </Note>
        </g>
        <Note x="30" y="276" size={7}>
          hyperopt · sortino daily · 500 – 2,000 epochs
        </Note>
        <Note x="630" y="276" size={7} anchor="end">
          freqtrade
        </Note>
      </Obj>

      {/* Nine stress regimes, each a pass or a fail. */}
      <Obj x={962} y={148} r={6} tilt={4}>
        <rect x="5" y="5" width="220" height="284" fill={SHEET} stroke={RULE} />
        <rect width="220" height="284" fill={SHEET} stroke={INK} />
        <Note x="16" y="24" size={8}>
          stress suite · 9 regimes
        </Note>
        <path d="M16 35H204" stroke={RULE} />
        {[
          "2021 bull run",
          "2021 crash",
          "luna collapse",
          "grinding bear",
          "crab market",
          "halving",
          "mt. gox",
          "yen crash",
          "tariff shock",
        ].map((name, i) => (
          <g key={name}>
            <Note x="16" y={56 + i * 25} size={7.5} fill={INK}>
              {name}
            </Note>
            <rect
              x="160"
              y={46 + i * 25}
              width="44"
              height="14"
              fill="none"
              stroke={RULE}
            />
            <g className="site-step-in" style={beat(0.2 + i * 0.05, 0.04)}>
              <rect
                x="160"
                y={46 + i * 25}
                width="44"
                height="14"
                fill={i === 2 ? SHEET : INK}
                stroke={INK}
              />
              <Note
                x="182"
                y={56 + i * 25}
                size={6.5}
                fill={i === 2 ? INK : SHEET}
                anchor="middle"
              >
                {i === 2 ? "fail" : "pass"}
              </Note>
            </g>
          </g>
        ))}
        <Note x="16" y="272" size={6.5}>
          replayed in parallel, archived
        </Note>
      </Obj>

      {/* The gate as a turnstile dial: needle stops just short of the floor. */}
      <Obj x={1236} y={256} r={-6} tilt={-4}>
        <rect
          x="5"
          y="5"
          width="240"
          height="176"
          rx="6"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="240" height="176" rx="6" fill={SHEET} stroke={INK} />
        <Note x="16" y="22" size={7}>
          wfe · deploy floor 0.2
        </Note>
        <path d="M40 140a80 80 0 0 1 160 0" fill="none" stroke={INK} />
        {Array.from({ length: 11 }, (_, i) => (
          <path
            key={i}
            d="M120 66v10"
            stroke={i === 2 ? ACCENT : INK}
            strokeWidth={i === 2 ? 2 : 1}
            transform={`rotate(${-90 + i * 18} 120 140)`}
          />
        ))}
        <Note x="40" y="158" size={7} anchor="middle">
          0
        </Note>
        <Note x="200" y="158" size={7} anchor="middle">
          1
        </Note>
        <Note x="58" y="70" size={7} fill={ACCENT} anchor="middle">
          0.2
        </Note>
        <g transform="translate(120 140)">
          <g
            style={{
              transform:
                "rotate(calc(-90deg + clamp(0, (var(--p) - 0.4) / 0.26, 1) * 34deg))",
              transformOrigin: "0 0",
            }}
          >
            <path d="M0 8V-70" stroke={INK} strokeWidth="1.8" />
          </g>
        </g>
        <circle cx="120" cy="140" r="5" fill={INK} />
      </Obj>

      {/* A bag of botanas: the snack the project is named after. */}
      <Obj x={150} y={598} r={7} tilt={5}>
        <path
          d="M10 0H190L200 20 196 200 180 214H20L4 200 0 20Z"
          transform="translate(5 5)"
          fill={SHEET}
          stroke={RULE}
        />
        <path
          d="M10 0H190L200 20 196 200 180 214H20L4 200 0 20Z"
          fill={SHEET}
          stroke={INK}
        />
        <path d="M0 20H200M4 200H196" stroke={INK} />
        {Array.from({ length: 19 }, (_, i) => (
          <path key={i} d={`M${12 + i * 10} 2v14`} stroke={RULE} />
        ))}
        <Note x="100" y="78" size={22} fill={INK} anchor="middle" weight={600}>
          botanas
        </Note>
        <Note x="100" y="98" size={7} anchor="middle">
          research loop · net wt 87 commits
        </Note>
        <rect
          x="30"
          y="116"
          width="140"
          height="66"
          fill="none"
          stroke={RULE}
        />
        <Note x="40" y="134" size={6.5}>
          strategies under test · 9
        </Note>
        <Note x="40" y="152" size={6.5}>
          archived backtests · 52
        </Note>
        <Note x="40" y="170" size={6.5}>
          live account · real money
        </Note>
      </Obj>

      <g className="site-art__lift">
        <BotanasSlip />
      </g>
      <Figure
        x={1200}
        y={676}
        value="8.9×"
        lines={["live return in three months", "reported in the case study"]}
      />
    </>
  );
}
