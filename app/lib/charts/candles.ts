import { seededRandom } from '../seeded-random';

// Candle series for the hero backdrop. Values are fractions of the chart
// height (0…1); the component converts them to pixels. Pure functions: the
// series is fully determined by its seeds.

export type Candle = {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  bull: boolean;
};

const easeInOutSine = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;
const easeInCubic = (x: number) => x * x * x;

/** The story of the series: a dip to the middle, then a sharp rally. */
export function baseline(t: number): number {
  if (t < 0.5) {
    return 0.7 - 0.52 * easeInOutSine(t / 0.5);
  }
  return 0.16 + 0.82 * easeInCubic((t - 0.5) / 0.5);
}

/**
 * Chaotic but always present volume: a noisy floor every bar clears, a random
 * body and occasional spikes.
 */
export function volumeAt(vrand: () => number, delta: number): number {
  const noise = vrand();
  let v = 0.28 + noise * 0.4 + Math.abs(delta) * 0.9;
  if (vrand() > 0.78) v += 0.2 + vrand() * 0.24; // spike
  if (vrand() > 0.88) v *= 0.6; // sudden lull
  return Math.min(0.95, Math.max(0.2, v));
}

/** Initial series of `count` candles along the baseline. */
export function buildCandles(count: number): Candle[] {
  const rand = seededRandom(42);
  // A separate stream for volume — otherwise it mirrors the price and the
  // quiet stretches render as an empty floor.
  const vrand = seededRandom(90210);
  const candles: Candle[] = [];

  for (let i = 0; i < count; i++) {
    const t0 = i / count;
    const t1 = (i + 1) / count;
    const b0 = baseline(t0) + (rand() - 0.5) * 0.06;
    const b1 = baseline(t1) + (rand() - 0.5) * 0.06;
    const bodyTop = Math.max(b0, b1);
    const bodyBottom = Math.min(b0, b1);
    const wick = 0.025 + rand() * 0.06;
    candles.push({
      open: b0,
      close: b1,
      high: Math.min(0.98, bodyTop + wick * (0.5 + rand())),
      low: Math.max(0.02, bodyBottom - wick * (0.5 + rand())),
      volume: volumeAt(vrand, b1 - b0),
      bull: b1 >= b0,
    });
  }
  return candles;
}

/**
 * The next candle continues from the last close with a mild pull towards the
 * middle of the band, so the series wanders without drifting off screen.
 */
export function nextCandle(prev: Candle, rand: () => number, vrand: () => number): Candle {
  const open = prev.close;
  const close = Math.min(0.94, Math.max(0.1, open + (rand() - 0.5) * 0.22 + (0.52 - open) * 0.08));
  const wick = 0.025 + rand() * 0.06;
  return {
    open,
    close,
    high: Math.min(0.98, Math.max(open, close) + wick * (0.5 + rand())),
    low: Math.max(0.02, Math.min(open, close) - wick * (0.5 + rand())),
    volume: volumeAt(vrand, close - open),
    bull: close >= open,
  };
}

export const candleMid = (c: Candle) => (c.open + c.close) / 2;
