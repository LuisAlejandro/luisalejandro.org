import PostPreview from "./post-preview";

export default function MoreStories({ posts }) {
  return (
    <div id="content">
      {posts.map((post) => (
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
