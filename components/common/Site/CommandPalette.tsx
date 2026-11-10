"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { paletteItems, type PaletteItem } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // Filtered items
  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;

    return paletteItems.filter((item) => {
      const matchLabel = item.label.toLowerCase().includes(q);
      const matchHref = item.href.toLowerCase().includes(q);
      const matchHint = item.hint?.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) =>
        k.toLowerCase().includes(q)
      );
      return matchLabel || matchHref || matchHint || matchKeywords;
    });
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const openPalette = () => {
    lastFocusedElement.current = document.activeElement as HTMLElement;
    setQuery("");
    setSelectedIndex(0);
    setIsOpen(true);
  };

  const closePalette = () => {
    setIsOpen(false);
  };

  // Sync open state with native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = "";
      lastFocusedElement.current?.focus();
    }
  }, [isOpen]);

  // Global keyboard shortcut (⌘K / Ctrl+K) and custom event
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isOpen) {
          closePalette();
        } else {
          openPalette();
        }
      }
    };

    const handleCustomOpen = () => {
      openPalette();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("site:open-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("site:open-palette", handleCustomOpen);
    };
  }, [isOpen]);

  // Execute selected item
  const executeItem = (item: PaletteItem) => {
    if (item.pixelEvent) {
      trackPixelEvent(item.pixelEvent);
    }

    closePalette();

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.href.startsWith("/#")) {
      const hash = item.href.replace("/#", "");
      if (window.location.pathname === "/") {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `#${hash}`);
          return;
        }
      }
      router.push(item.href);
      return;
    }

    router.push(item.href);
  };

  // Keyboard navigation within palette
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (filteredItems.length === 0) return;
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (filteredItems.length === 0) return;
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? filteredItems.length - 1 : prev - 1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (filteredItems.length > 0 && filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      closePalette();
    }
  };

  // Auto-scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.querySelector<HTMLElement>(
      `[data-index="${selectedIndex}"]`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Group items
  const groupedItems = useMemo(() => {
    const groups: { name: "Go to" | "Elsewhere"; items: PaletteItem[] }[] = [];
    const gotoItems = filteredItems.filter((i) => i.group === "Go to");
    const elsewhereItems = filteredItems.filter((i) => i.group === "Elsewhere");

    if (gotoItems.length > 0) {
      groups.push({ name: "Go to", items: gotoItems });
    }
    if (elsewhereItems.length > 0) {
      groups.push({ name: "Elsewhere", items: elsewhereItems });
    }
    return groups;
  }, [filteredItems]);

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        closePalette();
      }}
      className="backdrop:bg-black/70 backdrop:backdrop-blur-sm bg-transparent p-4 w-full max-w-xl m-auto fixed inset-0 z-50 overflow-visible open:flex open:flex-col items-center"
      aria-label="Command Palette"
    >
      <div className="w-full bg-paper-raised border border-rule-strong rounded-xl shadow-2xl overflow-hidden flex flex-col text-ink">
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-rule px-4 py-3 gap-3">
          <span className="site-note text-[0.7rem] px-1.5 py-0.5 rounded border border-rule">
            ⌘K
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-step-0 text-ink placeholder:text-ink-muted outline-none border-none focus:ring-0"
            aria-autocomplete="list"
            aria-controls="palette-results"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close palette"
            className="site-note text-[0.7rem] px-1.5 py-0.5 rounded border border-rule hover:border-rule-strong hover:text-ink cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-ink-muted font-site-mono text-step-n1">
              No matching results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <ul
              id="palette-results"
              ref={listRef}
              role="listbox"
              className="flex flex-col gap-1"
            >
              {groupedItems.map((group) => (
                <li key={group.name} className="flex flex-col">
                  <div className="site-note px-3 py-1.5 text-[0.7rem]">
                    {group.name}
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {group.items.map((item) => {
                      const itemIndex = filteredItems.indexOf(item);
                      const isSelected = itemIndex === selectedIndex;

                      return (
                        <li
                          key={item.id}
                          role="option"
                          aria-selected={isSelected}
                          data-index={itemIndex}
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-ink text-paper font-medium"
                              : "text-ink hover:bg-rule/40"
                          }`}
                        >
                          <span className="text-step-n1">{item.label}</span>
                          {item.hint && (
                            <span
                              className={`site-note text-[0.7rem] ${
                                isSelected ? "text-paper/70" : "text-ink-muted"
                              }`}
                            >
                              {item.hint}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </dialog>
  );
}
