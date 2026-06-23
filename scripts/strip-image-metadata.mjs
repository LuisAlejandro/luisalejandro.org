import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_ROOT = path.join(process.cwd(), "public", "images");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg"]);

async function collectRasterFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectRasterFiles(fullPath)));
      continue;
    }

    if (RASTER_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

async function stripMetadata(filePath) {
  const input = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();

  let pipeline = sharp(input, { failOn: "none" }).rotate();

  if (extension === ".png") {
    pipeline = pipeline.png({ compressionLevel: 9 });
  } else {
    pipeline = pipeline.jpeg({ quality: 85, mozjpeg: true });
  }

  const output = await pipeline.toBuffer();

  if (output.length > input.length) {
    return false;
  }

  if (output.equals(input)) {
    return false;
  }

  await writeFile(filePath, output);
  return true;
}

async function main() {
  const files = await collectRasterFiles(IMAGE_ROOT);

  if (files.length === 0) {
    console.log("strip-image-metadata: no raster files found");
    return;
  }

  let optimized = 0;

  for (const filePath of files) {
    const changed = await stripMetadata(filePath);
    if (changed) {
      optimized += 1;
      console.log(`strip-image-metadata: optimized ${path.relative(process.cwd(), filePath)}`);
    }
  }

  console.log(
    `strip-image-metadata: scanned ${files.length} file(s), optimized ${optimized}`
  );
}

main().catch((error) => {
  console.error("strip-image-metadata: failed", error);
  process.exit(1);
});
