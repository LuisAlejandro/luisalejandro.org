"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero background: a vortex of Go source, after the spiral on
 * contentarchitecture.dev. Behaviour and tuning follow that piece; the code,
 * colours and text are this site's own.
 *
 * - 30 rings; even rings turn clockwise, odd rings counter-clockwise, inner
 *   rings faster. Each ring carries text only inside a soft-edged "band" of
 *   its circumference; every other slot is a dot.
 * - The pointer opens a void: glyphs near it dissolve into dots.
 * - Click and hold charges the rings (they freeze, gather inward, shiver);
 *   releasing fires a ripple outward. A ripple also plays on load.
 * - Scrolling the pinned hero centres the eye, zooms and twists the field and
 *   dissolves it from the centre out; scroll speed spins the rings up.
 */

const GO_SOURCE = `package main
import ("context"; "log"; "net/http"; "time")
func main() {
mux := http.NewServeMux()
mux.HandleFunc("/prompt", handlePrompt)
log.Fatal(http.ListenAndServe(":8080", mux))
}
func handlePrompt(w http.ResponseWriter, r *http.Request) {
ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
defer cancel()
plan, err := agent.Plan(ctx, r.FormValue("prompt"))
if err != nil {
http.Error(w, err.Error(), http.StatusBadGateway)
return
}
build(ctx, plan)
test(ctx, plan)
deploy(ctx, plan)
}`;

const LINES = GO_SOURCE.split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

const RINGS = 30;
const RIPPLES = 16;
const PX_TO_DESIGN = 2 / 1080;
const RIPPLE_S = 1.8;
const RIPPLE_REACH = 1.6;
const RIPPLE_INNER = 0.425;
const CHARGE_S = 0.9;
const OPACITY = 0.3; // ink on paper; the headline sits on top
const ATLAS_COLS = 8;
const ATLAS_CELL = 64;

const LABELS = {
  idle: "Click & hold",
  holding: "Keep holding",
  charged: "Release",
} as const;
type HoldState = keyof typeof LABELS;

const smoothstep = (e0: number, e1: number, x: number) => {
  if (e0 === e1) return x < e0 ? 0 : 1;
  const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

/** Solve smoothstep(t) = y for t: when the entrance wave reaches a radius. */
const inverseSmoothstep = (y: number) => {
  if (y <= 0) return 0;
  if (y >= 1) return 1;
  let t = y;
  for (let i = 0; i < 6; i += 1) {
    const f = 3 * t * t - 2 * t * t * t - y;
    const d = 6 * t - 6 * t * t;
    if (d === 0) break;
    t -= f / d;
  }
  return Math.max(0, Math.min(1, t));
};

const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

const VERTEX = `#version 300 es
precision highp float;

in vec2 aCorner;
in vec2 aUv;
in float aRadius;
in float aTheta;
in float aSpeed;
in float aSize;
in float aGlyph;
in float aRing;

uniform float uTime;
uniform vec2 uFit;
uniform vec2 uCenter;
uniform vec2 uGrid;
uniform float uDot;
uniform vec2 uMouse;
uniform float uMouseOn;
uniform float uCharge[${RINGS}];
uniform float uGather[${RINGS}];
uniform float uRipple[${RIPPLES}];
uniform float uOffset[${RINGS}];
uniform float uArrive[${RINGS}];
uniform float uLight;

out vec2 vUv;
out float vRing;
out float vAlpha;

float hash(float x) { return fract(sin(x) * 43758.5453); }

void main() {
  int ring = int(aRing);

  // Strongest live ripple at this radius: eased front, bell profile, life fade.
  float wave = 0.0;
  for (int i = 0; i < ${RIPPLES}; i++) {
    float t0 = uRipple[i];
    if (t0 < 0.0) continue;
    float age = uTime - t0;
    if (age < 0.0 || age >= ${RIPPLE_S.toFixed(1)}) continue;
    float t = age / ${RIPPLE_S.toFixed(1)};
    float front = smoothstep(0.0, 1.0, t) * ${RIPPLE_REACH.toFixed(1)};
    float bell = 1.0 - smoothstep(0.0, 0.425, abs(aRadius - front));
    float life = smoothstep(0.0, 0.22, t) * (1.0 - smoothstep(0.78, 1.0, t));
    wave = max(wave, bell * life);
  }

  float charge = uCharge[ring];
  float radius = aRadius * (1.0 - uGather[ring] * 0.12) + wave * 0.045;
  float theta = aTheta + uTime * aSpeed + uOffset[ring];
  float c = cos(theta);
  float s = sin(theta);
  vec2 centre = vec2(c, s) * radius;

  // Void under the pointer, the ripple front and the scroll light all turn
  // letters into dots, each slot at its own threshold.
  float hover = (1.0 - smoothstep(0.0, 0.35, length(centre - uMouse))) * uMouseOn;
  float lit = 1.0 - smoothstep(uLight, uLight * 1.45 + 1e-5, radius);
  float strength = max(max(hover * 2.5, wave), lit);
  float seed = aTheta * 7.13 + aRadius * 13.97;
  float dotted = step(hash(seed * 12.9898), strength);
  float tick = floor(uTime * 9.0);
  dotted = max(dotted, step(hash(seed * 91.7 + tick * 7.31), charge * 0.15));

  float glyph = mix(aGlyph, uDot, dotted);
  float size = mix(aSize, 5.0, dotted) * (1.0 + wave * 0.5) * ${PX_TO_DESIGN};

  // Glyphs stand tangent to the ring.
  vec2 quad = vec2(-aCorner.x * s - aCorner.y * c, aCorner.x * c - aCorner.y * s) * size;

  // While charged, a fifth of the slots tremble.
  float shake = hash(aTheta * 91.17 + aRadius * 47.91);
  vec2 tremor = vec2(
    sin(uTime * (38.0 + shake * 14.0) + shake * 271.0),
    cos(uTime * (34.0 + shake * 17.0) + shake * 113.0)
  ) * charge * step(shake, 0.18) * 0.002;

  gl_Position = vec4((centre + quad + tremor) * uFit + uCenter, 0.0, 1.0);

  float col = mod(glyph, uGrid.x);
  float row = floor(glyph / uGrid.x);
  vUv = vec2((col + aUv.x) / uGrid.x, (row + 1.0 - aUv.y) / uGrid.y);
  vRing = clamp(aRadius, 0.0, 1.2);
  vAlpha = clamp((uTime - uArrive[ring]) / 0.5, 0.0, 1.0)
    * smoothstep(uLight, uLight * 1.1 + 1e-5, radius);
}
`;

const FRAGMENT = `#version 300 es
precision mediump float;

uniform sampler2D uAtlas;
uniform vec3 uInk;
uniform float uOpacity;

in vec2 vUv;
in float vRing;
in float vAlpha;

out vec4 colour;

void main() {
  // The eye is drawn slightly fainter than the rim.
  float depth = mix(0.85, 1.0, smoothstep(0.0, 0.85, vRing));
  colour = vec4(uInk, texture(uAtlas, vUv).a * vAlpha * depth * uOpacity);
}
`;

type Ring = {
  radius: number;
  speed: number;
  count: number;
  size: number;
  bandCentre: number;
  bandHalf: number;
  bandSoft: number;
};

function buildRings(): Ring[] {
  return Array.from({ length: RINGS }, (_, i) => {
    const a = i / (RINGS - 1);
    const radius = 0.06 + 1.39 * a;
    const size = 14 + 16 * a;
    return {
      radius,
      speed: (i % 2 === 0 ? 1 : -1) * (0.006 + (1 - a) * 0.029),
      count: Math.max(
        8,
        Math.floor((2 * Math.PI * radius) / (0.6 * size * PX_TO_DESIGN))
      ),
      size,
      // Most bands lean the same way, which is what draws the spiral arm.
      bandCentre:
        Math.random() < 0.15
          ? Math.random() * Math.PI * 2
          : 0.25 + (Math.random() - 0.5) * 0.65 * Math.PI,
      bandHalf:
        Math.min(
          0.98,
          Math.random() < 0.1
            ? 0.05 + 0.15 * Math.random()
            : 0.25 + 0.35 * a + 0.3 * Math.random()
        ) * Math.PI,
      bandSoft: Math.PI * (0.07 + 0.13 * Math.random()),
    };
  });
}

function buildAtlas(chars: string[], family: string) {
  const canvas = document.createElement("canvas");
  const rows = Math.ceil((chars.length + 1) / ATLAS_COLS);
  canvas.width = ATLAS_COLS * ATLAS_CELL;
  canvas.height = rows * ATLAS_CELL;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `400 ${ATLAS_CELL * 0.9}px ${family}`;
    const cell = (i: number) => [
      ((i % ATLAS_COLS) + 0.5) * ATLAS_CELL,
      (Math.floor(i / ATLAS_COLS) + 0.55) * ATLAS_CELL,
    ];
    chars.forEach((ch, i) => {
      const [x, y] = cell(i);
      ctx.fillText(ch, x, y);
    });
    // The last cell is the dot every non-letter slot shows.
    const [x, y] = cell(chars.length);
    ctx.beginPath();
    ctx.arc(x, y, ATLAS_CELL * 0.09, 0, Math.PI * 2);
    ctx.fill();
  }
  return { canvas, rows, dot: chars.length };
}

/** One instance per slot: letters inside the band, dots everywhere else. */
function buildSlots(
  rings: Ring[],
  glyphOf: (ch: string) => number,
  dot: number
) {
  const total = rings.reduce((sum, ring) => sum + ring.count, 0);
  const radius = new Float32Array(total);
  const theta = new Float32Array(total);
  const speed = new Float32Array(total);
  const size = new Float32Array(total);
  const glyph = new Float32Array(total);
  const ring = new Float32Array(total);

  let n = 0;
  rings.forEach((r, k) => {
    // Each ring cycles one line of the source, with 1 to 3 dots between runs.
    const line = LINES[k % LINES.length];
    const letters: number[] = [];
    while (letters.length < r.count) {
      for (const ch of line) letters.push(glyphOf(ch));
      const gap = 1 + Math.floor(Math.random() * 3);
      for (let g = 0; g < gap; g += 1) letters.push(-1);
    }

    const start = Math.random() * Math.PI * 2;
    const step = (Math.PI * 2) / r.count;
    const outer = r.bandHalf + r.bandSoft;
    const inner = Math.max(0, r.bandHalf - r.bandSoft);
    for (let i = 0; i < r.count; i += 1) {
      const t = start + i * step;
      const inside = smoothstep(
        outer,
        inner,
        Math.abs(wrapAngle(t - r.bandCentre))
      );
      const letter = letters[i];
      const shown =
        letter >= 0 &&
        (inside > 0.7 || (inside >= 0.3 && Math.random() < inside));
      radius[n] = r.radius;
      theta[n] = t;
      speed[n] = r.speed;
      ring[n] = k;
      glyph[n] = shown ? letter : dot;
      size[n] = shown ? r.size * (0.85 + 0.15 * inside) : 5;
      n += 1;
    }
  });
  return { radius, theta, speed, size, glyph, ring, total };
}

function compile(gl: WebGL2RenderingContext) {
  const program = gl.createProgram();
  if (!program) return null;
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ] as const) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      "[HeroVortex] shader link failed",
      gl.getProgramInfoLog(program)
    );
    return null;
  }
  return program;
}

export function HeroVortex() {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [hold, setHold] = useState<HoldState>("idle");
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const stage = host?.closest<HTMLElement>(".site-hero");
    const pin = host?.closest<HTMLElement>(".site-hero-pin");
    if (!host || !stage) return;

    const canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.className = "absolute inset-0 block h-full w-full";
    host.appendChild(canvas);

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    });
    const program = gl && compile(gl);
    if (!gl || !program) {
      host.removeChild(canvas);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    // Read once in a timeout, not synchronously in the effect body.
    const coarseTimer = window.setTimeout(() => setCoarse(isCoarse), 0);

    // --- geometry ---------------------------------------------------------
    const rings = buildRings();
    const chars = Array.from(new Set(LINES.join("").split("")));
    const indexOf = new Map(chars.map((ch, i) => [ch, i]));
    const family =
      getComputedStyle(host).fontFamily || "ui-monospace, monospace";
    let atlas = buildAtlas(chars, family);
    const slots = buildSlots(rings, (ch) => indexOf.get(ch) ?? 0, atlas.dot);
    const arrive = new Float32Array(
      rings.map(
        (r) =>
          RIPPLE_S *
          inverseSmoothstep(
            Math.min(1, Math.max(0, r.radius - RIPPLE_INNER) / RIPPLE_REACH)
          )
      )
    );

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const attribute = (
      name: string,
      data: Float32Array,
      size: number,
      divisor: number
    ) => {
      const loc = gl.getAttribLocation(program, name);
      if (loc < 0) return;
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      gl.vertexAttribDivisor(loc, divisor);
    };
    attribute(
      "aCorner",
      new Float32Array([
        -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5,
      ]),
      2,
      0
    );
    attribute(
      "aUv",
      new Float32Array([0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1]),
      2,
      0
    );
    attribute("aRadius", slots.radius, 1, 1);
    attribute("aTheta", slots.theta, 1, 1);
    attribute("aSpeed", slots.speed, 1, 1);
    attribute("aSize", slots.size, 1, 1);
    attribute("aGlyph", slots.glyph, 1, 1);
    attribute("aRing", slots.ring, 1, 1);

    const texture = gl.createTexture();
    const upload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        atlas.canvas
      );
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(
        gl.TEXTURE_2D,
        gl.TEXTURE_MIN_FILTER,
        gl.LINEAR_MIPMAP_LINEAR
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };
    upload();

    gl.useProgram(program);
    const u = (name: string) => gl.getUniformLocation(program, name);
    const uTime = u("uTime");
    const uFit = u("uFit");
    const uCenter = u("uCenter");
    const uMouse = u("uMouse");
    const uMouseOn = u("uMouseOn");
    const uCharge = u("uCharge");
    const uGather = u("uGather");
    const uRipple = u("uRipple");
    const uOffset = u("uOffset");
    const uLight = u("uLight");
    gl.uniform2f(u("uGrid"), ATLAS_COLS, atlas.rows);
    gl.uniform1f(u("uDot"), atlas.dot);
    gl.uniform1fv(u("uArrive"), arrive);
    gl.uniform3f(u("uInk"), 14 / 255, 14 / 255, 13 / 255);
    gl.uniform1f(u("uOpacity"), OPACITY);
    gl.uniform1i(u("uAtlas"), 0);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(
      gl.SRC_ALPHA,
      gl.ONE_MINUS_SRC_ALPHA,
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );
    gl.clearColor(0, 0, 0, 0);

    // --- state ------------------------------------------------------------
    let width = 1;
    let height = 1;
    let fitX = 1;
    let fitY = 1;
    let time = 0;
    let last = performance.now();
    let frame = 0;
    let onScreen = true;
    let pageVisible = !document.hidden;
    let motion = !reduced.matches;

    const ripples: { start: number; strength: number }[] = [];
    let releasedAt = -1;
    const mouseTarget = [999, 999];
    const mouse = [999, 999];
    let mouseOn = 0;
    let mouseOnTarget = 0;
    let holding = false;
    let charged = false;
    let progress = 0; // 0..1 over CHARGE_S while held
    let gatherSlow = 0;
    const ringCharge = new Float32Array(RINGS);
    const ringGather = new Float32Array(RINGS);
    const chargeUniform = new Float32Array(RINGS);
    const freeze = new Float32Array(RINGS);
    const kick = new Float32Array(RINGS);
    const kickSmooth = new Float32Array(RINGS);
    const offsets = new Float32Array(RINGS);
    const rippleUniform = new Float32Array(RIPPLES).fill(-1);
    let velocity = 0;
    let spin = 0;
    let lastScroll = window.scrollY;

    // Camera at rest: eye right of centre on wide screens.
    const camera = { x: 0, y: 0, zoom: 1, twist: 0, light: 0 };
    const rest = () => {
      const landscape = width >= height;
      return landscape
        ? { x: 0.42, y: 0.02, zoom: 0.72 }
        : { x: 0.28, y: 0.12, zoom: 0.62 };
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      // One design unit is half the longer side, so rings stay round.
      const aspect = width / height;
      if (aspect >= 1) {
        fitX = 1;
        fitY = aspect;
      } else {
        fitX = 1 / aspect;
        fitY = 1;
      }
    };

    /** Scroll through the pinned hero: centre, zoom, twist, then dissolve. */
    const updateCamera = () => {
      const base = rest();
      let p = 0;
      if (pin && motion) {
        const rect = pin.getBoundingClientRect();
        const span = rect.height - window.innerHeight;
        p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      }
      const centreIn = smoothstep(0.02, 0.3, p);
      const dive = Math.min(1, Math.max(0, (p - 0.02) / 0.92)) ** 1.3;
      const open = Math.min(1, Math.max(0, (p - 0.35) / 0.59)) ** 1.6;
      camera.x = base.x * (1 - centreIn);
      camera.y = base.y * (1 - centreIn);
      camera.zoom = base.zoom * (6 / base.zoom) ** dive;
      camera.twist = -1.2 * dive;
      const lightPx = (Math.hypot(width, height) / 2) * open;
      camera.light = lightPx / (0.5 * Math.max(width, height) * camera.zoom);
      stage.style.setProperty(
        "--site-hero-copy",
        String(Math.max(0, 1 - 1.5 * centreIn))
      );
    };

    const render = () => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uFit, fitX * camera.zoom, fitY * camera.zoom);
      gl.uniform2f(uCenter, camera.x, camera.y);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.uniform1f(uMouseOn, mouseOn);
      gl.uniform1fv(uCharge, chargeUniform);
      gl.uniform1fv(uGather, ringGather);
      gl.uniform1fv(uRipple, rippleUniform);
      gl.uniform1fv(uOffset, offsets);
      gl.uniform1f(uLight, camera.light);
      gl.bindVertexArray(vao);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, slots.total);
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (motion) time += dt;

      while (ripples.length && time - ripples[0].start >= RIPPLE_S)
        ripples.shift();
      for (let i = 0; i < RIPPLES; i += 1)
        rippleUniform[i] = ripples[i]?.start ?? -1;

      mouseOn += (mouseOnTarget - mouseOn) * (1 - Math.exp(-6 * dt));
      const follow = 1 - Math.exp(-14 * dt);
      mouse[0] += (mouseTarget[0] - mouse[0]) * follow;
      mouse[1] += (mouseTarget[1] - mouse[1]) * follow;

      if (holding) {
        progress = Math.min(1, progress + dt / CHARGE_S);
        gatherSlow = 1 - (1 - gatherSlow) * Math.exp(-dt / 4);
        if (!charged && progress >= 1) {
          charged = true;
          setHold("charged");
        }
      } else {
        progress *= Math.exp(-10 * dt);
        gatherSlow *= Math.exp(-10 * dt);
      }

      // Charge drains ring by ring as the release wave passes over it.
      const decay = Math.exp(-10 * dt);
      const sinceRelease = time - releasedAt;
      const waving = releasedAt >= 0 && sinceRelease < RIPPLE_S;
      const front = waving
        ? RIPPLE_REACH * smoothstep(0, 1, sinceRelease / RIPPLE_S) +
          RIPPLE_INNER
        : Infinity;
      for (let k = 0; k < RINGS; k += 1) {
        if (holding) {
          const f = 1 - Math.exp(-14 * dt);
          ringCharge[k] += (progress - ringCharge[k]) * f;
          ringGather[k] +=
            (smoothstep(0, 1, progress) * gatherSlow - ringGather[k]) * f;
        } else if (!waving || front >= rings[k].radius) {
          ringCharge[k] *= decay;
          ringGather[k] *= decay;
        }
        chargeUniform[k] = smoothstep(0, 1, ringCharge[k]);
        // A charged ring cancels its own spin: the spiral freezes.
        freeze[k] -= chargeUniform[k] * rings[k].speed * dt;
      }

      // Scroll speed spins every ring up, capped at forty times.
      const scroll = window.scrollY;
      velocity =
        velocity * Math.exp(-5 * dt) +
        (Math.abs(scroll - lastScroll) / Math.max(dt * 60, 1e-3)) *
          (1 - Math.exp(-5 * dt));
      lastScroll = scroll;
      spin += (Math.min(40, velocity) - spin) * (1 - Math.exp(-4 * dt));

      const settle = 1 - Math.exp(-3 * dt);
      for (let k = 0; k < RINGS; k += 1) {
        const r = rings[k];
        let push = 0;
        for (const ripple of ripples) {
          const age = time - ripple.start;
          if (age < 0 || age >= RIPPLE_S) continue;
          const t = age / RIPPLE_S;
          const at = RIPPLE_REACH * smoothstep(0, 1, t);
          const bell = 1 - smoothstep(0, RIPPLE_INNER, Math.abs(r.radius - at));
          push = Math.max(
            push,
            bell *
              smoothstep(0, 0.22, t) *
              (1 - smoothstep(0.78, 1, t)) *
              ripple.strength
          );
        }
        kick[k] += (0.55 * push * Math.sign(r.speed) + r.speed * spin) * dt;
        kickSmooth[k] += (kick[k] - kickSmooth[k]) * settle;
        offsets[k] = kickSmooth[k] + freeze[k] + camera.twist;
      }

      updateCamera();
      render();
      frame = running() ? window.requestAnimationFrame(step) : 0;
    };

    const running = () => onScreen && pageVisible && motion;
    const wake = () => {
      if (running()) {
        if (!frame) {
          last = performance.now();
          frame = window.requestAnimationFrame(step);
        }
      } else {
        window.cancelAnimationFrame(frame);
        frame = 0;
        updateCamera();
        render();
      }
    };

    // --- pointer ----------------------------------------------------------
    const toDesign = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      const cx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const cy = -(((clientY - rect.top) / rect.height) * 2 - 1);
      return [
        (cx - camera.x) / (fitX * camera.zoom),
        (cy - camera.y) / (fitY * camera.zoom),
      ];
    };
    // Links and buttons in the hero keep their own pointer behaviour.
    const onControl = (target: EventTarget | null) =>
      target instanceof Element && !!target.closest("a, button, input");

    const moveLabel = (clientX: number, clientY: number) => {
      const label = labelRef.current;
      if (!label || isCoarse) return;
      const rect = stage.getBoundingClientRect();
      label.style.transform = `translate3d(${clientX - rect.left + 20}px, ${clientY - rect.top + 20}px, 0)`;
    };

    const onMove = (event: PointerEvent) => {
      const [x, y] = toDesign(event.clientX, event.clientY);
      mouseTarget[0] = x;
      mouseTarget[1] = y;
      moveLabel(event.clientX, event.clientY);
      setHovering(!onControl(event.target));
    };
    const onEnter = (event: PointerEvent) => {
      const [x, y] = toDesign(event.clientX, event.clientY);
      mouseTarget[0] = mouse[0] = x;
      mouseTarget[1] = mouse[1] = y;
      mouseOnTarget = 1;
      moveLabel(event.clientX, event.clientY);
      setHovering(!onControl(event.target));
    };
    const onLeave = () => {
      mouseOnTarget = 0;
      holding = false;
      charged = false;
      setHovering(false);
      setHold("idle");
    };
    const onDown = (event: PointerEvent) => {
      if (onControl(event.target) || event.button > 0) return;
      event.preventDefault(); // no text selection while holding
      holding = true;
      charged = false;
      setHold("holding");
    };
    const onUp = () => {
      if (!holding) return;
      holding = false;
      if (charged) {
        releasedAt = time;
        ripples.push({ start: time, strength: 0.7 + 0.6 * gatherSlow });
        while (ripples.length > RIPPLES) ripples.shift();
      }
      charged = false;
      setHold("idle");
    };

    const abort = new AbortController();
    const { signal } = abort;
    stage.addEventListener("pointermove", onMove, { signal });
    stage.addEventListener("pointerenter", onEnter, { signal });
    stage.addEventListener("pointerleave", onLeave, { signal });
    stage.addEventListener("pointerdown", onDown, { signal });
    window.addEventListener("pointerup", onUp, { signal });
    window.addEventListener("scroll", () => !frame && wake(), {
      passive: true,
      signal,
    });
    document.addEventListener(
      "visibilitychange",
      () => {
        pageVisible = !document.hidden;
        wake();
      },
      { signal }
    );
    reduced.addEventListener(
      "change",
      () => {
        motion = !reduced.matches;
        wake();
      },
      { signal }
    );

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!frame) render();
    });
    resizeObserver.observe(host);
    const intersection = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      wake();
    });
    intersection.observe(host);

    // Glyph shapes need the real mono face, not its fallback.
    document.fonts.ready.then(() => {
      if (signal.aborted) return;
      atlas = buildAtlas(chars, getComputedStyle(host).fontFamily || family);
      upload();
      if (!frame) render();
    });

    resize();
    if (motion) {
      ripples.push({ start: 0, strength: 1 });
    } else {
      time = 2.3; // past the entrance, every ring already in
    }
    updateCamera();
    render();
    host.dataset.on = "true";
    wake();

    return () => {
      window.clearTimeout(coarseTimer);
      window.cancelAnimationFrame(frame);
      abort.abort();
      resizeObserver.disconnect();
      intersection.disconnect();
      stage.style.removeProperty("--site-hero-copy");
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (canvas.parentNode === host) host.removeChild(canvas);
    };
  }, []);

  const text = hold === "idle" && coarse ? "Tap & hold" : LABELS[hold];

  return (
    <>
      <div
        ref={hostRef}
        aria-hidden="true"
        className="site-vortex font-site-mono"
      />
      <div
        ref={labelRef}
        aria-hidden="true"
        className="site-vortex-label site-note"
        data-visible={coarse || hovering}
        data-coarse={coarse}
      >
        {text}
      </div>
    </>
  );
}
