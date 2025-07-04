import Link from "next/link";

export default function PostRelated({ title, coverImage, slug }: any) {
  return (
    <li className="py-[5px] px-0 my-[5px] mx-0 mr-[1%] lg:float-left lg:w-[24%] list-none text-gray-600 w-full">
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
        <span className="title inline-block align-top w-[96%] h-[110px] my-[5px] mx-[2%] text-2xl font-light leading-6">
          {title}
        </span>
      </Link>
    </li>
  );
}
