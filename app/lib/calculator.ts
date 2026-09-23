import type { Calculator, CalculatorTier, CourseTier } from './site-data';

// Income calculator logic, kept apart from the markup: the component only
// holds the slider and selected level; the numbers are computed here.

export type IncomeRange = { low: number; high: number };

/** Initial slider value — the middle of the range. */
export function initialAmount(calc: Calculator): number {
  return Math.round((calc.amountMin + calc.amountMax) / 2);
}

/** Rates for a level; an unknown level falls back to the first one. */
export function tierRates(calc: Calculator, tier: CourseTier): CalculatorTier {
  return calc.tiers.find((t) => t.tier === tier) ?? calc.tiers[0];
}

/** Total over the horizon: the investment plus a percentage of it. */
export function projectIncome(amount: number, rates: CalculatorTier): IncomeRange {
  return {
    low: amount * (1 + rates.lowPct / 100),
    high: amount * (1 + rates.highPct / 100),
  };
}
