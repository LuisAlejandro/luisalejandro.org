import Link from "next/link";

import FriendlyDate from "./FriendlyDate";

export default function PostPreviewMini({
  title,
  date,
  excerpt,
  slug,
  type,
  id,
}: any) {
  return (
    <>
      <article className={`${type} w-full p-0 my-0`} id={`post-${id}`}>
        <div className="data inline-block align-top w-full">
          <Link
            href={`/blog/posts/${slug}`}
            className="blog-data-container inline-block align-top w-full h-[270px] py-[15px] px-[2%] text-[rgb(90,90,90)] bg-[rgb(240,240,240)] rounded-b-[5px] transition-colors duration-200 ease-in hover:text-black shadow-top-none"
            rel="bookmark"
            title={`Permanent link to "${title}"`}
          >
            <h2 className="header inline-block align-top text-left text-3xl leading-8 font-light">
              {title}
            </h2>

            <span
              className="description inline-block align-top w-full text-base font-light my-1"
              dangerouslySetInnerHTML={{ __html: excerpt }}
            ></span>

            <span className="description inline-block align-top w-full text-base font-light my-1">
              Published{" "}
              <time className="datetime" dateTime={date}>
                {" "}
                <FriendlyDate dateString={date} />
              </time>
              .
            </span>
          </Link>
        </div>
      </article>
    </>
  );
}
