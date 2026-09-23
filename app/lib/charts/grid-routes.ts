// Routes for the "charges" running along the hero background grid. The grid
// is a CSS background of rectangular cells; a route follows their borders.

export type Grid = { cols: number; rows: number; cellW: number; cellH: number };

/**
 * A random walk along cell edges that never doubles back: every move is a
 * turn, so the charge goes around the rectangles instead of running one long
 * line. Returns the SVG path and its length in pixels.
 */
export function buildRoute(
  rand: () => number,
  start: [number, number],
  grid: Grid,
): { d: string; length: number } {
  let [col, row] = start;
  const pts: [number, number][] = [[col, row]];
  let axis = rand() < 0.5 ? 0 : 1; // 0 = horizontal, 1 = vertical
  let length = 0;

  const moves = 3 + Math.floor(rand() * 3);
  for (let i = 0; i < moves; i++) {
    const step = (rand() < 0.65 ? 1 : 2) * (rand() < 0.5 ? -1 : 1);
    if (axis === 0) {
      col = Math.min(grid.cols, Math.max(0, col + step));
    } else {
      row = Math.min(grid.rows, Math.max(0, row + step));
    }
    const prev = pts[pts.length - 1];
    if (col === prev[0] && row === prev[1]) continue; // clamped flat against an edge
    length +=
      axis === 0 ? Math.abs(col - prev[0]) * grid.cellW : Math.abs(row - prev[1]) * grid.cellH;
    pts.push([col, row]);
    axis = axis === 0 ? 1 : 0;
  }

  const d = pts
    .map(([c, r], i) => `${i === 0 ? 'M' : 'L'}${c * grid.cellW},${r * grid.cellH}`)
    .join(' ');
  return { d, length };
}
