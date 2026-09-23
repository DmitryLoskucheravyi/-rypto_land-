import { describe, expect, it } from 'vitest';
import { initialAmount, projectIncome, tierRates } from '../app/lib/calculator';
import { buildCandles, nextCandle } from '../app/lib/charts/candles';
import { buildRoute } from '../app/lib/charts/grid-routes';
import { buildPolyline, randomWalk, xAtLengthFraction, yAtX } from '../app/lib/charts/polyline';
import { formatMoney, formatQuote } from '../app/lib/format';
import { seededRandom } from '../app/lib/seeded-random';
import { calculator } from '../app/lib/site-data';

describe('calculator', () => {
  it('starts in the middle of the range', () => {
    expect(initialAmount(calculator)).toBe(
      Math.round((calculator.amountMin + calculator.amountMax) / 2),
    );
  });

  it('computes the total as the investment plus a percentage', () => {
    expect(projectIncome(1000, { tier: 'basic', lowPct: 100, highPct: 250 })).toEqual({
      low: 2000,
      high: 3500,
    });
  });

  it('an unknown level falls back to the first one', () => {
    expect(tierRates(calculator, 'nope' as never)).toBe(calculator.tiers[0]);
  });
});

describe('formatting', () => {
  it('groups thousands', () => {
    expect(formatQuote(64128.4)).toBe('64,128.40');
    expect(formatMoney(5000, 'USD')).toBe('5,000 USD');
  });
});

describe('chart generation', () => {
  it('one seed, one path (no hydration mismatch)', () => {
    const params = { seed: 1337, baseline: 0.6, amp: 60, width: 2200, height: 360 };
    expect(randomWalk(params)).toEqual(randomWalk(params));
    expect(buildCandles(32)).toEqual(buildCandles(32));
  });

  it('the polyline stays in its band and reads back by x', () => {
    const pts = randomWalk({ seed: 1, baseline: 0.5, amp: 80, width: 2200, height: 100 });
    const line = buildPolyline(pts, 2200);

    expect(pts.every(([, y]) => y >= 8 && y <= 92)).toBe(true);
    expect(xAtLengthFraction(line, 0)).toBe(0);
    expect(xAtLengthFraction(line, 1)).toBeCloseTo(2200);
    expect(yAtX(line, 0)).toBe(pts[0][1]);
  });

  it('the next candle opens at the previous close and stays in the band', () => {
    const [first] = buildCandles(1);
    const next = nextCandle(first, seededRandom(1), seededRandom(2));

    expect(next.open).toBe(first.close);
    expect(next.low).toBeGreaterThanOrEqual(0.02);
    expect(next.high).toBeLessThanOrEqual(0.98);
  });

  it('a route follows the grid and stays inside it', () => {
    const grid = { cols: 4, rows: 4, cellW: 10, cellH: 5 };
    const { d } = buildRoute(seededRandom(7), [0, 0], grid);

    for (const [, x, y] of d.matchAll(/[ML](-?\d+),(-?\d+)/g)) {
      expect(Number(x) % 10).toBe(0);
      expect(Number(y) % 5).toBe(0);
      expect(Number(x)).toBeLessThanOrEqual(40);
      expect(Number(y)).toBeLessThanOrEqual(20);
    }
  });
});
