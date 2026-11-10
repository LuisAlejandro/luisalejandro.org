import Link from "next/link";
import { format, parseISO } from "date-fns";

import { Reveal } from "@components/common/Site/Reveal";
import { SectionHeader } from "@components/common/Site/SectionHeader";
import { sectionTitles } from "@constants/homepageContent";

type PostItem = {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata?: {
    categories?: Array<{ id?: string; title?: string; slug?: string }>;
  };
};

type BlogSectionProps = {
  posts?: PostItem[];
};

/**
 * 05 — dated rows on the 12-column grid: date, title, pillar. The title slides
 * right and turns accent on hover.
 */
export function BlogSection({ posts = [] }: BlogSectionProps) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="site-section site-wrap">
      <SectionHeader
        num="05"
        label={sectionTitles.blog}
        note={
          <Link href="/blog" className="site-link">
            All posts →
          </Link>
        }
        id="from-the-blog"
      />

      {displayPosts.length === 0 ? (
        <p className="site-note">No published posts yet.</p>
      ) : (
        <Reveal>
          <ul className="site-posts">
            {displayPosts.map((post) => {
              let formattedDate = "";
              try {
                if (post.created_at) {
                  formattedDate = format(
                    parseISO(post.created_at),
                    "dd MMM yyyy"
                  ).toUpperCase();
                }
              } catch {
                formattedDate = "";
              }

              return (
                <li key={post.slug}>
                  <Link href={`/blog/posts/${post.slug}`} className="site-post">
                    {formattedDate ? (
                      <time
                        dateTime={post.created_at}
                        className="site-note site-post__date"
                      >
                        {formattedDate}
                      </time>
                    ) : (
                      <span className="site-post__date" />
                    )}

                    <h3 lang="es" className="site-post__title">
                      {post.title}
                    </h3>

                    {post.metadata?.categories?.[0]?.title && (
                      <span className="site-note site-post__pillar">
                        {post.metadata.categories[0].title}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
