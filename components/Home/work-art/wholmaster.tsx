"use client";

import {
  INK,
  MUTED,
  RULE,
  PAPER,
  Note,
  SHEET,
  PANEL,
  beat,
  Layer,
  Obj,
  Win,
  Check,
  Stamp,
  Figure,
} from "./shared";

/** A gym membership card, punched and validated as the member walks in. */
export function WholmasterCard() {
  return (
    <g transform="translate(540 560) rotate(-6)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <rect
          x="5"
          y="5"
          width="360"
          height="200"
          rx="14"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="360" height="200" rx="14" fill={SHEET} stroke={INK} />
        <rect
          x="160"
          y="12"
          width="40"
          height="9"
          rx="4.5"
          fill={PANEL}
          stroke={INK}
        />
        <path d="M0 40H360" stroke={INK} />
        <Note x="18" y="30" size={8} fill={INK}>
          bahia&apos;s gym · maracay
        </Note>
        <Note x="342" y="30" size={7} anchor="end">
          member
        </Note>
        {/* Portrait placeholder. */}
        <rect x="18" y="56" width="78" height="96" fill={PANEL} stroke={INK} />
        <circle cx="57" cy="90" r="17" fill="none" stroke={RULE} />
        <path d="M27 152c4-24 56-24 60 0" fill="none" stroke={RULE} />
        <Note x="112" y="74" size={7}>
          member id
        </Note>
        <Note x="112" y="94" size={18} fill={INK} weight={500}>
          WM-0417
        </Note>
        <Note x="112" y="118" size={7}>
          plan · monthly · renews 01
        </Note>
        <path d="M112 128H342" stroke={RULE} />
        {/* Twelve visits, punched one after another. */}
        <Note x="112" y="146" size={6.5}>
          visits this month
        </Note>
        {Array.from({ length: 12 }, (_, i) => (
          <g key={i}>
            <circle
              cx={118 + i * 19}
              cy="168"
              r="6"
              fill="none"
              stroke={RULE}
            />
            <g className="site-step-in" style={beat(0.1 + i * 0.035, 0.03)}>
              <circle cx={118 + i * 19} cy="168" r="6" fill={INK} />
            </g>
          </g>
        ))}
        <Stamp x={268} y={80} r={-11} w={110} at={0.62}>
          paid
        </Stamp>
      </g>
    </g>
  );
}

/** Wholmaster: the front desk app, a fingerprint at the door, a ledger that never leaves. */
export function WholmasterArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <WholmasterCard />;

  const bars = [42, 58, 50, 74, 66, 88, 81];
  return (
    <>
      {/* The front desk: members list, quick renew, an entrance log. */}
      <Obj x={214} y={150} r={-3} tilt={-4}>
        <Win w={650} h={300} title="Wholmaster · front desk · offline" />
        <path d="M0 28H650M116 28V300" stroke={INK} fill="none" />
        {["Members", "Payments", "Shop", "Entrance", "Reports"].map(
          (label, i) => (
            <g key={label}>
              {i === 3 && (
                <rect
                  x="10"
                  y={48 + i * 32}
                  width="95"
                  height="24"
                  rx="3"
                  fill={INK}
                />
              )}
              <Note
                x="22"
                y={64 + i * 32}
                size={8}
                fill={i === 3 ? PAPER : MUTED}
              >
                {label}
              </Note>
            </g>
          )
        )}
        <Note x="12" y="284" size={6.5}>
          5 languages
        </Note>
        <Note x="134" y="54" size={8}>
          Entrance log · today
        </Note>
        <Note x="630" y="54" size={7} anchor="end">
          sqlite · on this machine
        </Note>
        <path d="M134 64H630" stroke={RULE} />
        {[
          ["07:02", "WM-0233", "fingerprint"],
          ["07:09", "WM-0081", "face"],
          ["07:15", "WM-0390", "numpad"],
          ["07:21", "WM-0417", "fingerprint"],
        ].map(([t, id, how], i) => (
          <g key={id} className="site-step-in" style={beat(0.12 + i * 0.12)}>
            <Note x="134" y={88 + i * 26} size={8}>
              {t}
            </Note>
            <Note x="190" y={88 + i * 26} size={9} fill={INK}>
              {id}
            </Note>
            <Note x="300" y={88 + i * 26} size={8}>
              {how}
            </Note>
            <Note x="630" y={88 + i * 26} size={8} fill={INK} anchor="end">
              in
            </Note>
            <path d={`M134 ${97 + i * 26}H630`} stroke={RULE} />
          </g>
        ))}
        <rect
          x="134"
          y="210"
          width="230"
          height="70"
          fill="none"
          stroke={RULE}
        />
        <Note x="144" y="226" size={7}>
          revenue · 7 days
        </Note>
        {bars.map((h, i) => (
          <rect
            key={i}
            className="site-step-in"
            style={beat(0.4 + i * 0.04)}
            x={150 + i * 30}
            y={274 - h * 0.48}
            width="16"
            height={h * 0.48}
            fill={i === bars.length - 1 ? INK : PANEL}
            stroke={INK}
          />
        ))}
        <rect
          x="380"
          y="246"
          width="250"
          height="34"
          rx="3"
          fill="none"
          stroke={INK}
        />
        <Note x="505" y="267" size={8} anchor="middle">
          quick renew
        </Note>
        <g className="site-step-in" style={beat(0.72)}>
          <rect x="380" y="246" width="250" height="34" rx="3" fill={INK} />
          <Note x="505" y="267" size={8} fill={PAPER} anchor="middle">
            renewed · receipt printed
          </Note>
        </g>
      </Obj>

      {/* The fingerprint reader at the door, scanning a whorl. */}
      <Obj x={950} y={150} r={8} tilt={5}>
        <rect
          x="5"
          y="5"
          width="200"
          height="250"
          rx="22"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="200" height="250" rx="22" fill={SHEET} stroke={INK} />
        <circle cx="100" cy="22" r="4" fill={PANEL} stroke={INK} />
        <rect
          x="40"
          y="46"
          width="120"
          height="140"
          rx="12"
          fill={PANEL}
          stroke={INK}
        />
        <g transform="translate(100 118)">
          {[14, 22, 30, 38, 46].map((r, i) => (
            <path
              key={r}
              className="site-draw"
              style={beat(0.08 + i * 0.06, 0.1)}
              d={`M${-r} 6a${r} ${r * 1.15} 0 1 1 ${r * 2} 0${i % 2 ? `v${8 + i * 2}` : ""}`}
              fill="none"
              stroke={INK}
              pathLength={1}
            />
          ))}
          <path d="M-4 4a4 5 0 1 1 8 0v8" fill="none" stroke={INK} />
        </g>
        {/* The scan line sweeping down the glass. */}
        <path
          d="M46 0H154"
          stroke={INK}
          strokeWidth="1.5"
          style={{
            transform:
              "translateY(calc(56px + clamp(0, var(--p) / 0.4, 1) * 120px))",
          }}
        />
        <Note x="100" y="212" size={7} anchor="middle">
          reader · 4 models validated
        </Note>
        <g className="site-step-in" style={beat(0.42)}>
          <rect x="54" y="222" width="92" height="16" rx="8" fill={INK} />
          <Note x="100" y="233" size={7} fill={PAPER} anchor="middle">
            match · wm-0417
          </Note>
        </g>
      </Obj>

      {/* The Ed25519 licence: a lease bound to this machine. */}
      <Obj x={1222} y={258} r={-6} tilt={-4}>
        <rect x="5" y="5" width="270" height="180" fill={SHEET} stroke={RULE} />
        <rect width="270" height="180" fill={SHEET} stroke={INK} />
        <rect
          x="8"
          y="8"
          width="254"
          height="164"
          fill="none"
          stroke={RULE}
          strokeDasharray="2 3"
        />
        <Note x="135" y="34" size={8} anchor="middle">
          licence
        </Note>
        <Note x="135" y="60" size={14} fill={INK} anchor="middle" weight={500}>
          Ed25519 · signed
        </Note>
        <path d="M30 72H240" stroke={RULE} />
        {[
          ["machine", "bound"],
          ["lease", "7 days slack"],
          ["online check", "none"],
        ].map(([k, v], i) => (
          <g key={k}>
            <Note x="30" y={90 + i * 18} size={7}>
              {k}
            </Note>
            <Note x="240" y={90 + i * 18} size={7} fill={INK} anchor="end">
              {v}
            </Note>
          </g>
        ))}
        <circle cx="135" cy="152" r="14" fill="none" stroke={INK} />
        <circle cx="135" cy="152" r="9.5" fill="none" stroke={RULE} />
        <Check x={130.5} y={152} at={0.5} />
      </Obj>

      {/* The database as a file: a floppy, because a backup is a copy. */}
      <Obj x={132} y={636} r={6} tilt={5}>
        <path
          d="M0 0H170L196 26V196H0Z"
          transform="translate(5 5)"
          fill={SHEET}
          stroke={RULE}
        />
        <path d="M0 0H170L196 26V196H0Z" fill={SHEET} stroke={INK} />
        <rect x="44" y="0" width="108" height="62" fill={PANEL} stroke={INK} />
        <rect x="118" y="10" width="20" height="42" fill={SHEET} stroke={INK} />
        <rect x="24" y="92" width="148" height="92" fill={SHEET} stroke={INK} />
        <Note x="98" y="120" size={10} fill={INK} anchor="middle" weight={500}>
          gym.sqlite
        </Note>
        <path d="M36 134H160M36 150H160M36 166H160" stroke={RULE} />
        <g className="site-step-in" style={beat(0.56)}>
          <Note x="98" y="160" size={7} anchor="middle">
            backed up before update
          </Note>
        </g>
      </Obj>

      <g className="site-art__lift">
        <WholmasterCard />
      </g>
      <Figure
        x={1200}
        y={676}
        value="400+"
        lines={["days in daily use at one gym", "reported in the case study"]}
      />
    </>
  );
}
