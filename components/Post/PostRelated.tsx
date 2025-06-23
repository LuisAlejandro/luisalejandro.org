import Link from "next/link";

export default function PostRelated({ title, coverImage, slug }: any) {
  return (
    <li className="float-left py-[5px] px-0 my-[5px] mx-0 mr-[1%] w-[24%] list-none text-gray-600">
      <Link
        href={`/blog/posts/${slug}`}
        title={title}
        rel="bookmark"
        className="inline-block align-top w-full rounded-[5px] overflow-hidden post-related-item hover:no-underline"
      >
        <span
          className="thumbnail inline-block align-top w-full h-[130px] bg-cover"
          style={{
            backgroundImage: `url(${coverImage.url})`,
          }}
        ></span>
        <span className="title inline-block align-top w-[98%] h-[110px] my-[5px] mx-[1%] text-2xl font-light leading-4">
          {title}
        </span>
      </Link>
    </li>
  );
}
