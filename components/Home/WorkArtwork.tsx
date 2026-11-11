"use client";

import { useEffect, useRef, useState } from "react";

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

/** Expedia: search, availability, booking, and the bookings that followed. */
function ExpediaArt() {
  return (
    <>
      <g {...frag(0)}>
        <rect
          x="30"
          y="52"
          width="300"
          height="146"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="74">
          Search
        </Note>
        <line x1="48" y1="86" x2="312" y2="86" stroke={RULE} />
        <Note x="48" y="108" size={11} fill={INK}>
          Madrid · 12–18 Mar · 2 guests
        </Note>
        <path
          d="M48 122h264M48 122v-14M114 122v-14M180 122v-14M246 122v-14M312 122v-14"
          stroke={RULE}
          fill="none"
        />
        <Note x="48" y="146">
          accessible · hotel
        </Note>
        <rect x="234" y="132" width="78" height="26" fill={INK} />
        <Note x="273" y="149" fill={PAPER} anchor="middle">
          search
        </Note>
      </g>

      <g {...frag(1)}>
        <rect
          x="306"
          y="170"
          width="330"
          height="180"
          fill="none"
          stroke={RULE}
        />
        <Note x="324" y="192">
          Availability
        </Note>
        <line x1="324" y1="204" x2="618" y2="204" stroke={RULE} />
        {[
          ["Hotel Aurora", "12 rooms", "$120"],
          ["Casa Miraflores", "4 rooms", "$98"],
          ["Gran Via Suites", "27 rooms", "$210"],
        ].map(([name, rooms, price], i) => (
          <g key={name}>
            <Note x="324" y={230 + i * 36} size={10} fill={INK}>
              {name}
            </Note>
            <Note x="496" y={230 + i * 36}>
              {rooms}
            </Note>
            <Note x="618" y={230 + i * 36} size={10} fill={INK} anchor="end">
              {price}
            </Note>
            <line
              x1="324"
              y1={240 + i * 36}
              x2="618"
              y2={240 + i * 36}
              stroke={RULE}
            />
            {i === 1 && (
              <line
                x1="324"
                y1={240 + i * 36}
                x2="382"
                y2={240 + i * 36}
                stroke={INK}
              />
            )}
          </g>
        ))}
      </g>

      <g {...frag(2)}>
        <rect
          x="30"
          y="246"
          width="256"
          height="176"
          fill="none"
          stroke={RULE}
        />
        <Note x="48" y="268">
          Booking · job #0417
        </Note>
        <line x1="48" y1="280" x2="286" y2="280" stroke={RULE} />
        {[
          ["6 nights", "$720"],
          ["2 rooms", "$240"],
          ["accessible transfer", "$280"],
        ].map(([label, amount], i) => (
          <g key={label}>
            <Note x="48" y={304 + i * 24} size={9} fill={INK}>
              {label}
            </Note>
            <Note x="286" y={304 + i * 24} size={9} fill={INK} anchor="end">
              {amount}
            </Note>
          </g>
        ))}
        <line x1="48" y1="364" x2="286" y2="364" stroke={RULE} />
        <Note x="48" y="390" size={9} fill={INK}>
          total
        </Note>
        <Note x="286" y="390" size={11} fill={INK} anchor="end">
          $1,240
        </Note>
      </g>

      <g {...frag(3)}>
        <rect
          x="596"
          y="336"
          width="316"
          height="132"
          fill="none"
          stroke={RULE}
        />
        <circle cx="620" cy="362" r="9" fill="none" stroke={INK} />
        <path d="M616 362l3 3 6-7" fill="none" stroke={INK} />
        <Note x="640" y="366" size={11} fill={INK}>
          Booking confirmed
        </Note>
        <Note x="616" y="392">
          WTW-2023-0417
        </Note>
        <line x1="616" y1="404" x2="892" y2="404" stroke={RULE} />
        <Note x="616" y="426">
          shopping + booking engines
        </Note>
      </g>

      <g {...frag(4)}>
        <text
          x="700"
          y="138"
          fill={ACCENT}
          fontSize="70"
          fontWeight="500"
          letterSpacing="-0.045em"
        >
          39%
        </text>
        <Note x="702" y="158">
          more bookings · Q1 2023
        </Note>
      </g>

      <Leader
        d="M180 198v22h-56"
        x={124}
        y={238}
        label="search engine"
        anchor="middle"
      />
      <Tip x={124} y={220} angle={90} />
      <Leader
        d="M430 170v-26"
        x={430}
        y={126}
        label="get /properties"
        order={1}
      />
      <Tip x={430} y={144} angle={-90} />
      <Leader
        d="M596 404h-44"
        x={552}
        y={394}
        label="hold + book"
        anchor="end"
        order={2}
      />
      <Tip x={576} y={404} angle={0} />

      <Dimension
        x1={30}
        x2={286}
        y={462}
        label="1,000 → 600,000 properties"
        order={5}
      />
      <Sheet />
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

const ART: Record<string, () => React.JSX.Element> = {
  "/case-studies/expedia": ExpediaArt,
  "/case-studies/wheeltheworld": CicdArt,
  "/case-studies/soleit": SoleitArt,
  "/case-studies/dockershelf": DockershelfArt,
  "/case-studies/canaima": CanaimaArt,
};

export function WorkArtwork({ slug }: { slug: string }) {
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
