"use client";

import { CommentCount } from "disqus-react";
import Link from "next/link";
import {
  AiFillFacebook,
  AiFillHeart,
  AiFillLinkedin,
  AiFillStar,
  AiOutlineRetweet,
  AiOutlineX,
} from "react-icons/ai";

import {
  DISQUS_SHORTNAME,
  ENV_NAME,
  canonicalHostnameUrl,
} from "@constants/constants";
import { trackPixelEvent } from "@lib/pixel";
import FriendlyDate from "./FriendlyDate";

export default function HeroPost({
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
    <div id="featured" className={`flex w-[94%] mx-auto ${className}`}>
      <article className={`${type} w-full p-0 m-0`} id={`post-${id}`}>
        <div className="accent inline-block align-top w-[5%] h-[350px] p-0 m-0 text-[30px] text-white bg-[rgba(0,177,106,0.9)] rounded-l-[5px]">
          <AiFillStar className="m-[5px]" />
        </div>

        <div
          className="bg inline-block align-top w-1/2 h-[350px] p-0 m-0 rounded-none bg-cover bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${coverImage.url})`,
          }}
        >
          <span className="category inline-block align-top mx-[1%] my-[5px]">
            <Link
              href={`/blog/category/${mainCategory.slug}`}
              className="blog-category-button inline-block align-top text-sm uppercase h-[28px] leading-[20px] py-[3px] px-[5px] bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-[5px] transition-colors duration-200 ease-in hover:bg-white active:my-[4px] active:mx-0 active:py-[3px] active:px-[5px]"
              title={`List all posts under the category "${mainCategory.title}"`}
              rel="tag"
            >
              {mainCategory.title}
            </Link>
          </span>

          <ul className="socialbar float-right align-top mx-[1%] my-[5px]">
            <li className="reactions float-left">
              {canonicalUrl && DISQUS_SHORTNAME && ENV_NAME !== "local" && (
                <span className="blog-category-button inline-block align-top text-sm uppercase h-[28px] w-[50px] leading-[20px] py-[3px] pl-[5px] pr-[5px] bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-l-[5px]">
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
                onClick={() =>
                  trackPixelEvent("ClickShare", {
                    location: "frontpage",
                    postId: id,
                  })
                }
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

          <ul className="socialpop blog-socialpop hidden align-top w-[60%] h-[100px] mx-[20%] my-[100px] mb-[80px] px-[5%] py-[20px] bg-[rgb(230,230,230)] rounded-[5px] relative">
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

        <div className="data inline-block align-top w-[45%] p-0 m-0 mb-[20px]">
          <Link
            href={`/blog/posts/${slug}`}
            className="blog-data-container-big inline-block align-top w-full h-[350px] rounded-r-[5px] rounded-l-0 py-[10px] px-[4%] text-[rgb(90,90,90)] bg-[rgb(240,240,240)] transition-colors duration-200 ease-in hover:text-black"
            rel="bookmark"
            title={`Permanent link to "${title}"`}
          >
            <h2 className="header inline-block align-top text-left text-5xl leading-14 font-light">
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
    </div>
  );
}
