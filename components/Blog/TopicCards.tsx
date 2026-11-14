import Link from "next/link";

import type { BlogTopic } from "@lib/blogArchive";
import { Arrow } from "@components/common/Site/Arrow";

/**
 * One card per category with published posts, straight from Cosmic: the title
 * as named there, its own description when it has one (else its newest post),
 * and the live count. Renames and new or emptied categories need no edit here.
 */
export function TopicCards({ topics }: { topics: BlogTopic[] }) {
  return (
    <ul className="site-topics">
      {topics.map((topic, index) => (
        <li key={topic.slug} className="site-topic" data-reveal="up">
          <span className="site-note">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="site-topic__title" lang="es">
            {topic.title}
          </h3>
          <p className="site-topic__body" lang="es">
            {topic.description}
          </p>
          <Link
            href={`/blog/category/${topic.slug}`}
            className="site-note site-link site-topic__link"
          >
            {topic.count} {topic.count === 1 ? "entry" : "entries"}{" "}
            <Arrow size="sm" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
