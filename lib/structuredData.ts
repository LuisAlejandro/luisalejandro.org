import {
  config,
  experience,
  SITE_PROFILE_DATE_CREATED,
  SITE_PROFILE_DATE_MODIFIED,
} from "@constants/constants";
import type { CosmicPost } from "@lib/blogArchive";
import { plainTeaser, stripHtmlToPlainText } from "@lib/plainText";

import { portfolioDescription, portfolioProjects } from "@lib/portfolio";

/** The one canonical @id for the site's Person entity. */
const PERSON_ID = `${config.url}/#Person`;

/**
 * dateModified only when the post was genuinely revised. Emitting a copy of
 * datePublished tells crawlers nothing and hides real updates.
 */
export function modifiedDate(post: {
  created_at?: string;
  modified_at?: string;
}): string | undefined {
  const created = post.created_at ? new Date(post.created_at).getTime() : NaN;
  const modified = post.modified_at
    ? new Date(post.modified_at).getTime()
    : NaN;

  if (Number.isNaN(modified)) return undefined;
  if (!Number.isNaN(created) && modified <= created) return undefined;
  return post.modified_at;
}

function buildPersonNode(personUrl: string) {
  return {
    "@type": "Person",
    "@id": `${config.url}/#Person`,
    name: config.author.name,
    givenName: config.author.first_name,
    familyName: config.author.last_name,
    url: personUrl,
    image: {
      "@type": "ImageObject",
      "@id": `${config.url}/images/me.svg`,
      url: `${config.url}/images/me.svg`,
    },
    jobTitle: "Full Stack AI Engineer",
    description: `${config.author.first_name} is a Venezuelan full stack AI engineer with more than ${experience} years of experience in TypeScript, Python, Go, AI agents and LLM integration, open source, CI/CD, and remote software development.`,
    email: `mailto:${config.author.email}`,
    nationality: {
      "@type": "Country",
      name: "Venezuela",
    },
    homeLocation: {
      "@type": "Place",
      name: "Venezuela",
    },
    knowsAbout: [
      "Software engineering",
      "Full stack development",
      "TypeScript",
      "Python",
      "Go",
      "Next.js",
      "Docker",
      "Open source",
      "CI/CD",
      "Remote work",
    ],
    sameAs: [
      `https://github.com/${config.author.github}`,
      `https://x.com/${config.author.twitter}`,
      "https://www.linkedin.com/in/martinezfaneyth",
    ],
  };
}

export function generateHomepageJsonLd() {
  const personId = `${config.url}/#Person`;
  const websiteId = `${config.url}/#WebSite`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(config.url),
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: config.url,
        name: config.name,
        description: config.description,
        publisher: {
          "@id": personId,
        },
        about: {
          "@id": personId,
        },
        inLanguage: ["en", "es"],
      },
      {
        "@type": "ProfilePage",
        "@id": `${config.url}/#ProfilePage`,
        url: config.url,
        name: `${config.author.first_name} - Full Stack AI Engineer`,
        description: config.description,
        dateCreated: SITE_PROFILE_DATE_CREATED,
        dateModified: SITE_PROFILE_DATE_MODIFIED,
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
      },
    ],
  };
}

/**
 * The about page is the person's own record: a ProfilePage whose main entity is
 * the site's single Person node, with the same @id the home page uses.
 */
export function generateAboutJsonLd() {
  const aboutUrl = `${config.url}/about`;
  const personId = `${config.url}/#Person`;
  const websiteId = `${config.url}/#WebSite`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(aboutUrl),
      {
        "@type": "ProfilePage",
        "@id": `${aboutUrl}#ProfilePage`,
        url: aboutUrl,
        name: `About | ${config.author.first_name}`,
        description: `Career, principles and toolbox of ${config.author.first_name}, a Venezuelan full-stack AI engineer with ${experience} years of remote product work.`,
        dateCreated: SITE_PROFILE_DATE_CREATED,
        dateModified: SITE_PROFILE_DATE_MODIFIED,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

export function generatePortfolioJsonLd() {
  const portfolioUrl = `${config.url}/portfolio`;
  const personId = `${config.url}/#Person`;
  const websiteId = `${config.url}/#WebSite`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(config.url),
      {
        "@type": "CollectionPage",
        "@id": `${portfolioUrl}#CollectionPage`,
        url: portfolioUrl,
        name: `Project Archive | ${config.author.first_name}`,
        description: portfolioDescription,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: { "@id": `${portfolioUrl}#Projects` },
      },
      {
        "@type": "ItemList",
        "@id": `${portfolioUrl}#Projects`,
        name: "Project Archive",
        description: portfolioDescription,
        numberOfItems: portfolioProjects.length,
        itemListElement: portfolioProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.name,
            description: project.shortDescription,
            url: `${config.url}/portfolio/${project.slug}`,
            image: `${config.url}${project.images.thumbnail}`,
            keywords: project.tags.join(", "),
          },
        })),
      },
    ],
  };
}

/** A visible FAQ as FAQPage; `path` is the page it sits on (home by default). */
export function generateHomepageFaqJsonLd(
  faqItems: { question: string; answer: string }[],
  path = "/"
) {
  if (!faqItems || faqItems.length === 0) {
    return null;
  }
  return {
    "@context": "https://schema.org/",
    "@type": "FAQPage",
    "@id": `${config.url}${path}#FAQPage`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** JSON-LD reads the post exactly as Cosmic returns it. */
type BlogPost = CosmicPost;

/** Absolute URL for a hero that may be an object, a path or an absolute URL. */
function heroUrl(
  hero: NonNullable<CosmicPost["metadata"]>["hero"]
): string | undefined {
  const raw = typeof hero === "string" ? hero : hero?.imgix_url || hero?.url;
  if (!raw) return undefined;
  return raw.startsWith("http") ? raw : `${config.url}${raw}`;
}

const categoryNames = (post: BlogPost): string[] =>
  (post.metadata?.categories ?? [])
    .map((category) =>
      typeof category === "string" ? category : category?.title
    )
    .filter((name): name is string => Boolean(name));

/** Schema descriptions want prose, so markdown is stripped, not truncated. */
const description = (teaser?: string) =>
  plainTeaser(teaser || "").substring(0, 160);

export function generateBlogJsonLd(posts: BlogPost[]) {
  const blogPosts = posts.map((post) => {
    const blogPost: any = {
      "@type": "BlogPosting",
      "@id": `${config.url}/blog/posts/${post.slug}`,
      mainEntityOfPage: `${config.url}/blog/posts/${post.slug}`,
      headline: post.title,
      name: post.title,
      description: description(post.metadata?.teaser),
      datePublished: post.created_at,
      ...(modifiedDate(post) ? { dateModified: modifiedDate(post) } : {}),
      inLanguage: "es",
      author: {
        "@type": "Person",
        "@id": PERSON_ID,
        name: config.author.name,
        url: `${config.url}/portfolio`,
      },
      url: `${config.url}/blog/posts/${post.slug}`,
      keywords: categoryNames(post),
    };

    const image = heroUrl(post.metadata?.hero);
    if (image) {
      blogPost.image = { "@type": "ImageObject", "@id": image, url: image };
    }

    return blogPost;
  });

  return {
    "@context": "https://schema.org/",
    "@type": "Blog",
    "@id": `${config.url}/blog`,
    mainEntityOfPage: `${config.url}/blog`,
    inLanguage: "es",
    name: "Luis Alejandro - Software Development & Remote Work Insights",
    description:
      "Software development blog by Venezuelan engineer. TypeScript, Python, Golang tutorials. Remote work tips, open source insights & tech discoveries.",
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: config.author.name,
      url: `${config.url}/portfolio`,
    },
    blogPost: blogPosts,
  };
}

export function generateBlogPostingJsonLd(post: BlogPost) {
  const blogPosting: any = {
    "@context": "https://schema.org/",
    "@type": "BlogPosting",
    "@id": `${config.url}/blog/posts/${post.slug}/#BlogPosting`,
    mainEntityOfPage: `${config.url}/blog/posts/${post.slug}`,
    headline: post.title,
    name: post.title,
    description: description(post.metadata?.teaser),
    datePublished: post.created_at,
    ...(modifiedDate(post) ? { dateModified: modifiedDate(post) } : {}),
    inLanguage: "es",
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: config.author.name,
      url: config.url,
      image: {
        "@type": "ImageObject",
        "@id": `${config.url}/images/me.svg`,
        url: `${config.url}/images/me.svg`,
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": `${config.url}/#Organization`,
      name: config.author.name,
      logo: {
        "@type": "ImageObject",
        "@id": `${config.url}/images/logo.svg`,
        url: `${config.url}/images/logo.svg`,
      },
    },
    url: `${config.url}/blog/posts/${post.slug}`,
    isPartOf: {
      "@type": "Blog",
      "@id": `${config.url}/blog/#Blog`,
      name: "Luis Alejandro - Software Development & Remote Work Insights",
      publisher: {
        "@type": "Organization",
        "@id": `${config.url}/#Organization`,
        name: config.author.name,
      },
    },
    about: categoryNames(post).map((name) => ({ "@type": "Thing", name })),
    keywords: categoryNames(post),
  };

  const image = heroUrl(post.metadata?.hero);
  if (image) {
    blogPosting.image = { "@type": "ImageObject", "@id": image, url: image };
  }

  // Emit a FAQPage node in the post's @graph when it carries structured FAQs
  if (post.metadata?.faqs && post.metadata.faqs.length > 0) {
    const faqPage = {
      "@type": "FAQPage",
      "@id": `${config.url}/blog/posts/${post.slug}/#FAQPage`,
      mainEntity: post.metadata.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
    return {
      "@context": "https://schema.org/",
      "@graph": [blogPosting, faqPage],
    };
  }

  return blogPosting;
}
