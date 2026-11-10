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
    categories?: Array<{ title?: string; name?: string } | string>;
  };
};

type BlogSectionProps = {
  posts?: PostItem[];
};

export function BlogSection({ posts = [] }: BlogSectionProps) {
  const displayPosts = posts.slice(0, 3);

  return (
    <section className="px-gutter py-16 lg:py-24 border-b border-rule">
      <SectionHeader
        num="05"
        label={sectionTitles.blog}
        note={
          <Link
            href="/blog"
            className="site-note text-[0.75rem] text-ink hover:text-signal transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>All posts</span>
            <span>→</span>
          </Link>
        }
        id="from-the-blog"
      />

      {displayPosts.length === 0 ? (
        <div className="py-8 site-note text-ink-muted">
          No published posts yet.
        </div>
      ) : (
        <Reveal>
          <div className="flex flex-col divide-y divide-rule/60">
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

              const mainCat = post.metadata?.categories?.[0];
              const categoryLabel =
                typeof mainCat === "string"
                  ? mainCat
                  : mainCat?.title || mainCat?.name;

              return (
                <article key={post.slug} className="group py-6 first:pt-0">
                  <Link
                    href={`/blog/posts/${post.slug}`}
                    className="flex flex-col md:flex-row md:items-baseline justify-between gap-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                      {formattedDate && (
                        <time
                          dateTime={post.created_at}
                          className="site-note text-[0.7rem] text-ink-muted w-28 flex-shrink-0"
                        >
                          {formattedDate}
                        </time>
                      )}
                      <h3
                        lang="es"
                        className="text-step-1 lg:text-step-2 font-medium text-ink group-hover:text-signal transition-colors tracking-tight"
                      >
                        {post.title}
                      </h3>
                    </div>

                    {categoryLabel && (
                      <span className="site-note text-[0.7rem] px-2.5 py-0.5 rounded border border-rule text-ink-muted group-hover:border-rule-strong group-hover:text-ink transition-colors flex-shrink-0 self-start md:self-auto">
                        {categoryLabel}
                      </span>
                    )}
                  </Link>
                </article>
              );
            })}
          </div>
        </Reveal>
      )}
    </section>
  );
}
