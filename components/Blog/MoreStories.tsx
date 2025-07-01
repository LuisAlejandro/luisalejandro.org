"use client";

import { useEffect, useRef, useState } from "react";
import PostPreview from "./PostPreview";
import PostPreviewMini from "./PostPreviewMini";

export default function MoreStories({ posts }: any) {
  const [visiblePostsCount, setVisiblePostsCount] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const firstSixPosts = posts.slice(0, 6);
  const remainingPosts = posts.slice(6);
  const postsToShow = remainingPosts.slice(0, visiblePostsCount);
  const hasMorePosts = remainingPosts.length > visiblePostsCount;

  useEffect(() => {
    // Only run intersection observer in the browser
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMorePosts && !isLoading) {
          setIsLoading(true);
          // Add a small delay to simulate loading and prevent rapid firing
          setTimeout(() => {
            setVisiblePostsCount((prev) => prev + 9);
            setIsLoading(false);
          }, 500);
        }
      },
      {
        rootMargin: "100px", // Trigger 100px before the sentinel comes into view
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMorePosts, isLoading]);

  return (
    <>
      {/* First 6 posts with PostPreview */}
      <div
        id="content"
        className="grid grid-cols-1 lg:grid-cols-2 gap-[25px] w-[94%] mx-auto"
      >
        {firstSixPosts.map((post: any) => (
          <PostPreview
            key={post.id}
            type="preview"
            id={post.id}
            slug={post.slug}
            title={post.title}
            coverImage={post.metadata.hero}
            categories={post.metadata.categories}
            excerpt={post.metadata.teaser}
            date={post.created_at}
          />
        ))}
      </div>

      {/* Remaining posts with PostPreviewMini */}
      {remainingPosts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px] w-[94%] mx-auto mt-[50px]">
            {postsToShow.map((post: any) => (
              <PostPreviewMini
                key={post.id}
                type="preview-mini"
                id={post.id}
                slug={post.slug}
                title={post.title}
                excerpt={post.metadata.teaser}
                date={post.created_at}
              />
            ))}
          </div>

          {/* Loading indicator and sentinel */}
          {hasMorePosts && (
            <>
              {isLoading && (
                <div className="flex justify-center w-[94%] mx-auto mt-[30px]">
                  <div className="text-[rgb(90,90,90)] text-base font-medium">
                    Loading more posts...
                  </div>
                </div>
              )}
              <div ref={sentinelRef} className="h-[20px] w-full" />
            </>
          )}
        </>
      )}
    </>
  );
}
