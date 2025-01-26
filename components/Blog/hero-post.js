import Link from "next/link";
import { CommentCount } from "disqus-react";
import { AiFillStar } from "react-icons/ai";

import { DISQUS_SHORTNAME, canonicalHostnameUrl } from "@constants/constants";
import Date from "./date";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  slug,
  type,
  id,
  categories,
}) {
  const mainCategory = categories[0];
  const canonicalUrl = `${canonicalHostnameUrl}/blog/posts/${slug}`;
  const escapedCanonicalUrl = encodeURIComponent(canonicalUrl);
  const escapedTitle = encodeURIComponent(title);

  return (
    <div id="featured">
      <article
        className={type}
        id={`post-${id}`}
        itemProp="blogPost"
        itemScope=""
        itemType="http://schema.org/BlogPosting"
      >
        <div className="accent">
          <AiFillStar />
        </div>
        <div
          className="bg"
          style={{
            backgroundImage: `url(${coverImage.url})`,
          }}
        >
          <span className="category">
            <Link legacyBehavior passHref href={`/blog/category/${mainCategory.slug}`}>
              <a
                title={`List all posts under the category "${mainCategory.title}"`}
                rel="tag"
              >
                {mainCategory.title}
              </a>
            </Link>
          </span>
          <ul className="socialbar">
            <li className="reactions">
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
            </li>
            <li className="share">
              <button type="button" data-ident={id}>
                Share
              </button>
            </li>
          </ul>
          <ul className="socialpop">
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
        </div>
        <div className="data">
          <Link legacyBehavior passHref href={`/blog/posts/${slug}`}>
            <a
              rel="bookmark"
              title={`Permanent link to "${title}"`}
              itemProp="url"
            >
              <h2 className="header" itemProp="headline">
                {title}
              </h2>
              <span
                className="description"
                itemProp="description"
                dangerouslySetInnerHTML={{ __html: excerpt }}
              ></span>
              <span className="description" itemProp="description">
                Published{" "}
                <time
                  className="datetime"
                  dateTime={date}
                  itemProp="dateCreated"
                >
                  {" "}
                  <Date dateString={date} />
                </time>
                .
              </span>
            </a>
          </Link>
        </div>
      </article>
    </div>
  );
}
