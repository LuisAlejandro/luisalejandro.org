"use client";

import { CommentCount } from "disqus-react";
import Link from "next/link";

import {
  DISQUS_SHORTNAME,
  ENV_NAME,
  canonicalHostnameUrl,
} from "@constants/constants";
import {
  AiFillFacebook,
  AiFillHeart,
  AiFillLinkedin,
  AiOutlineRetweet,
  AiOutlineX,
} from "react-icons/ai";
import FriendlyDate from "./FriendlyDate";

export default function PostPreview({
  className,
  title,
  coverImage,
  date,
  excerpt,
  slug,
  type,
  id,
  categories,
}: any) {
  const mainCategory = categories[0];
  const canonicalUrl = `${canonicalHostnameUrl}/blog/posts/${slug}`;
  const escapedCanonicalUrl = encodeURIComponent(canonicalUrl);
  const escapedTitle = encodeURIComponent(title);

  return (
    <>
      <article
        className={`${type} w-full p-0 my-[5px] mb-[20px] ${className}`}
        id={`post-${id}`}
      >
        <div
          className="bg inline-block align-top w-full h-[300px] sm:h-[250px] md:h-[270px] lg:h-[350px] bg-cover bg-no-repeat bg-center rounded-t-[5px] blog-post-bg"
          style={{
            backgroundImage: `url(${coverImage.url})`,
          }}
        >
          <span className="category inline-block align-top mx-[2%] my-[5px]">
            <Link
              href={`/blog/category/${mainCategory.slug}`}
              className="blog-category-button inline-block align-top text-sm uppercase h-[28px] leading-[20px] py-[3px] px-[5px] bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-[5px] transition-colors duration-200 ease-in hover:bg-white active:my-[4px] active:mx-0 active:py-[3px] active:px-[5px]"
              title={`List all posts under the category "${mainCategory.title}"`}
              rel="tag"
            >
              {mainCategory.title}
            </Link>
          </span>

          <ul className="socialbar float-right align-top mx-[2%] my-[5px]">
            <li className="reactions float-left">
              {canonicalUrl && DISQUS_SHORTNAME && ENV_NAME !== "local" && (
                <span className="blog-category-button inline-block align-top text-sm uppercase h-[28px] leading-[20px] py-[3px] pl-[5px] pr-[5px] bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-l-[5px]">
                  <AiFillHeart
                    size={20}
                    className="m-0 mr-[5px] inline-block align-top"
                  />
                  <CommentCount
                    shortname={DISQUS_SHORTNAME}
                    config={{
                      identifier: id,
                      url: canonicalUrl,
                      title: title,
                    }}
                  />
                </span>
              )}
            </li>

            <li className="share float-left">
              <button
                type="button"
                data-ident={id}
                className="blog-category-button inline-block align-top text-sm uppercase h-[28px] leading-[20px] my-0 mb-[4px] ml-0 py-[3px] pl-[5px] pr-[5px] bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-r-[5px] transition-colors duration-200 ease-in hover:bg-white active:my-[4px] active:ml-0 active:py-[3px] active:pl-[5px] active:pr-[5px]"
              >
                <AiOutlineRetweet
                  size={20}
                  className="m-0 mr-[5px] inline-block align-top"
                />
                Share
              </button>
            </li>
          </ul>

          <ul className="socialpop blog-socialpop hidden align-top w-[80%] lg:w-[60%] h-[100px] mx-[10%] lg:mx-[20%] my-[60px] lg:my-[100px] mb-[80px] px-[5%] py-[20px] bg-[rgb(230,230,230)] rounded-[5px] relative">
            <li className="twitter float-left w-[31.333%] mx-[1%]">
              <a
                href={`http://x.com/intent/tweet?url=${escapedCanonicalUrl}&amp;text=${escapedTitle}&amp;via=@LuisDevelops&amp;related=@LuisAlejandro`}
                title="(opens in new window)"
                target="_blank"
                rel="nofollow noreferrer"
                className="inline-block align-top w-full text-center"
              >
                <span className="inline-block align-top w-[60px] h-[60px]">
                  <AiOutlineX
                    size="60px"
                    className="text-[#00000099] hover:text-[#000000ff] transition-colors duration-200 ease-in"
                  />
                </span>
                <span className="hide hidden">Twitter</span>
              </a>
            </li>

            <li className="facebook float-left w-[31.333%] mx-[1%]">
              <a
                href={`http://facebook.com/sharer/sharer.php?u=${escapedCanonicalUrl}`}
                title="(opens in new window)"
                target="_blank"
                rel="nofollow noreferrer"
                className="inline-block align-top w-full text-center"
              >
                <span className="inline-block align-top w-[60px] h-[60px]">
                  <AiFillFacebook
                    size="60px"
                    className="text-[#0866FF99] hover:text-[#0866FFff] transition-colors duration-200 ease-in"
                  />
                </span>
                <span className="hide hidden">Facebook</span>
              </a>
            </li>

            <li className="linkedin float-left w-[31.333%] mx-[1%]">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${escapedCanonicalUrl}`}
                title="(opens in new window)"
                target="_blank"
                rel="nofollow noreferrer"
                className="inline-block align-top w-full text-center"
              >
                <span className="inline-block align-top w-[60px] h-[60px]">
                  <AiFillLinkedin
                    size="60px"
                    className="text-[#0a66c299] hover:text-[#0a66c2ff] transition-colors duration-200 ease-in"
                  />
                </span>
                <span className="hide hidden">LinkedIn</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="data inline-block align-top w-full">
          <Link
            href={`/blog/posts/${slug}`}
            className="blog-data-container inline-block align-top w-full h-[300px] sm:h-[250px] md:h-[270px] lg:h-[350px] py-[15px] px-[2%] text-[rgb(90,90,90)] bg-[rgb(240,240,240)] rounded-b-[5px] transition-colors duration-200 ease-in hover:text-black"
            rel="bookmark"
            title={`Permanent link to "${title}"`}
          >
            <h2 className="header inline-block align-top text-left text-3xl leading-8 md:text-4xl md:leading-12 lg:text-5xl lg:leading-14 font-thin">
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
