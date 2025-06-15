"use client";

import PostPreview from "./PostPreview";

export default function MoreStories({ posts }: any) {
  return (
    <div
      id="content"
      className="grid grid-cols-1 lg:grid-cols-2 gap-[25px] w-[94%] mx-auto"
    >
      {posts.map((post: any) => (
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
  );
}
