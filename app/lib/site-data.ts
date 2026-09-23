// Structured landing data: levels, program stages, calculator, counters,
// comparison, ticker. UI copy lives in content.ts; external links and the site
// address live in config.ts.

export type CourseTier = 'basic' | 'medium' | 'advanced';

// Prices are intentionally not shown on the landing page: pricing and payment
// live in Telegram, so there is nothing here that could drift out of sync.
export type Course = {
  tier: CourseTier;
  title: string;
  description: string;
};

export type RoadmapStage = {
  id: string;
  order: number;
  title: string;
  lessonsCount: number;
  hasTest: boolean;
  summary: string;
  modules: string[];
  imageUrl: string;
};

export type CalculatorTier = { tier: CourseTier; lowPct: number; highPct: number };

export type Calculator = {
  amountMin: number;
  amountMax: number;
  amountStep: number;
  currency: string;
  horizonMonths: number;
  tiers: CalculatorTier[];
  disclaimer: string;
};

export type Counters = {
  studentsTotal: number | null;
  seatsLeft: number | null;
  note: string;
  /** ISO date when the numbers were last confirmed. */
  updatedAt: string | null;
};

export type Comparison = {
  leftTitle: string;
  rightTitle: string;
  rows: Array<{ label: string; left: string; right: string }>;
};

export const courses: Course[] = [
  {
    tier: 'basic',
    title: 'Basic course',
    description:
      'Start from zero: how the crypto market works, exchanges and wallets, first trades without unnecessary risk.',
  },
  {
    tier: 'medium',
    title: 'Intermediate course',
    description:
      'Market analysis: reading charts, liquidity, trading strategies and risk management.',
  },
  {
    tier: 'advanced',
    title: 'Advanced course',
    description:
      'Your own trading system: discipline, reviewing your own trades and portfolio strategies.',
  },
];

export const roadmapStages: RoadmapStage[] = [
  {
    id: 'stage-1',
    order: 1,
    title: 'Introduction to markets',
    lessonsCount: 5,
    hasTest: true,
    summary: 'From zero: how the crypto market works and what drives the price.',
    modules: [
      'What the crypto market is',
      'Participants and liquidity',
      'Spot and derivatives',
      'Risk and capital size',
      'How the course works',
    ],
    imageUrl: '/roadmap-1.png',
  },
  {
    id: 'stage-2',
    order: 2,
    title: 'Exchanges and core mechanics',
    lessonsCount: 4,
    hasTest: true,
    summary: 'Where to trade and how not to lose money on the mechanics.',
    modules: [
      'Choosing an exchange and verification',
      'Wallets and custody',
      'Order types',
      'Fees and slippage',
    ],
    imageUrl: '/roadmap-2.png',
  },
  {
    id: 'stage-3',
    order: 3,
    title: 'Reading the chart',
    lessonsCount: 6,
    hasTest: true,
    summary: 'Read the move instead of guessing it.',
    modules: [
      'Timeframes',
      'Candlestick analysis',
      'Support and resistance levels',
      'Trend and structure',
      'Volume',
      'Breaking down a real move',
    ],
    imageUrl: '/roadmap-3.png',
  },
  {
    id: 'stage-4',
    order: 4,
    title: 'Liquidity',
    lessonsCount: 4,
    hasTest: false,
    summary: 'Why price goes exactly where it hurts the majority.',
    modules: ['Liquidity pools', 'Stop hunts', 'Imbalances', 'Points of interest'],
    imageUrl: '/roadmap-4.png',
  },
  {
    id: 'stage-5',
    order: 5,
    title: 'Trader tools',
    lessonsCount: 4,
    hasTest: false,
    summary: 'Your workspace: what you actually need and what is noise.',
    modules: [
      'TradingView and chart markup',
      'Screeners',
      'Trading journal',
      'Position size calculator',
    ],
    imageUrl: '/roadmap-5.png',
  },
  {
    id: 'stage-6',
    order: 6,
    title: 'System and discipline',
    lessonsCount: 5,
    hasTest: true,
    summary: 'Turning scattered knowledge into a repeatable process.',
    modules: [
      'Trading plan',
      'Risk management',
      'Drawdown psychology',
      'Reviewing your own trades',
      'Pre-entry checklist',
    ],
    imageUrl: '/roadmap-6.png',
  },
];

export const calculator: Calculator = {
  amountMin: 100,
  amountMax: 10000,
  amountStep: 100,
  currency: 'USD',
  horizonMonths: 12,
  tiers: [
    { tier: 'advanced', lowPct: 600, highPct: 1200 },
    { tier: 'medium', lowPct: 330, highPct: 513 },
    { tier: 'basic', lowPct: 145, highPct: 264 },
  ],
  disclaimer:
    'Illustrative calculation using fixed coefficients. It is not financial advice, a forecast or a guarantee of returns. Trading carries a risk of losing capital.',
};

export const counters: Counters = {
  studentsTotal: 240,
  seatsLeft: 10,
  note: 'seats open this week',
  updatedAt: '2026-09-20T21:00:31.518Z',
};

export const comparison: Comparison = {
  leftTitle: 'On your own with YouTube',
  rightTitle: 'The course',
  rows: [
    {
      label: 'Structure',
      left: 'Videos in random order, gaps stay invisible',
      right: 'Stages go in order, each one closes a specific gap',
    },
    {
      label: 'Relevance',
      left: 'Two-year-old videos with dead examples',
      right: 'The program is updated for the current market',
    },
    {
      label: 'Support',
      left: 'Ask in the comments — and hear nothing',
      right: 'A manager in Telegram answers questions on the materials',
    },
    {
      label: 'Practice',
      left: 'Theory with no review of your own trades',
      right: 'Breakdowns of real market situations',
    },
    {
      label: 'Self-check',
      left: 'No way to tell whether you got the topic',
      right: 'Quizzes at the end of stages',
    },
  ],
};

export const ticker: string[] = [
  'Market structure',
  'Liquidity',
  'Candlestick analysis',
  'Risk management',
  'Trading plan',
  'Trading journal',
  'Points of interest',
  'Drawdown psychology',
  'Trade reviews',
  'Quizzes',
];
