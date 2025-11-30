'use client';

import { useEffect } from 'react';

/**
 * Lazy loads the lazysizes library after component mount
 * to avoid blocking initial page render
 */
export default function LazyImagesLoader() {
  useEffect(() => {
    // Dynamically import lazysizes after initial render
    Promise.all([
      // @ts-ignore - lazysizes doesn't have TypeScript definitions
      import('lazysizes'),
      // @ts-ignore - lazysizes plugin doesn't have TypeScript definitions
      import('lazysizes/plugins/parent-fit/ls.parent-fit')
    ]).catch(err => {
      console.error('Failed to load lazysizes:', err);
    });
  }, []);

  return null;
}

