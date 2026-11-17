"use client";

import {
  INK,
  RULE,
  PAPER,
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

/** The dispatch ticket: fenced YAML from the bot, approved by the one human. */
export function TetraTicket() {
  const lines = [
    ["task:", "release-notes"],
    ["repo:", "agoras"],
    ["stage:", "brainstorm → pr"],
    ["attempts:", "3"],
  ];
  return (
    <g transform="translate(560 560) rotate(-5)">
      <g
        className="site-obj"
        style={{ "--tilt-in": "-5deg" } as React.CSSProperties}
      >
        <rect x="5" y="5" width="340" height="208" fill={SHEET} stroke={RULE} />
        <rect width="340" height="208" fill={SHEET} stroke={INK} />
        {/* Punched ticket edge. */}
        {Array.from({ length: 9 }, (_, i) => (
          <circle
            key={i}
            cx="0"
            cy={20 + i * 21}
            r="5"
            fill={PANEL}
            stroke={INK}
          />
        ))}
        <Note x="22" y="24" size={7}>
          #dispatch · tetra-bot
        </Note>
        <path d="M22 34H322" stroke={RULE} />
        <Note x="22" y="54" size={8}>
          ```yaml
        </Note>
        {lines.map(([k, v], i) => (
          <g key={k}>
            <Note x="34" y={76 + i * 20} size={9}>
              {k}
            </Note>
            <Note x="118" y={76 + i * 20} size={9} fill={INK}>
              {v}
            </Note>
          </g>
        ))}
        <Note x="22" y="160" size={8}>
          ```
        </Note>
        <path d="M22 174H322" stroke={RULE} />
        <Note x="22" y="194" size={7}>
          only luis approves
        </Note>
        <Stamp x={256} y={150} r={-10} w={120} at={0.64}>
          approved
        </Stamp>
      </g>
    </g>
  );
}

/** Tetra: two hosts on cron, a six-stage pipeline, one approval. */
export function TetraArt({ layer = "back" }: { layer?: Layer }) {
  if (layer === "front") return <TetraTicket />;

  const stages = ["brainstorm", "plan", "work", "qa", "lint", "pr"];
  return (
    <>
      {/* Two hosts, wired through a shared git repository. */}
      <Obj x={210} y={152} r={-3} tilt={-4}>
        <Win w={660} h={290} title="tetra · two hosts" />
        {[
          [
            "linux · wsl",
            "research + editorial",
            ["market scan", "debt scan", "topic radar", "councils"],
          ],
          [
            "mac",
            "implementation",
            ["consumer", "debug", "design vote", "watchdog"],
          ],
        ].map(([host, role, jobs], h) => {
          const x = 24 + h * 404;
          return (
            <g key={host as string}>
              <rect
                x={x}
                y="50"
                width="208"
                height="214"
                rx="4"
                fill="none"
                stroke={INK}
              />
              <Note x={x + 12} y="70" size={9} fill={INK} weight={500}>
                {host as string}
              </Note>
              <Note x={x + 12} y="86" size={7}>
                {role as string}
              </Note>
              <path d={`M${x + 12} 96H${x + 196}`} stroke={RULE} />
              {(jobs as string[]).map((job, i) => (
                <g
                  key={job}
                  className="site-step-in"
                  style={beat(0.1 + h * 0.2 + i * 0.05)}
                >
                  <rect
                    x={x + 12}
                    y={108 + i * 36}
                    width="184"
                    height="26"
                    fill={PANEL}
                    stroke={RULE}
                  />
                  <Note x={x + 22} y={125 + i * 36} size={8} fill={INK}>
                    {job}
                  </Note>
                  <Note x={x + 188} y={125 + i * 36} size={6.5} anchor="end">
                    cron
                  </Note>
                </g>
              ))}
            </g>
          );
        })}
        {/* The shared repo between them. */}
        <rect
          x="262"
          y="118"
          width="136"
          height="78"
          rx="4"
          fill={SHEET}
          stroke={INK}
        />
        <Note x="330" y="146" size={8} fill={INK} anchor="middle">
          second brain
        </Note>
        <Note x="330" y="164" size={7} anchor="middle">
          git · briefs · log
        </Note>
        <Note x="330" y="182" size={6.5} anchor="middle">
          no sync, one writer
        </Note>
        <path
          className="site-draw"
          style={beat(0.2, 0.14)}
          d="M232 157H262"
          stroke={INK}
          pathLength={1}
        />
        <path
          className="site-draw"
          style={beat(0.36, 0.14)}
          d="M398 157H428"
          stroke={INK}
          pathLength={1}
        />
        <path d="M256 153l6 4-6 4M422 153l6 4-6 4" fill="none" stroke={INK} />
      </Obj>

      {/* The six-stage pipeline, as a conveyor of stage cards. */}
      <Obj x={960} y={150} r={6} tilt={4}>
        <rect x="5" y="5" width="230" height="282" fill={SHEET} stroke={RULE} />
        <rect width="230" height="282" fill={SHEET} stroke={INK} />
        <Note x="16" y="24" size={8}>
          pipeline · every task
        </Note>
        <path d="M16 35H214" stroke={RULE} />
        {stages.map((name, i) => (
          <g key={name}>
            <rect
              x="16"
              y={48 + i * 36}
              width="198"
              height="26"
              fill="none"
              stroke={RULE}
            />
            <Note x="26" y={65 + i * 36} size={6.5}>
              {String(i + 1).padStart(2, "0")}
            </Note>
            <Note x="50" y={65 + i * 36} size={9} fill={INK}>
              {name}
            </Note>
            <g className="site-step-in" style={beat(0.28 + i * 0.07)}>
              <rect x="16" y={48 + i * 36} width="6" height="26" fill={INK} />
              <Note x="204" y={65 + i * 36} size={6.5} fill={INK} anchor="end">
                done
              </Note>
            </g>
          </g>
        ))}
        <Note x="16" y="270" size={6.5}>
          stuck after 3 tries → escalation
        </Note>
      </Obj>

      {/* A wall clock: cron, ticking through the night. */}
      <Obj x={1250} y={250} r={-6} tilt={-4}>
        <circle cx="105" cy="105" r="105" fill={SHEET} stroke={INK} />
        <circle cx="105" cy="105" r="96" fill="none" stroke={RULE} />
        {Array.from({ length: 60 }, (_, i) => (
          <path
            key={i}
            d={`M105 ${i % 5 ? 13 : 11}v${i % 5 ? 5 : 11}`}
            stroke={i % 5 ? RULE : INK}
            transform={`rotate(${i * 6} 105 105)`}
          />
        ))}
        <Note x="105" y="70" size={7} anchor="middle">
          cron
        </Note>
        <Note x="105" y="152" size={8} fill={INK} anchor="middle">
          35 jobs
        </Note>
        <g transform="translate(105 105)">
          <g
            style={{
              transform:
                "rotate(calc(-30deg + clamp(0, var(--p) / 0.8, 1) * 300deg))",
              transformOrigin: "0 0",
            }}
          >
            <path d="M0 10V-58" stroke={INK} strokeWidth="2" />
          </g>
          <g
            style={{
              transform:
                "rotate(calc(60deg + clamp(0, var(--p) / 0.8, 1) * 25deg))",
              transformOrigin: "0 0",
            }}
          >
            <path d="M0 6V-38" stroke={INK} strokeWidth="3.5" />
          </g>
        </g>
        <circle cx="105" cy="105" r="5" fill={INK} />
      </Obj>

      {/* The chat bus, its approval queue and the one person who clears it. */}
      <Obj x={130} y={630} r={5} tilt={5}>
        <rect
          x="5"
          y="5"
          width="240"
          height="150"
          rx="6"
          fill={SHEET}
          stroke={RULE}
        />
        <rect width="240" height="150" rx="6" fill={SHEET} stroke={INK} />
        <Note x="16" y="22" size={7}>
          # approvals
        </Note>
        <path d="M0 32H240" stroke={INK} />
        {[
          ["tetra-bot", "brief · week 46"],
          ["tetra-bot", "pr ready · agoras"],
          ["luis", "approve"],
        ].map(([who, what], i) => (
          <g key={what} className="site-step-in" style={beat(0.46 + i * 0.1)}>
            <circle
              cx="24"
              cy={52 + i * 34}
              r="8"
              fill={who === "luis" ? INK : PANEL}
              stroke={INK}
            />
            <Note x="40" y={50 + i * 34} size={7}>
              {who}
            </Note>
            <Note x="40" y={63 + i * 34} size={8} fill={INK}>
              {what}
            </Note>
          </g>
        ))}
        <g className="site-step-in" style={beat(0.7)}>
          <rect x="164" y="106" width="60" height="18" rx="9" fill={INK} />
          <Note x="194" y="118" size={7} fill={PAPER} anchor="middle">
            ✓ 1
          </Note>
        </g>
      </Obj>

      <g className="site-art__lift">
        <TetraTicket />
      </g>
      <Figure
        x={1200}
        y={676}
        value="700h"
        lines={["a year returned to me", "reported in the case study"]}
      />
    </>
  );
}
