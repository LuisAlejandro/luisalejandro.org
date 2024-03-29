import Link from "next/link";

export default function PostRelated({
  title,
  coverImage,
  slug,
}) {
  return (
    <li>
      <Link passHref href={`/blog/posts/${slug}`}>
        <a title={title} rel="bookmark">
          <span
            className="thumbnail"
            style={{
              backgroundImage: `url(${coverImage.url})`,
            }}
          ></span>
          <span className="title">{title}</span>
        </a>
      </Link>
    </li>
  );
}
