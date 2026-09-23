import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom does not implement matchMedia, which both framer-motion's
// useReducedMotion and the course card layout switch rely on.
if (!window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// framer-motion calls IntersectionObserver for whileInView.
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds: readonly number[] = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  } as unknown as typeof window.IntersectionObserver;
}

vi.stubGlobal('scrollTo', () => {});
