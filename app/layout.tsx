import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Unbounded } from 'next/font/google';
import './globals.css';
import { MotionConfig } from 'framer-motion';
import { SmoothScroll } from './components/smooth-scroll';
import { CrosshairCursor } from './components/effects/crosshair-cursor';
import { ScrollProgress } from './components/effects/scroll-progress';
import { SITE_URL } from './lib/config';
import { buildStructuredData } from './lib/structured-data';

// Display face for headings: heavy and wide.
const display = Unbounded({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

// The key phrase goes first: search results and browser tabs cut the tail, and
// losing the brand at the end hurts less than losing the topic.
// The same string is used for og:title, twitter:title and the WebPage name.
const TITLE = 'Crypto Trading Course — Learn from Zero | CRYPTO SPHEERE';
const DESCRIPTION =
  'Basic, intermediate and advanced crypto trading courses. Join our Telegram channel, pick your level and get the materials right after payment.';

export const metadata: Metadata = {
  // Origin only: Next adds basePath to metadata file URLs (og:image, icons) by
  // itself, so a base including the path would double it.
  metadataBase: new URL(new URL(SITE_URL).origin),
  title: TITLE,
  description: DESCRIPTION,
  // One page is reachable at many addresses at once: with and without a
  // trailing slash, with utm tails from ads. Canonical folds them into one.
  alternates: { canonical: `${SITE_URL}/` },
  applicationName: 'CRYPTO SPHEERE',
  authors: [{ name: 'CRYPTO SPHEERE' }],
  creator: 'CRYPTO SPHEERE',
  publisher: 'CRYPTO SPHEERE',
  category: 'education',
  // There are no phone numbers on the page, but Safari eagerly turns the
  // calculator and counter digits into links — switch that off.
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Without this Google shows a tiny preview and truncates the description.
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/`,
    siteName: 'CRYPTO SPHEERE',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

// viewport-fit=cover so the 100dvh hero fills the screen under the iPhone
// notch; zooming is intentionally not disabled.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0B0B0D',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable}`}>
      <body>
        {/* Schema.org graph. It sits in the body rather than <head>: crawlers do
            not care, and here it does not delay the first paint. */}
        <script
          type="application/ld+json"
          // Our own static data — a serialization of content.ts; no user input
          // ever reaches it.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildStructuredData(TITLE, DESCRIPTION)).replace(
              /</g,
              '\\u003c',
            ),
          }}
        />
        <ScrollProgress />
        <CrosshairCursor />
        <MotionConfig reducedMotion="user">
          <SmoothScroll>{children}</SmoothScroll>
        </MotionConfig>
        {/* Grain sits above the sections but below the cursor, and never
            takes pointer events. */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
