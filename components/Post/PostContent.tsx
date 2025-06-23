"use client";

import Link from "next/link";

import { CommentCount, DiscussionEmbed } from "disqus-react";
import hljs from "highlight.js";
import parse, { domToReact } from "html-react-parser";
import { useEffect } from "react";
import ReactPlayer from "react-player/lazy";

import FriendlyDate from "@components/Blog/FriendlyDate";
import RelatedStories from "@components/Post/RelatedStories";
import {
  ADSENSE_AD_SLOT_ID,
  ADSENSE_PUBLISHER_ID,
  DISQUS_SHORTNAME,
  ENV_NAME,
  canonicalHostnameUrl,
} from "@constants/constants";

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
}: any) {
  const excerptText = excerpt.replace(/(<([^>]+)>)/gi, "");
  const canonicalUrl = `${canonicalHostnameUrl}/blog/posts/${slug}`;
  const escapedCanonicalUrl = encodeURIComponent(canonicalUrl);
  const escapedTitle = encodeURIComponent(title);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    // Initialize Google AdSense
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
          {}
        );
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  useEffect(() => {
    const modal = document.querySelector<HTMLElement>("#modal");
    const modalClose = document.querySelector<HTMLElement>("#modal-close");
    const modalContainer =
      document.querySelector<HTMLElement>("#modal-container");
    const modalOverlay = document.querySelector<HTMLElement>("#modal-overlay");
    const modalVerticalOffset = document.querySelector<HTMLElement>(
      "#modal-vertical-offset"
    );
    const imageLinks = document.querySelectorAll<HTMLElement>(
      ".picasa-image-large, .figure > a"
    );

    imageLinks.forEach((item) => {
      if (modal && modalContainer) {
        item.addEventListener("click", (event) => {
          event.preventDefault();

          const imgUrl = item.getAttribute("href");
          modal.style.backgroundImage = `url('${imgUrl}')`;
          modalContainer.style.display = "block";
        });
      }
    });

    if (modalClose && modalContainer) {
      modalClose.addEventListener("click", (event) => {
        event.preventDefault();

        modalContainer.style.display = "none";
      });
    }

    if (modalOverlay && modalContainer) {
      modalOverlay.addEventListener("click", (event) => {
        event.preventDefault();

        modalContainer.style.display = "none";
      });
    }

    if (modalVerticalOffset && modalContainer) {
      modalVerticalOffset.addEventListener("click", (event) => {
        event.preventDefault();

        modalContainer.style.display = "none";
      });
    }
  }, []);

  const hidrateHtml = (htmlString: any) => {
    const options = {
      replace: ({ attribs, children, name }: any) => {
        if (name === "pre") {
          return (
            <figure className="inline-block align-top w-full">
              <pre className="inline-block align-top w-[98%] my-0 mb-[30px] mx-0 px-[1%] rounded-[5px] post-highlight-pre overflow-auto">
                {domToReact(children, options)}
              </pre>
            </figure>
          );
        }
        if (name === "code") {
          return (
            <code className="post-highlight-code">
              {domToReact(children, options)}
            </code>
          );
        }
        if (name === "blockquote") {
          return (
            <blockquote className="post-blockquote">
              {domToReact(children, options)}
            </blockquote>
          );
        }
        if (name === "p") {
          let hasSpecialChildren = false;
          const specialChildren = [
            "figure",
            "picasa",
            "youtube",
            "soundcloud",
            "svgviewer",
            "pdfviewer",
          ];
          for (const element of children) {
            if (!element?.attribs?.class) continue;
            const classFlag = element.attribs.class.split(" ");
            if (!classFlag.length) continue;

            if (specialChildren.includes(classFlag[0])) {
              hasSpecialChildren = true;
              break;
            }
          }
          return hasSpecialChildren ? (
            <div className="special">{domToReact(children, options)}</div>
          ) : (
            <p className="my-0 mb-[30px]">{domToReact(children, options)}</p>
          );
        }

        if (!attribs?.class) {
          return null;
        }

        const classList = attribs.class.split(" ");

        if (classList.includes("picasa")) {
          if (!children.length || children[0].type !== "text") return <p></p>;
          const imageList = children[0].data.split("\n").filter(Boolean);
          return (
            <div className="inline-block align-top w-full my-[15px] mx-0">
              <ul className="inline-block align-top w-full my-0 mx-0 p-0">
                {imageList.map((img: any, index: any) => (
                  <li
                    key={index}
                    className="float-left list-none w-[16%] mx-[1%] my-[10px] px-[1%] py-[10px] rounded-[5px] post-picasa-image"
                  >
                    <a
                      className="inline-block align-top w-full overflow-hidden rounded-[5px]"
                      href={img}
                    >
                      <img
                        className="inline-block align-top w-full"
                        src={img}
                        alt=""
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (classList.includes("figure")) {
          const highResUrl = attribs["data-figure-href"];
          const lowResUrl = attribs["data-figure-src"];
          return (
            <span
              className={`inline-block align-top post-figure cursor-pointer overflow-hidden rounded-[5px] ${
                classList.includes("figure-100")
                  ? "w-full my-[15px] mx-0 mb-[60px]"
                  : classList.includes("figure-right-40")
                    ? "w-[40%] float-right m-[30px]"
                    : classList.includes("figure-right-30")
                      ? "w-[30%] float-right m-[30px]"
                      : classList.includes("figure-right-20")
                        ? "w-[20%] float-right m-[30px]"
                        : classList.includes("figure-left-40")
                          ? "w-[40%] float-left m-[30px]"
                          : classList.includes("figure-left-30")
                            ? "w-[30%] float-left m-[30px]"
                            : classList.includes("figure-left-20")
                              ? "w-[20%] float-left m-[30px]"
                              : "w-full my-[15px] mx-0 mb-[60px]"
              }`}
              data-figure-src={lowResUrl}
              data-figure-href={highResUrl}
            >
              <a
                href={lowResUrl}
                title={excerptText}
                className="inline-block align-top w-full"
              >
                <figure className="inline-block align-top relative w-full">
                  <CoverImage
                    extraClasses={
                      "inline-block align-top w-full h-auto my-0 mx-0 p-0"
                    }
                    title={excerptText}
                    lowResUrl={lowResUrl}
                    highResUrl={highResUrl}
                  />

                  <figcaption
                    className="block absolute bottom-0 w-[98%] px-[1%] py-[5px] text-base leading-4 text-left text-gray-600 post-figure-caption"
                    dangerouslySetInnerHTML={{ __html: excerpt }}
                  ></figcaption>
                </figure>
              </a>
            </span>
          );
        }

        if (classList.includes("youtube")) {
          const youtubeId = attribs["data-youtube-id"];
          return (
            <span
              className="inline-block relative w-full h-0 pb-[56.25%] rounded-[10px] overflow-hidden"
              data-youtube-id={youtubeId}
            >
              <ReactPlayer
                className="inline-block align-middle absolute w-full h-full top-0 left-0 my-0 mx-0 p-0"
                url={`https://www.youtube.com/watch?v=${youtubeId}`}
                config={{
                  youtube: {
                    playerVars: {
                      rel: 0,
                      autoplay: 0,
                      modestbranding: 1,
                      cc_lang_pref: "en",
                      cc_load_policy: 0,
                      iv_load_policy: 3,
                      controls: 1,
                    },
                    embedOptions: {
                      allowfullscreen: 1,
                      frameborder: 0,
                    },
                  },
                }}
                title={excerptText}
                light={true}
                width="100%"
                height="100%"
              />
            </span>
          );
        }

        if (classList.includes("soundcloud")) {
          const soundcloudUrl = attribs["data-soundcloud-url"];
          return (
            <span
              className="inline-block relative w-full h-0 pb-[16%]"
              data-soundcloud-url={soundcloudUrl}
            >
              <ReactPlayer
                className="inline-block align-middle absolute w-full h-full top-0 left-0 my-0 mx-0 p-0"
                url={soundcloudUrl}
                config={{
                  soundcloud: {
                    options: {
                      color: "ff5500",
                      auto_play: "false",
                      hide_related: "true",
                      show_artwork: "true",
                      single_active: "false",
                      show_user: "false",
                      show_playcount: "false",
                      download: "false",
                      buying: "false",
                      sharing: "false",
                    },
                  },
                }}
                title={excerptText}
                light={true}
                width="100%"
                height="100%"
              />
            </span>
          );
        }

        if (classList.includes("svgviewer")) {
          const svgUrl = attribs["data-svg-url"];

          return (
            <iframe
              className="inline-block align-top w-full h-[600px] my-0 mx-0 p-0"
              src={svgUrl}
            ></iframe>
          );
        }

        if (classList.includes("pdfviewer")) {
          const pdfUrl = attribs["data-pdf-url"];

          return (
            <iframe
              className="inline-block align-top w-full h-[600px] my-0 mx-0 p-0"
              src={pdfUrl}
            ></iframe>
          );
        }

        return null;
      },
    };
    return parse(htmlString, options);
  };

  return (
    <div id="post-content">
      <article
        id={`post-${id}`}
        className="inline-block align-top w-full my-0 mx-0 p-0"
        itemProp="blogPost"
        itemScope={true}
        itemType="http://schema.org/BlogPosting"
      >
        <meta itemProp="image" content={coverImage.url} />

        <span className="inline-block align-top my-[5px] mx-0">
          {categories.map((category: any) => (
            <Link
              href={`/blog/category/${category.slug}`}
              key={category.id}
              title={`List all posts under the category "${category.title}"`}
              rel="tag"
              className="inline-block align-top text-sm uppercase h-[28px] leading-[20px] py-[3px] px-[5px] my-0 mx-[5px] mb-[24px] mr-0 bg-[rgb(210,210,210)] text-[rgb(90,90,90)] rounded-[5px] transition-colors duration-200 ease-in post-category-button"
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
              itemProp="url"
              className="inline-block align-top w-full my-0 mx-0 p-0 no-underline text-black hover:no-underline hover:text-[rgb(77,77,70)]"
            >
              <span
                itemProp="headline"
                className="text-[3.2em] font-extralight leading-4"
              >
                {title}
              </span>
            </Link>
          </h2>
        </header>

        <ul className="inline-block align-top w-full my-[5px] mx-0 p-0">
          <li
            className="float-left w-full my-[5px] mx-0 p-0 text-[rgb(102,102,102)] text-xl font-light leading-4 text-justify"
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></li>

          <li className="float-left w-full my-[5px] mx-0 p-0 text-[rgb(102,102,102)] text-xl font-light leading-4 text-justify">
            by{" "}
            <Link
              href="/portfolio"
              title="About the author"
              itemProp="author"
              className="no-underline text-teal-custom font-normal hover:underline"
            >
              Luis Alejandro
            </Link>
            , on{" "}
            <time className="datetime" dateTime={date} itemProp="dateCreated">
              {" "}
              <FriendlyDate dateString={date} />
            </time>
          </li>

          <li className="float-left w-[12%] text-[rgb(153,153,153)] my-[20px] mx-0">
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

          <li className="float-left w-[52%] lg:w-[70%] h-[70px] my-[20px] mx-0"></li>

          <li className="float-left w-[12%] lg:w-[6%]">
            <a
              href={`http://x.com/intent/tweet?url=${escapedCanonicalUrl}&amp;text=${escapedTitle}&amp;via=@LuisDevelops&amp;related=@LuisAlejandro`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-block align-top w-full h-[60px] my-[25px] mx-0"
            >
              <span className="block w-[60px] h-[60px] my-0 mx-auto bg-[url('/images/sprite.svg')] bg-no-repeat bg-[-300px_-90px] hover:bg-[-300px_-30px]"></span>

              <span className="hidden">Twitter</span>
            </a>
          </li>

          <li className="float-left w-[12%] lg:w-[6%]">
            <a
              href={`http://facebook.com/sharer/sharer.php?u=${escapedCanonicalUrl}`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-block align-top w-full h-[60px] my-[25px] mx-0"
            >
              <span className="block w-[60px] h-[60px] my-0 mx-auto bg-[url('/images/sprite.svg')] bg-no-repeat bg-[-360px_-90px] hover:bg-[-360px_-30px]"></span>

              <span className="hidden">Facebook</span>
            </a>
          </li>

          <li className="float-left w-[12%] lg:w-[6%]">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${escapedCanonicalUrl}`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
              className="inline-block align-top w-full h-[60px] my-[25px] mx-0"
            >
              <span className="block w-[60px] h-[60px] my-0 mx-auto bg-[url('/images/sprite.svg')] bg-no-repeat bg-[-420px_-90px] hover:bg-[-420px_-30px]"></span>

              <span className="hidden">LinkedIn</span>
            </a>
          </li>
        </ul>

        <span
          className="inline-block align-top post-figure cursor-pointer overflow-hidden rounded-[5px] w-full my-[15px] mx-0 mb-[60px]"
          data-figure-src={coverImage.url}
          data-figure-href={coverImage.url}
        >
          <a
            href={coverImage.url}
            title={excerptText}
            className="inline-block align-top w-full"
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
                className="block absolute bottom-0 w-[98%] px-[1%] py-[5px] text-base leading-4 text-left text-gray-600 post-figure-caption"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              ></figcaption>
            </figure>
          </a>
        </span>

        <div
          className="post-content inline-block align-top w-full text-2xl font-light leading-7.5 text-justify break-words"
          itemProp="articleBody"
        >
          {hidrateHtml(content)}
        </div>
      </article>

      {/* Google AdSense Banner Ad */}
      {ADSENSE_PUBLISHER_ID && ADSENSE_AD_SLOT_ID && (
        <div className="inline-block align-top w-full my-12">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              {/* AdSense Responsive Banner */}
              <ins
                className="adsbygoogle block"
                style={{ display: "block" }}
                data-ad-client={ADSENSE_PUBLISHER_ID}
                data-ad-slot={ADSENSE_AD_SLOT_ID}
                data-ad-format="auto"
                data-full-width-responsive="true"
              />
            </div>
          </div>
        </div>
      )}

      {morePosts.length > 0 && (
        <div className="inline-block align-top w-full mt-20">
          <h3 className="text-4xl font-thin leading-4 mt-0 mb-[10px]">
            Other posts
          </h3>
          <RelatedStories posts={morePosts} />
        </div>
      )}

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
