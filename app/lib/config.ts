// Public configuration of the landing page — the only module that reads the
// environment. Everything is baked into the static build.
//
// Variables are read below as literal process.env.NEXT_PUBLIC_* accesses:
// that is the only form Next inlines into the client bundle.

/** Every call to action on the page leads here. */
export const TELEGRAM_URL = 'https://t.me/+mTBMA3ObGEI3YmMy';

export const INSTAGRAM_HANDLE = 'crypt0_spheere';
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export type PublicConfig = Readonly<{
  /** Public site address without a trailing slash (canonical, sitemap, og:image). */
  siteUrl: string;
  /** Sub-path the site is served from, e.g. "/repo" on GitHub Pages; "" at a domain root. */
  basePath: string;
}>;

export type RawPublicEnv = { siteUrl?: string; basePath?: string };

// The localhost fallback is deliberate: everything works locally, and a
// forgotten variable is plainly visible in <link rel="canonical"> and sitemap.xml.
const DEFAULT_SITE_URL = 'http://localhost:3030';

/** "repo", "/repo/" and "/repo" all become "/repo"; empty stays empty. */
export function normalizeBasePath(raw: string | undefined): string {
  const trimmed = (raw ?? '').trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}` : '';
}

/** Empty strings count as unset. */
export function buildPublicConfig(env: RawPublicEnv): PublicConfig {
  return {
    siteUrl: (env.siteUrl?.trim() || DEFAULT_SITE_URL).replace(/\/+$/, ''),
    basePath: normalizeBasePath(env.basePath),
  };
}

/** Prefixes a root-relative public file path with the base path. */
export function withBasePath(basePath: string, file: string): string {
  return `${basePath}${file.startsWith('/') ? file : `/${file}`}`;
}

export const config: PublicConfig = buildPublicConfig({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
});

export const SITE_URL = config.siteUrl;

/**
 * URL of a file from public/. next/image, <img> and inline styles do not add
 * basePath on their own in a static export, so every asset goes through here.
 */
export const asset = (file: string) => withBasePath(config.basePath, file);
