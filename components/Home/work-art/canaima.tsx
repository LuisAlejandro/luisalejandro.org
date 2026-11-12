"use client";

import {
  INK,
  MUTED,
  RULE,
  ACCENT,
  PAPER,
  Note,
  SHEET,
  PANEL,
  beat,
  BARCODE,
  Layer,
} from "./shared";

/** Institutional deployment note, stamped in ink rather than a copied seal. */
export function CanaimaMemo() {
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

/** Canaima: build packages and an ISO, ship the disc, boot the desktop. */
export function CanaimaArt({ layer = "back" }: { layer?: Layer }) {
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
