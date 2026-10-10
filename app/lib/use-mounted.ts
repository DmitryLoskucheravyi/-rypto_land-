'use client';

import { useEffect, useState } from 'react';

// False during the static render and the first client render, true right after.
// Loops that need padding copies of their content (marquees, the endless bento
// track) add them only once this flips, so the HTML that crawlers and text
// parsers read holds every piece of copy exactly once.
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
