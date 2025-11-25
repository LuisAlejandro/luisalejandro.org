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
      const response = await fetch(`/api/search-posts?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data.response || []);
      setIsSearching(true);
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

  // Determine which posts to display
  const displayPosts = isSearching ? searchResults : posts;
  const heroPost = displayPosts.length > 0 ? displayPosts[0] : null;
  const morePosts = displayPosts.slice(1);

  return (
    <>
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      {isSearching && searchResults.length === 0 && !isLoading && (
        <Section grid overflowVisible oneColumn nopadding wide>
          <div className="w-full text-center py-12">
            <p className="text-lg text-gray-500 font-light">
              No posts found matching &quot;{searchQuery}&quot;
            </p>
          </div>
        </Section>
      )}
      {displayPosts.length > 0 && (
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
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </Section>
        </>
      )}
    </>
  );
}

