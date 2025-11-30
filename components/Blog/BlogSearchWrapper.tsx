"use client";

import { useCallback, useState } from "react";

import HeroPost from "@components/Blog/HeroPost";
import MoreStories from "@components/Blog/MoreStories";
import PostPreview from "@components/Blog/PostPreview";
import { Section } from "@components/common/Layout/Section";
import SearchBar from "./SearchBar";

interface BlogSearchWrapperProps {
  posts: any[];
}

export default function BlogSearchWrapper({ posts }: BlogSearchWrapperProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length === 0) {
      setSearchQuery("");
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsLoading(true);
    setSearchQuery(query);

    try {
      const response = await fetch(
        `/api/search-posts?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      const results = data.response || [];
      setSearchResults(results);
      setIsSearching(true);

      // Track search event with Google Analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "search", {
          search_term: query.trim(),
          results_count: results.length,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setIsSearching(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    if (value.trim().length === 0) {
      setSearchQuery("");
      setSearchResults([]);
      setIsSearching(false);
    }
  }, []);

  // Hero post is always the first post from the static list
  const heroPost = posts.length > 0 ? posts[0] : null;
  const morePosts = posts.slice(1);

  return (
    <>
      <Section grid overflowVisible oneColumn nopadding wide>
        {heroPost && (
          <>
            <HeroPost
              className="hidden lg:flex"
              type="big"
              id={heroPost.id}
              slug={heroPost.slug}
              title={heroPost.title}
              coverImage={heroPost.metadata.hero}
              categories={heroPost.metadata.categories}
              excerpt={heroPost.metadata.teaser}
              date={heroPost.created_at}
            />
            <div
              id="featured-preview"
              className="grid grid-cols-1 lg:hidden gap-[25px] w-[94%] mx-auto"
            >
              <PostPreview
                key={heroPost.id}
                type="preview"
                id={heroPost.id}
                slug={heroPost.slug}
                title={heroPost.title}
                coverImage={heroPost.metadata.hero}
                categories={heroPost.metadata.categories}
                excerpt={heroPost.metadata.teaser}
                date={heroPost.created_at}
              />
            </div>
          </>
        )}
      </Section>

      <Section grid overflowVisible oneColumn nopadding wide>
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSearch={handleSearch}
          isLoading={isLoading}
          results={searchResults}
          isSearching={isSearching}
        />
      </Section>

      <Section grid overflowVisible oneColumn nopadding wide>
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Section>
    </>
  );
}
