// Regenerates public/favicon/* from the face mark (public/images/logomin.svg):
// ink on paper, the right brow in the signal crimson, as the header draws it.
// Run inside the app container: node scripts/generate-favicons.mjs
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const PAPER = "#f4f4f0";
const INK = "#0e0e0d";
const SIGNAL = "#d61f3a";
const OUT = path.join(process.cwd(), "public", "favicon");

const source = await readFile(
  path.join(process.cwd(), "public", "images", "logomin.svg"),
  "utf8"
);
// logomin.svg holds four paths in order: hair, left brow, right brow, glasses.
const paths = [...source.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
if (paths.length !== 4)
  throw new Error(`expected 4 paths, got ${paths.length}`);
const [hair, browL, browR, glasses] = paths;

/** The mark on a square tile. `pad` is the share of the tile left as margin. */
function tile({
  size = 100,
  pad = 0.1,
  ground = PAPER,
  accent = SIGNAL,
  ink = INK,
}) {
  const s = (size * (1 - 2 * pad)) / 100;
  const o = size * pad;
  const bg = ground
    ? `<rect width="${size}" height="${size}" fill="${ground}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">${bg}<g transform="translate(${o} ${o}) scale(${s})" fill="${ink}"><path d="${hair}"/><path d="${browL}"/><path d="${browR}" fill="${accent}"/><path d="${glasses}"/></g></svg>`;
}

const png = (svg, size, file) =>
  sharp(Buffer.from(svg), { density: 72 * (size / 100) * 4 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, file));

// favicon.svg: transparent, so a dark browser tab shows the mark on its own
// ground; prefers-color-scheme flips the ink to paper there.
const favicon = tile({ ground: null, pad: 0.02 })
  .replace(
    "<g ",
    `<style>g{fill:${INK}}@media (prefers-color-scheme:dark){g{fill:${PAPER}}}</style><g `
  )
  .replace(` fill="${INK}"`, "");
await writeFile(path.join(OUT, "favicon.svg"), favicon + "\n");

// Safari pinned tab: one colour, no ground, the colour comes from the <link>.
await writeFile(
  path.join(OUT, "safari-pinned-tab.svg"),
  tile({ ground: null, pad: 0, accent: "#000", ink: "#000" }) + "\n"
);

const tight = tile({ pad: 0.04 });
await png(tight, 16, "favicon-16x16.png");
await png(tight, 32, "favicon-32x32.png");
await png(tight, 48, "favicon.png");
// Home-screen icons get a wider margin: iOS rounds the corners, Android masks.
await png(tile({ pad: 0.14 }), 180, "apple-touch-icon.png");
await png(tile({ pad: 0.18 }), 192, "android-chrome-192x192.png");
await png(tile({ pad: 0.18 }), 512, "android-chrome-512x512.png");
await png(tile({ pad: 0.16 }), 144, "mstile-144x144.png");
await png(tile({ pad: 0.2 }), 150, "mstile-150x150.png");

// favicon.ico: PNG-compressed ICO (Vista+) with 16, 32 and 48.
const sizes = [16, 32, 48];
const images = await Promise.all(
  sizes.map((size) =>
    sharp(Buffer.from(tight), { density: 72 * (size / 100) * 4 })
      .resize(size, size)
      .png()
      .toBuffer()
  )
);
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const e = 6 + 16 * i;
  header.writeUInt8(size, e);
  header.writeUInt8(size, e + 1);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
await writeFile(
  path.join(OUT, "favicon.ico"),
  Buffer.concat([header, ...images])
);

console.log("favicons written to", OUT);
