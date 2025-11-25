"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
  isLoading = false,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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

  return (
    <div className="relative w-full lg:max-w-[80%] mx-auto px-8 lg:px-0 mb-6">
      <label htmlFor="blog-search" className="sr-only">
        Search blog posts
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch
            className="text-gray-400"
            size={20}
            aria-hidden="true"
          />
        </div>
        <input
          id="blog-search"
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search posts by title, content, or category..."
          className="block w-full pl-10 pr-10 py-3 text-lg leading-normal font-main font-light rounded-xl bg-white border-transparent focus:bg-white focus:ring-2 focus:ring-neutral-300 focus:border-neutral-400"
          aria-label="Search blog posts"
        />
        {localValue.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <AiOutlineClose size={20} aria-hidden="true" />
          </button>
        )}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400"></div>
          </div>
        )}
      </div>
    </div>
  );
}

