"use client";

import SearchResultItem from "@components/Blog/SearchResultItem";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { MAX_SEARCH_QUERY_LENGTH } from "@lib/searchQuery";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  value: string;
  onChange: (_value: string) => void;
  onSearch: (_query: string) => void;
  isLoading?: boolean;
  results?: any[];
  isSearching?: boolean;
  searchError?: string | null;
}

const searchWebMcp = {
  toolname: "searchBlogPosts",
  tooldescription:
    'Read-only blog search by query string (max 128 chars). Submit the form or type to search via GET /api/search-posts?q=. Returns {"response":[...]} on success; 400 {"error":"Query too long"} when over limit.',
} as Record<string, string>;

export default function SearchBar({
  value,
  onChange,
  onSearch,
  isLoading = false,
  results = [],
  isSearching = false,
  searchError = null,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Keep local input in sync when parent clears search state.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- controlled reset from BlogSearchWrapper
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer for debounced search
    debounceTimerRef.current = setTimeout(() => {
      if (localValue.trim().length > 0) {
        onSearch(localValue.trim());
      } else {
        onSearch("");
      }
    }, 400);

    // Cleanup function
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [localValue, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue("");
    onChange("");
    onSearch("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    const trimmed = localValue.trim();
    if (trimmed.length > 0) {
      onSearch(trimmed);
    } else {
      onSearch("");
    }
  };

  const hasResults = isSearching && results.length > 0;
  const showNoResults =
    isSearching &&
    results.length === 0 &&
    localValue.trim().length > 0 &&
    !isLoading &&
    !searchError;
  const showSearchError = isSearching && Boolean(searchError) && !isLoading;

  return (
    <div className="w-[94%] mx-auto mb-6">
      <form
        role="search"
        className="bg-[#f0f0f0] rounded-lg overflow-hidden transition-all duration-300 shadow-[inset_0_0_0_1px_rgb(190,190,190)]"
        onSubmit={handleSubmit}
        {...searchWebMcp}
      >
        <div className="relative p-4">
          <label htmlFor="blog-search" className="sr-only">
            Search blog posts
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
              <AiOutlineSearch
                className="text-gray-400"
                size={24}
                aria-hidden="true"
              />
            </div>
            <input
              id="blog-search"
              name="q"
              type="search"
              value={localValue}
              onChange={handleChange}
              placeholder="Search posts by title, content, or category..."
              maxLength={MAX_SEARCH_QUERY_LENGTH}
              className="block w-full pl-12 pr-10 py-4 text-lg leading-normal font-main font-light rounded-md bg-white border-transparent focus:outline-none focus:shadow-[0_0_0_2px_rgb(0,177,106),0_0_0_6px_rgba(0,177,106,0.3)] transition-shadow duration-200"
              aria-label="Search blog posts"
              {...({
                toolparamdescription:
                  "Search query for blog posts by title, content, or category (maps to GET /api/search-posts?q=).",
              } as Record<string, string>)}
            />
            {localValue.length > 0 && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
                aria-label="Clear search"
              >
                <AiOutlineClose size={20} aria-hidden="true" />
              </button>
            )}
            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none z-10">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {(hasResults || showNoResults || showSearchError) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4">
                {showSearchError && (
                  <div className="text-center py-8 text-red-600 font-light text-lg">
                    {searchError}
                  </div>
                )}

                {showNoResults && (
                  <div className="text-center py-8 text-gray-500 font-light text-lg">
                    No posts found matching &quot;{localValue}&quot;
                  </div>
                )}

                {hasResults && (
                  <div className="grid grid-cols-1 gap-4">
                    {results.map((post) => (
                      <SearchResultItem
                        key={post.id}
                        slug={post.slug}
                        title={post.title}
                        excerpt={post.metadata.teaser}
                        date={post.created_at}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
