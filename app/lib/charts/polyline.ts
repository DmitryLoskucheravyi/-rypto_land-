import { seededRandom } from '../seeded-random';

// The "price line" polyline for MarketChart: generation and geometry. Pure
// functions — the same seed always yields the same path, so the server render
// and the first client render match byte for byte.

export type Point = [number, number];

export type Polyline = {
  width: number;
  d: string;
  pts: Point[];
  /** Cumulative polyline length at each point. */
  cum: number[];
  length: number;
};

export type WalkParams = {
  seed: number;
  /** Starting height as a fraction of height. */
  baseline: number;
  /** Vertical step amplitude. */
  amp: number;
  width: number;
  height: number;
};

/** A random walk within 8–92% of the height, ~60 points per 2200 units of width. */
export function randomWalk({ seed, baseline, amp, width, height }: WalkParams): Point[] {
  const rand = seededRandom(seed);
  const points = Math.round((width / 2200) * 60);
  let y = height * baseline;
  const pts: Point[] = [];
  for (let i = 0; i <= points; i++) {
    const x = (i / points) * width;
    y += (rand() - 0.5) * amp;
    y = Math.min(height * 0.92, Math.max(height * 0.08, y));
    pts.push([x, y]);
  }
  return pts;
}

export function buildPolyline(pts: Point[], width: number): Polyline {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0];
    const dy = pts[i][1] - pts[i - 1][1];
    cum.push(cum[i - 1] + Math.hypot(dx, dy));
  }
  return {
    width,
    pts,
    cum,
    length: cum[cum.length - 1],
    d: pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
  };
}

/**
 * Where the drawn tip is (in x) once `fraction` of the path's LENGTH has been
 * revealed. The jitter makes length and x diverge, so the cumulative table is
 * read — otherwise the cursor would float ahead of the tip.
 */
export function xAtLengthFraction(g: Polyline, fraction: number): number {
  const target = Math.max(0, Math.min(1, fraction)) * g.length;
  let i = 1;
  while (i < g.cum.length - 1 && g.cum[i] < target) i++;
  const span = g.cum[i] - g.cum[i - 1] || 1;
  const t = (target - g.cum[i - 1]) / span;
  return g.pts[i - 1][0] + (g.pts[i][0] - g.pts[i - 1][0]) * t;
}

/** Line height at x — linear interpolation between neighbouring points. */
export function yAtX(g: Polyline, x: number): number {
  const segments = g.pts.length - 1;
  const raw = (x / g.width) * segments;
  const i = Math.max(0, Math.min(segments - 1, Math.floor(raw)));
  const t = Math.max(0, Math.min(1, raw - i));
  return g.pts[i][1] + (g.pts[i + 1][1] - g.pts[i][1]) * t;
}
