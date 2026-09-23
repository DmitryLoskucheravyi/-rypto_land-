# CRYPTO SPHEERE — landing page

A static, English-language landing page for a crypto trading course. Built with
Next.js (App Router) as a static export and hosted on GitHub Pages. Every call to
action leads to the Telegram channel; there is no backend.

## Architecture

```
app/
├── layout.tsx, page.tsx    page shell, metadata, Schema.org graph
├── robots.ts, sitemap.ts   generated at build time
├── lib/
│   ├── config.ts             public config: site URL, base path, Telegram link, asset()
│   ├── content.ts            UI copy
│   ├── site-data.ts          structured data: levels, roadmap, calculator, comparison
│   ├── structured-data.ts    Schema.org graph built from the same data
│   ├── calculator.ts         income calculator maths
│   ├── format.ts             number formatting
│   ├── charts/               generative charts: polylines, candles, grid routes
│   ├── seeded-random.ts      deterministic PRNG
│   └── motion.ts             shared animation constants
└── components/
    ├── sections/             page sections
    ├── effects/              decorative layers (hero backdrop, cursor, progress)
    ├── ui/                   reusable controls
    └── icons/                SVG icons on a shared base
```

- **Data apart from presentation.** Copy lives in `content.ts`, structured data in
  `site-data.ts`, links and addresses in `config.ts`. Components only render what
  they get from `lib/`.
- **Logic apart from components.** Calculator maths, formatting and chart
  generation are pure functions in `lib/`, covered by tests; components keep only
  state and animation.
- **Deterministic visuals.** Every "market" visual is generated from fixed seeds,
  so the server render and the first client render match byte for byte. No real
  quotes are shown.
- **Build-time config only.** `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_BASE_PATH` are
  read once in `config.ts`. Files from `public/` go through `asset()`, which adds
  the base path GitHub Pages needs for a project site.
- **Zero runtime requests.** A test fails if anything in `app/` calls `fetch`.

## Delivery

`.github/workflows/deploy.yml` runs formatting, type and test checks, builds the
static site with the Pages base path and publishes `out/` to GitHub Pages on every
push to `main`.
