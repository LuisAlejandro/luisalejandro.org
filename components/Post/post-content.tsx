import Link from "next/link";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import parse, { domToReact } from "html-react-parser";
import ReactPlayer from "react-player/lazy";
import { DiscussionEmbed, CommentCount } from "disqus-react";

import { DISQUS_SHORTNAME, canonicalHostnameUrl } from "@constants/constants";
import RelatedStories from "@components/Post/related-stories";
import Date from "@components/Blog/date";

import ExtraContent from "./ExtraContent/ExtraContent";
import CoverImage from "./cover-image";

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
}) {
  const excerptText = excerpt.replace( /(<([^>]+)>)/ig, '');
  const canonicalUrl = `${canonicalHostnameUrl}/blog/posts/${slug}`;
  const escapedCanonicalUrl = encodeURIComponent(canonicalUrl);
  const escapedTitle = encodeURIComponent(title);

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    const modal = document.querySelector("#modal");
    const modalClose = document.querySelector("#modal-close");
    const modalContainer = document.querySelector("#modal-container");
    const modalOverlay = document.querySelector("#modal-overlay");
    const modalVerticalOffset = document.querySelector(
      "#modal-vertical-offset"
    );
    const imageLinks = document.querySelectorAll(
      ".picasa-image-large, .figure > a"
    );

    imageLinks.forEach((item) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const imgUrl = item.getAttribute("href");
        modal.style.backgroundImage = `url('${imgUrl}')`;
        modalContainer.style.display = "block";
      });
    });

    modalClose.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.style.display = "none";
    });

    modalOverlay.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.style.display = "none";
    });

    modalVerticalOffset.addEventListener("click", (event) => {
      event.preventDefault();
      modalContainer.style.display = "none";
    });
  }, []);

  const hidrateHtml = (htmlString) => {
    const options = {
      replace: ({ attribs, children, name }) => {
        if (name === "pre") {
          return (
            <figure className="highlight">
              <pre>{domToReact(children, options)}</pre>
            </figure>
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
            <p>{domToReact(children, options)}</p>
          );
        }

        if (!attribs?.class) {
          return;
        }

        const classList = attribs.class.split(" ");

        if (classList.includes("picasa")) {
          if (!children.length || !children[0].type === "text") return <p></p>;
          const imageList = children[0].data.split("\n").filter(Boolean);
          return (
            <div className="picasa">
              <ul className="picasa-album">
                {imageList.map((img, index) => (
                  <li key={index} className="picasa-image">
                    <a className="picasa-image-large" href={img}>
                      <img className="picasa-image-thumb" src={img} />
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
              className={attribs.class}
              data-figure-src={lowResUrl}
              data-figure-href={highResUrl}
            >
              <a href={lowResUrl} title={excerptText}>
                <figure className="figure-container">
                  <CoverImage
                    extraClasses={"image"}
                    title={excerptText}
                    lowResUrl={lowResUrl}
                    highResUrl={highResUrl}
                  />
                  <figcaption
                    className="caption"
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
            <span className={attribs.class} data-youtube-id={youtubeId}>
              <ReactPlayer
                className="player"
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
            <span className={attribs.class} data-soundcloud-url={soundcloudUrl}>
              <ReactPlayer
                className="player"
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
          return <iframe className="svgviewer" src={svgUrl}></iframe>;
        }

        if (classList.includes("pdfviewer")) {
          const pdfUrl = attribs["data-pdf-url"];
          return <iframe className="pdfviewer" src={pdfUrl}></iframe>;
        }
      },
    };
    return parse(htmlString, options);
  };

  return (
    <div id="post-content">
      <article
        id={`post-${id}`}
        className="post"
        itemProp="blogPost"
        itemScope=""
        itemType="http://schema.org/BlogPosting"
      >
        <meta itemProp="image" content={coverImage.url} />
        <span className="categories">
          {categories.map((category) => (
            <Link legacyBehavior
              passHref
              href={`/blog/category/${category.slug}`}
              key={category.id}
            >
              <a
                title={`List all posts under the category "${category.title}"`}
                rel="tag"
              >
                {category.title}
              </a>
            </Link>
          ))}
        </span>
        <header className="header">
          <h2>
            <Link legacyBehavior passHref href={canonicalUrl}>
              <a
                rel="bookmark"
                title={`Permanent link to "${title}"`}
                itemProp="url"
              >
                <span itemProp="headline">{title}</span>
              </a>
            </Link>
          </h2>
        </header>
        <ul className="social">
          <li
            className="description"
            itemProp="description"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></li>
          <li className="description">
            by{" "}
            <Link legacyBehavior passHref href="/portfolio">
              <a title="About the author" itemProp="author">
                Luis Alejandro
              </a>
            </Link>
            , on{" "}
            <time className="datetime" dateTime={date} itemProp="dateCreated">
              {" "}
              <Date dateString={date} />
            </time>
          </li>
          <li className="comments">
            <span className="n_comments">
              {canonicalUrl && (
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
            <span className="t_comments">Comments</span>
          </li>
          <li className="espacio"></li>
          <li className="twitter">
            <a
              href={`http://twitter.com/intent/tweet?url=${escapedCanonicalUrl}&amp;text=${escapedTitle}&amp;via=@LuisDevelops&amp;related=@LuisAlejandro`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <span className="sprite"></span>
              <span className="hide">Twitter</span>
            </a>
          </li>
          <li className="facebook">
            <a
              href={`http://facebook.com/sharer/sharer.php?u=${escapedCanonicalUrl}`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <span className="sprite"></span>
              <span className="hide">Facebook</span>
            </a>
          </li>
          <li className="linkedin">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${escapedCanonicalUrl}`}
              title="(opens in new window)"
              target="_blank"
              rel="nofollow noreferrer"
            >
              <span className="sprite"></span>
              <span className="hide">LinkedIn</span>
            </a>
          </li>
        </ul>
        <span
          className="figure figure-100"
          data-figure-src={coverImage.url}
          data-figure-href={coverImage.url}
        >
          <a href={coverImage.url} title={excerptText}>
            <figure className="figure-container">
              <CoverImage
                extraClasses={"image"}
                title={excerptText}
                lowResUrl={coverImage.url}
                highResUrl={coverImage.imgix_url}
              />
              <figcaption
                className="caption"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              ></figcaption>
            </figure>
          </a>
        </span>
        <div className="text" itemProp="articleBody">
          {hidrateHtml(content)}
        </div>
      </article>
      <div className="meta">
        <h3>Other posts</h3>
        {morePosts.length > 0 && <RelatedStories posts={morePosts} />}
      </div>
      <ExtraContent />
      <div id="comments">
        <DiscussionEmbed
          shortname={DISQUS_SHORTNAME}
          config={{
            identifier: id,
            url: canonicalUrl,
            title: title,
          }}
        />
      </div>
    </div>
  );
}
