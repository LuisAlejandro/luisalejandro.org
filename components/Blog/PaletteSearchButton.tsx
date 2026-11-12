"use client";

import { openPalette } from "@components/common/Site/overlayLock";

/** Opens the site command palette, where posts are searchable from any page. */
export function PaletteSearchButton() {
  return (
    <button type="button" className="site-btn" onClick={openPalette}>
      <span>Search posts</span>
      <kbd className="site-btn__kbd">⌘K</kbd>
    </button>
  );
}
