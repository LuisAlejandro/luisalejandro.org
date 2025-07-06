"use client";

import { CommentCount, DiscussionEmbed } from "disqus-react";
import hljs from "highlight.js";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillFacebook, AiFillLinkedin, AiOutlineX } from "react-icons/ai";
import "react-photo-album/rows.css";

import FriendlyDate from "@components/Blog/FriendlyDate";
import RelatedStories from "@components/Post/RelatedStories";
import {
  ADSENSE_AD_SLOT_ID,
  DISQUS_SHORTNAME,
  ENV_NAME,
  canonicalHostnameUrl,
} from "@constants/constants";
import { renderHtmlContent } from "@lib/htmlRenderer";

import AdSenseBanner from "@side-effects/AdSenseBanner";
import CoverImage from "./CoverImage";

export default function PostContent({
  title,
  coverImage,
  date,
  excerpt,
  content,
  slug,
  id,
  categories,
  morePosts,
  allCategories,
}: any) {
  const excerptText = excerpt.replace(/(<([^>]+)>)/gi, "");
  const canonicalUrl = `${canonicalHostnameUrl}/blog/posts/${slug}`;
  const escapedCanonicalUrl = encodeURIComponent(canonicalUrl);
  const escapedTitle = encodeURIComponent(title);
  const [index, setIndex] = useState(-1);

  // highlight just once
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div id="post-content">
      <article
        id={`post-${id}`}
        className="inline-block align-top w-full my-0 mx-0 p-0"
      >
        <span className="inline-block align-top my-[5px] mx-0">
          {categories.map((category: any) => (
            <Link
              href={`/blog/category/${category.slug}`}
              key={category.id}
              title={`List all posts under the category "${category.title}"`}
              rel="tag"
              className="inline-block align-top text-sm uppercase h-[28px] leading-[20px] py-[3px] px-[5px] my-0 mx-[5px] mb-[24px] mr-0 bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-[5px] transition-colors duration-200 ease-in hover:bg-white active:my-[4px] active:mx-0 active:py-[3px] active:px-[5px] post-category-button"
            >
              {category.title}
            </Link>
          ))}
        </span>

        <header className="inline-block align-top w-full my-0 mx-0 p-0">
          <h2 className="inline-block align-top w-full my-0 mx-0 p-0">
            <Link
              href={canonicalUrl}
              rel="bookmark"
              title={`Permanent link to "${title}"`}
              className="inline-block align-top w-full my-0 mx-0 p-0 no-underline text-black hover:no-underline hover:text-[rgb(77,77,70)]"
            >
              <span className="font-normal lg:font-light text-3xl leading-8 md:text-4xl md:leading-12 lg:text-[3.2em] lg:leading-18">
                {title}
              </span>
            </Link>
          </h2>
        </header>

        <ul className="inline-block align-top w-full my-[5px] mx-0 p-0">
          <li
            className="float-left w-full my-[5px] mx-0 p-0 text-[rgb(102,102,102)] text-xl font-light leading-6 text-justify"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></li>

          <li className="float-left w-full my-[5px] mx-0 p-0 text-[rgb(102,102,102)] text-xl font-light leading-6 text-justify">
            by{" "}
            <Link
              href="/portfolio"
              title="About the author"
              className="no-underline text-teal-custom font-normal hover:underline"
            >
              Luis Alejandro
            </Link>
            , on{" "}
            <time className="datetime" dateTime={date}>
              {" "}
              <FriendlyDate dateString={date} />
            </time>
          </li>

          <li className="float-left w-[22%] lg:w-[12%] text-[rgb(153,153,153)] my-[20px] mx-0">
            <span className="inline-block align-top w-full h-[50px] text-5xl leading-[50px] text-center uppercase break-words">
              {canonicalUrl && DISQUS_SHORTNAME && ENV_NAME !== "local" && (
                <CommentCount
                  shortname={DISQUS_SHORTNAME}
                  config={{
                    identifier: id,
                    url: canonicalUrl,
                    title: title,
                  }}
                />
              )}
            </span>

            <span className="inline-block align-top w-full h-[20px] text-xs leading-[20px] text-center uppercase break-words">
              Comments
            </span>
          </li>

          <li className="float-left w-[12%] lg:w-[70%] h-[70px] my-[20px] mx-0"></li>

          <li className="float-left w-[22%] lg:w-[6%]">
            <a
              href={`http://x.com/intent/tweet?url=${escapedCanonicalUrl}&amp;text=${escapedTitle}&amp;via=@LuisDevelops&amp;related=@LuisAlejandro`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-block align-top w-full h-[60px] my-[25px] mx-0"
            >
              <span className="block w-[60px] h-[60px] my-0 mx-auto">
                <AiOutlineX
                  size="60px"
                  className="text-[#00000099] hover:text-[#000000ff] transition-colors duration-200 ease-in"
                />
              </span>
              <span className="hidden">Twitter</span>
            </a>
          </li>

          <li className="float-left w-[22%] lg:w-[6%]">
            <a
              href={`http://facebook.com/sharer/sharer.php?u=${escapedCanonicalUrl}`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-block align-top w-full h-[60px] my-[25px] mx-0"
            >
              <span className="block w-[60px] h-[60px] my-0 mx-auto">
                <AiFillFacebook
                  size="60px"
                  className="text-[#0866FF99] hover:text-[#0866FFff] transition-colors duration-200 ease-in"
                />
              </span>
              <span className="hidden">Facebook</span>
            </a>
          </li>

          <li className="float-left w-[22%] lg:w-[6%]">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${escapedCanonicalUrl}`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-block align-top w-full h-[60px] my-[25px] mx-0"
            >
              <span className="block w-[60px] h-[60px] my-0 mx-auto">
                <AiFillLinkedin
                  size="60px"
                  className="text-[#0a66c299] hover:text-[#0a66c2ff] transition-colors duration-200 ease-in"
                />
              </span>
              <span className="hidden">LinkedIn</span>
            </a>
          </li>
        </ul>

        <div className="post-content inline-block align-top w-full text-2xl font-light leading-10 text-justify break-words">
          <span
            className="inline-block align-top post-figure overflow-hidden rounded-[5px] lg:w-[40%] lg:float-left lg:mr-[60px] w-full my-[15px] mx-0 mb-[60px]"
            data-figure-src={coverImage.url}
            data-figure-href={coverImage.imgix_url}
          >
            <figure className="inline-block align-top relative w-full">
              <CoverImage
                extraClasses={
                  "inline-block align-top w-full h-auto my-0 mx-0 p-0"
                }
                title={excerptText}
                lowResUrl={coverImage.url}
                highResUrl={coverImage.imgix_url}
              />

              <figcaption
                className="hidden lg:block absolute bottom-0 w-full px-[1%] py-[5px] text-base leading-4 text-left text-gray-600 post-figure-caption"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              ></figcaption>
            </figure>
          </span>
          {renderHtmlContent(content, {
            excerptText,
            setIndex,
            index,
            CoverImage,
          })}
        </div>
      </article>

      {/* Google AdSense Banner Ad */}
      {ADSENSE_AD_SLOT_ID && <AdSenseBanner slotId={ADSENSE_AD_SLOT_ID} />}

      {morePosts.length > 0 && (
        <div className="inline-block align-top w-full mt-20">
          <h3 className="text-4xl font-normal lg:font-light leading-4 mt-0 mb-8">
            Other posts
          </h3>
          <RelatedStories posts={morePosts} />
        </div>
      )}

      <div className="inline-block align-top w-full mt-20">
        <h1 className="text-4xl font-normal lg:font-light leading-4 mt-0 mb-8">
          Topics
        </h1>
        <div className="flex flex-wrap justify-start items-start gap-4 w-full mx-auto mb-20">
          {allCategories.map((category: any) => {
            return (
              <span
                key={category.id}
                className="inline-block align-top my-[5px] mx-0"
              >
                <Link
                  href={`/blog/category/${category.slug}`}
                  key={category.id}
                  title={`List all posts under the category "${category.title}"`}
                  rel="tag"
                  className="flex items-center justify-center text-2xl font-normal lg:font-light h-16 leading-5 mb-1 pt-1 px-4 pb-2 text-gray-3 bg-blue-gray rounded-2xl transition-colors duration-400 ease-out hover:bg-blue-gray-light active:pt-1 active:px-4 active:mt-1 active:mb-0 simple-3d-button-gradient"
                >
                  {category.title}
                </Link>
              </span>
            );
          })}
        </div>
      </div>

      <div
        id="comments"
        className="inline-block align-top w-full my-[30px] mx-0"
      >
        {ENV_NAME !== "local" && (
          <DiscussionEmbed
            shortname={DISQUS_SHORTNAME || ""}
            config={{
              identifier: id,
              url: canonicalUrl,
              title: title,
            }}
          />
        )}
      </div>
    </div>
  );
}
