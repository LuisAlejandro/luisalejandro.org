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
} from "./shared";

/** A clinical-review sheet on a real clipboard, lifted over the title. */
export function SoleitReport() {
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

/** Soleit: an insole is captured, the desktop app analyses it, a report fills. */
export function SoleitArt({ layer = "back" }: { layer?: Layer }) {
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
