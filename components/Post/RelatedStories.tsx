import PostRelated from "./PostRelated";

export default function RelatedStories({ posts }: any) {
  return (
    <ul
      id="relatedposts"
      className="lg:inline-block align-top w-full my-0 mx-0 mb-[70px] flex flex-col gap-4"
    >
      {posts.map((post: any) => (
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
