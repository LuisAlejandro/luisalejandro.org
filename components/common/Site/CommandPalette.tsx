"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  lockPageScroll,
  scrollToSection,
} from "@components/common/Site/overlayLock";
import { paletteItems, type PaletteItem } from "@constants/siteNavigation";
import { trackPixelEvent } from "@lib/pixel";

type SearchedPost = {
  slug: string;
  title: string;
  metadata?: { categories?: { title?: string }[] };
};

const MIN_SEARCH = 2;
const MAX_POSTS = 8;
const SEARCH_DELAY_MS = 200;
const MAX_QUERY = 128;
const NO_POSTS: PaletteItem[] = [];

export function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  // One record per query: either results or a failure, never both. Keeping them
  // together is what stops a stale error from rendering beside live results.
  const [outcome, setOutcome] = useState<{
    q: string;
    items?: PaletteItem[];
    failed?: true;
  }>();
  const term = query.trim().slice(0, MAX_QUERY);
  const searching = isOpen && term.length >= MIN_SEARCH;
  const current = searching && outcome?.q === term ? outcome : undefined;
  const posts = current?.items ?? NO_POSTS;
  const searchFailed = Boolean(current?.failed);
  const searchPending = searching && !current;

  useEffect(() => {
    if (!searching) return;

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      const deadline = window.setTimeout(() => controller.abort(), 5000);
      try {
        const response = await fetch(
          `/api/search-posts?q=${encodeURIComponent(term)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error(String(response.status));
        const data: { response?: SearchedPost[] } = await response.json();
        setOutcome({
          q: term,
          items: (data.response ?? []).slice(0, MAX_POSTS).map((post) => ({
            id: `post-${post.slug}`,
            label: post.title,
            group: "Posts",
            href: `/blog/posts/${post.slug}`,
            hint: post.metadata?.categories?.[0]?.title,
            hintLang: "es",
            lang: "es",
          })),
        });
      } catch {
        if (!controller.signal.aborted) setOutcome({ q: term, failed: true });
      } finally {
        window.clearTimeout(deadline);
      }
    }, SEARCH_DELAY_MS);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [searching, term]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return paletteItems;

    return [
      ...paletteItems.filter((item) => {
        const matchLabel = item.label.toLowerCase().includes(q);
        const matchHref = item.href.toLowerCase().includes(q);
        const matchHint = item.hint?.toLowerCase().includes(q);
        const matchKeywords = item.keywords?.some((k) =>
          k.toLowerCase().includes(q)
        );
        return matchLabel || matchHref || matchHint || matchKeywords;
      }),
      ...posts,
    ];
  }, [query, posts]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();
    const release = lockPageScroll();

    return () => {
      release();
      lastFocusedElement.current?.focus();
    };
  }, [isOpen]);

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

  const executeItem = (item: PaletteItem) => {
    if (item.pixelEvent) trackPixelEvent(item.pixelEvent);

    closePalette();

    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }

    if (item.href.startsWith("/#")) {
      if (window.location.pathname === "/") {
        scrollToSection(item.href.replace("/#", ""));
        return;
      }
      router.push(item.href);
      return;
    }

    router.push(item.href);
  };

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

  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    listRef.current
      .querySelector<HTMLElement>(`[data-index="${selectedIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex, isOpen]);

  const groupedItems = useMemo(() => {
    const gotoItems = filteredItems.filter((i) => i.group === "Go to");
    const elsewhereItems = filteredItems.filter((i) => i.group === "Elsewhere");
    const postItems = filteredItems.filter((i) => i.group === "Posts");
    const groups: { name: PaletteItem["group"]; items: PaletteItem[] }[] = [];

    if (gotoItems.length > 0) groups.push({ name: "Go to", items: gotoItems });
    if (elsewhereItems.length > 0) {
      groups.push({ name: "Elsewhere", items: elsewhereItems });
    }
    if (postItems.length > 0) groups.push({ name: "Posts", items: postItems });
    return groups;
  }, [filteredItems]);

  const selectedId =
    filteredItems.length > 0
      ? `palette-option-${filteredItems[selectedIndex]?.id}`
      : undefined;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();
        closePalette();
      }}
      onClose={closePalette}
      className="m-auto w-full max-w-xl bg-transparent p-4 text-ink backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
      aria-label="Command Palette"
    >
      <div className="flex w-full flex-col overflow-hidden rounded-xl border border-rule-strong bg-paper-raised shadow-2xl">
        <div className="flex items-center gap-3 border-b border-rule px-4 py-3">
          <span className="site-note rounded border border-rule px-1.5 py-0.5">
            ⌘K
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            maxLength={MAX_QUERY}
            onChange={handleQueryChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or search posts..."
            role="combobox"
            aria-expanded={filteredItems.length > 0}
            aria-controls={
              filteredItems.length > 0 ? "palette-results" : undefined
            }
            aria-autocomplete="list"
            aria-activedescendant={selectedId}
            className="w-full border-none bg-transparent text-step-0 text-ink outline-none placeholder:text-ink-muted focus:ring-0"
          />
          <button
            type="button"
            onClick={closePalette}
            aria-label="Close palette"
            className="site-note cursor-pointer rounded border border-rule px-1.5 py-0.5 hover:border-rule-strong hover:text-ink"
          >
            ESC
          </button>
        </div>

        <div data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            !searchPending &&
            !searchFailed && (
              <div className="p-8 text-center font-site-mono text-step-n1 text-ink-muted">
                No matching results for &ldquo;{query}&rdquo;
              </div>
            )
          ) : (
            // A listbox may only own options and groups, so the outer item is
            // presentational and each inner list is the labelled group.
            <ul
              id="palette-results"
              ref={listRef}
              role="listbox"
              aria-label="Commands"
              className="flex flex-col gap-1"
            >
              {groupedItems.map((group) => (
                <li
                  key={group.name}
                  role="presentation"
                  className="flex flex-col"
                >
                  <div className="site-note px-3 py-1.5" aria-hidden="true">
                    {group.name}
                  </div>
                  <ul
                    role="group"
                    aria-label={group.name}
                    className="flex flex-col gap-0.5"
                  >
                    {group.items.map((item) => {
                      const itemIndex = filteredItems.indexOf(item);
                      const isSelected = itemIndex === selectedIndex;

                      return (
                        <li
                          key={item.id}
                          id={`palette-option-${item.id}`}
                          role="option"
                          aria-selected={isSelected}
                          data-index={itemIndex}
                          onClick={() => executeItem(item)}
                          onMouseEnter={() => setSelectedIndex(itemIndex)}
                          className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 ${
                            isSelected
                              ? "bg-ink font-medium text-paper"
                              : "text-ink hover:bg-rule/40"
                          }`}
                        >
                          <span className="text-step-n1" lang={item.lang}>
                            {item.label}
                          </span>
                          {item.hint && (
                            <span
                              lang={item.hintLang}
                              className={`site-note ${
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
          <p role="status" className="sr-only">
            {searchPending
              ? "Searching posts…"
              : searchFailed
                ? "Post search unavailable"
                : posts.length > 0
                  ? `${posts.length} ${
                      posts.length === 1 ? "post" : "posts"
                    } found`
                  : ""}
          </p>
          {searchFailed && (
            <p className="px-3 py-2 font-site-mono text-step-n1 text-ink-muted">
              Post search unavailable
            </p>
          )}
        </div>
      </div>
    </dialog>
  );
}
