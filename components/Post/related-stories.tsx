import PostRelated from "./post-related";

export default function RelatedStories({ posts }) {
  return (
    <ul id="relatedposts">
      {posts.map((post) => (
        <PostRelated
          key={post.slug}
          title={post.title}
          coverImage={post.metadata.hero}
          date={post.created_at}
          id={post.id}
          categories={post.metadata.categories}
          slug={post.slug}
          excerpt={post.metadata.teaser}
          type="preview"
        />
      ))}
    </ul>
  );
}
