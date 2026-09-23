// Number formatting for the page — stateless pure functions.

const LOCALE = 'en-US';

/** 12345.6 → "12,346". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat(LOCALE).format(Math.round(value));
}

/** 5000, 'USD' → "5,000 USD". */
export function formatMoney(value: number, currency: string): string {
  return `${formatNumber(value)} ${currency}`;
}

/** Ticker quote: 64128.4 → "64,128.40". */
export function formatQuote(value: number): string {
  return value.toLocaleString(LOCALE, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
