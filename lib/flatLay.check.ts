import assert from "node:assert/strict";

import { flatLay } from "@lib/flatLay";

// A work-grid cell is 16:10 over the drawings' 1600×900 sheet.
const view = { x: 0, y: -50, width: 1600, height: 1000 };

// Measured objects of two drawings, in document order; the lifted card is
// last. Mash is the tallest drawing, Dockershelf the widest.
const drawings = {
  mash: [
    [0, 0, 665, 305],
    [-6, -9, 223, 281],
    [0, 0, 275, 187],
    [0, 0, 218, 148],
    [0, -118, 428, 307],
  ],
  dockershelf: [
    [0, 0, 645, 286],
    [-5, -5, 290, 237],
    [-6, -9, 213, 251],
    [0, 0, 234, 167],
    [-12, 0, 724, 228],
  ],
};

for (const [name, raw] of Object.entries(drawings)) {
  const boxes = raw.map(([x, y, width, height]) => ({ x, y, width, height }));
  const lift = boxes.length - 1;
  const { scale, place } = flatLay(boxes, lift, view);
  const laid = boxes.map((b, i) => ({
    left: place[i][0] + b.x * scale,
    top: place[i][1] + b.y * scale,
    right: place[i][0] + (b.x + b.width) * scale,
    bottom: place[i][1] + (b.y + b.height) * scale,
  }));
  laid.forEach((a, i) => {
    assert.ok(
      a.left >= view.x &&
        a.top >= view.y &&
        a.right <= view.x + view.width &&
        a.bottom <= view.y + view.height,
      `${name}: object ${i} is cut by the cell`
    );
    for (const b of laid.slice(i + 1)) {
      assert.ok(
        a.right <= b.left ||
          b.right <= a.left ||
          a.bottom <= b.top ||
          b.bottom <= a.top,
        `${name}: object ${i} overlaps another`
      );
    }
  });
  // The largest object leads the upper row; the lifted card sits below it.
  assert.ok(laid[lift].top >= laid[0].bottom, `${name}: lift not below`);
  // One size for every drawing that fits; the widest shrinks, never cut.
  if (name === "mash") assert.equal(scale, 1.36);
  else assert.ok(scale < 1.36);
}

console.log("flatLay: ok");
