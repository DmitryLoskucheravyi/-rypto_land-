import type { MetadataRoute } from 'next';
import { SITE_URL } from './lib/config';

export const dynamic = 'force-static';

// The landing is a single page, so the sitemap lists just that page. The point
// is not size: the crawler gets the canonical address with the right host.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
