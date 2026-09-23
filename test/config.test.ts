import { describe, expect, it } from 'vitest';
import {
  INSTAGRAM_URL,
  TELEGRAM_URL,
  buildPublicConfig,
  normalizeBasePath,
  withBasePath,
} from '../app/lib/config';

describe('buildPublicConfig', () => {
  it('falls back to localhost and the domain root without an environment', () => {
    expect(buildPublicConfig({})).toEqual({ siteUrl: 'http://localhost:3030', basePath: '' });
  });

  it('treats empty strings as unset', () => {
    expect(buildPublicConfig({ siteUrl: '', basePath: '' })).toEqual(buildPublicConfig({}));
  });

  it('trims the trailing slash from the site address', () => {
    expect(buildPublicConfig({ siteUrl: 'https://user.github.io/repo/' }).siteUrl).toBe(
      'https://user.github.io/repo',
    );
  });
});

describe('base path', () => {
  it('normalizes any spelling to a single leading slash', () => {
    for (const raw of ['repo', '/repo', '/repo/', ' repo/ ']) {
      expect(normalizeBasePath(raw)).toBe('/repo');
    }
    expect(normalizeBasePath(undefined)).toBe('');
  });

  it('prefixes public files', () => {
    expect(withBasePath('/repo', '/logo.png')).toBe('/repo/logo.png');
    expect(withBasePath('', '/logo.png')).toBe('/logo.png');
    expect(withBasePath('/repo', 'logo.png')).toBe('/repo/logo.png');
  });
});

it('every call to action points at the Telegram channel', () => {
  expect(TELEGRAM_URL).toMatch(/^https:\/\/t\.me\/\+/);
});

it('links the project Instagram without share-tracking parameters', () => {
  expect(INSTAGRAM_URL).toBe('https://www.instagram.com/crypt0_spheere/');
});
