/** A box in the sheet's user units; the DOMRect from getBBox() is one. */
export type Box = { x: number; y: number; width: number; height: number };

/** Every drawing gets this size, unless its objects would not fit the cell. */
const SCALE = 1.36;
const GUTTER = 44;
/** The top margin clears the cell number; a tall drawing may spend some of it. */
const MARGIN = { top: 120, right: 70, bottom: 60, left: 70 };
/** The least a drawing keeps from the cell edge. */
const PAD = 30;

/**
 * The work grid's flat lay: a drawing's objects set square to the cell, at
 * one scale, in two centred rows with even gutters, so nothing is cut and
 * every cell keeps the same rhythm. The largest object leads the upper row
 * and the lifted card takes the middle of the lower one. Returns the shared
 * scale and, for each box, where its origin goes.
 */
export function flatLay(boxes: Box[], lift: number, view: Box) {
  const ids = boxes.map((_, i) => i);
  const area = (i: number) => boxes[i].width * boxes[i].height;
  const hero = ids.reduce((a, i) => (area(i) > area(a) ? i : a));
  const rest = ids.filter((i) => i !== hero);
  const sumW = (row: number[]) => row.reduce((w, i) => w + boxes[i].width, 0);
  const maxH = (row: number[]) => Math.max(...row.map((i) => boxes[i].height));
  const roomW = view.width - MARGIN.left - MARGIN.right;
  const roomH = view.height - MARGIN.top - MARGIN.bottom;

  // Every split of the rest between the two rows: the largest scale that
  // fits wins, then the least spill into the margins, then the evenest rows.
  let best = { score: -Infinity, upper: [hero], lower: rest, scale: SCALE };
  for (let mask = 0; mask < 1 << rest.length; mask++) {
    const upper = [hero, ...rest.filter((_, k) => mask & (1 << k))];
    const lower = rest.filter((_, k) => !(mask & (1 << k)));
    if (!lower.length) continue;
    const tall = maxH(upper) + maxH(lower);
    const scale = Math.min(
      SCALE,
      (roomW - GUTTER * (upper.length - 1)) / sumW(upper),
      (roomW - GUTTER * (lower.length - 1)) / sumW(lower),
      (view.height - 2 * PAD - GUTTER) / tall
    );
    const spill = Math.max(0, tall * scale + GUTTER - roomH);
    const score =
      scale * 100 -
      spill / 100 -
      Math.abs(sumW(upper) - sumW(lower)) / 4000 +
      (lower.includes(lift) ? 0.03 : 0);
    if (score > best.score) best = { score, upper, lower, scale };
  }

  const { upper, lower, scale } = best;
  if (lower.includes(lift)) {
    lower.splice(lower.indexOf(lift), 1);
    lower.splice(lower.length >> 1, 0, lift);
  }
  // Centred between the margins; a block taller than that room spends the
  // margins in proportion, so the cell number keeps the larger share.
  const block = (maxH(upper) + maxH(lower)) * scale + GUTTER;
  const top =
    view.y +
    (block <= roomH
      ? MARGIN.top + (roomH - block) / 2
      : ((view.height - block) * MARGIN.top) / (MARGIN.top + MARGIN.bottom));
  const channel = top + maxH(upper) * scale;
  const place: [number, number][] = [];
  const lay = (row: number[], edge: number, down: boolean) => {
    const rowH = maxH(row) * scale;
    const rowW = sumW(row) * scale + GUTTER * (row.length - 1);
    let x = view.x + MARGIN.left + (roomW - rowW) / 2;
    for (const i of row) {
      const { x: bx, y: by, width, height } = boxes[i];
      // Edges meet at the channel between the rows; a thin object (a pen)
      // floats in the middle of its row instead.
      const y =
        height * scale < rowH * 0.35
          ? edge + (down ? rowH : -rowH) / 2 - (by + height / 2) * scale
          : down
            ? edge - by * scale
            : edge - (by + height) * scale;
      place[i] = [x - bx * scale, y];
      x += width * scale + GUTTER;
    }
  };
  lay(upper, channel, false);
  lay(lower, channel + GUTTER, true);
  return { scale, place };
}
