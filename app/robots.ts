import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/config';

// Next writes /robots.txt into out/ at build time — no server endpoint needed.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Never block Next chunks: without JS and CSS Google renders the page
      // broken and ranks it lower. Only the internal RSC dump, which duplicates
      // the page text, is disallowed.
      disallow: ['/index.txt'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
