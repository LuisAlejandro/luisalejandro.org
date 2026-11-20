import { Metadata } from "next";

import { ADSENSE_PUBLISHER_ID, config } from "@constants/constants";
import { getPost, getPublishedPostForTwin } from "@lib/api";
import { PAPER, SITE_NAME } from "@lib/metadata";
import { plainTeaser, truncateAtWord } from "@lib/plainText";

import "@styles/tailwind.css";

interface PostLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

// Generate comprehensive SEO metadata for individual blog posts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found | Blog de Luis Alejandro",
      description:
        "El post solicitado no pudo ser encontrado. Explora otros insights de desarrollo de software en el blog de Luis Alejandro.",
    };
  }

  // Clean and optimize description (word boundary, surrogate-safe)
  const rawDescription = plainTeaser(post.metadata?.teaser || "");
  const optimizedDescription = truncateAtWord(rawDescription, 160);

  // Generate SEO-optimized title
  const postTitle = post.title;
  const seoTitle =
    postTitle.length > 60
      ? `${truncateAtWord(postTitle, 57)} | Blog de Luis Alejandro`
      : `${postTitle} | Blog de Luis Alejandro`;

  // Extract categories for keywords
  const categories = post.metadata?.categories || [];
  const categoryKeywords = categories
    .map((cat: any) => cat.title?.toLowerCase() || "")
    .filter(Boolean);

  // Create comprehensive keyword list
  const baseKeywords = [
    "software development",
    "programming tutorial",
    "TypeScript",
    "Python",
    "Golang",
    "full stack development",
    "remote work",
    "web development",
    "software engineering",
    "coding tutorial",
    "developer insights",
    "Venezuelan developer",
    "Latin American developer",
    "open source",
    "technical blog",
    "programming blog",
    "software architect",
    "backend development",
    "frontend development",
    "DevOps",
  ];

  const allKeywords = [...new Set([...categoryKeywords, ...baseKeywords])];

  // Create canonical URL
  const canonicalUrl = `${config.url}/blog/posts/${slug}`;

  // Generate article schema-friendly publication date
  const publishedDate = new Date(post.created_at);
  const publishedISO = publishedDate.toISOString();

  const publishedTwin = await getPublishedPostForTwin(slug);

  const feedAlternates = {
    "application/rss+xml": [
      {
        url: `${config.url}/blog/posts/feed.xml`,
        title: "Luis Alejandro Blog RSS Feed",
      },
    ],
    "application/atom+xml": [
      {
        url: `${config.url}/blog/posts/atom.xml`,
        title: "Luis Alejandro Blog Atom Feed",
      },
    ],
    "application/feed+json": [
      {
        url: `${config.url}/blog/posts/feed.json`,
        title: "Luis Alejandro Blog JSON Feed",
      },
    ],
    "application/xml": [
      {
        url: `${config.url}/sitemap.xml`,
        title: "Sitemap",
      },
    ],
    ...(publishedTwin
      ? {
          "text/markdown": [
            {
              url: `/blog/posts/${slug}.md`,
              title: "Markdown twin",
            },
          ],
        }
      : {}),
  };

  return {
    title: seoTitle,
    description: optimizedDescription,
    keywords: allKeywords,
    authors: [
      {
        name: config.author.name,
        url: `${config.url}/portfolio`,
      },
    ],
    creator: config.author.name,
    generator: config.generator,
    applicationName: config.app_name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // og:image comes from ./opengraph-image.tsx, and X falls back to it, so
    // neither preview format names an image here.
    openGraph: {
      title: seoTitle,
      description: optimizedDescription,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "es_VE",
      type: "article",
      publishedTime: publishedISO,
      modifiedTime: publishedISO,
      authors: [config.author.name],
      section:
        categories.length > 0
          ? categories[0].title || "Software Development"
          : "Software Development",
      tags: categories.map((cat: any) => cat.title).filter(Boolean),
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: optimizedDescription,
      site: `@${config.blog.twitter}`,
      creator: `@${config.author.twitter}`,
    },
    alternates: {
      canonical: canonicalUrl,
      types: feedAlternates,
    },
    other: {
      // Google AdSense verification
      "google-adsense-account": ADSENSE_PUBLISHER_ID || "",

      // Sitemap reference
      sitemap: `${config.url}/sitemap.xml`,

      // Article-specific Dublin Core metadata
      "dcterms.title": postTitle,
      "dcterms.description": optimizedDescription,
      "dcterms.language": "es",
      "dcterms.type": "Text",
      "dcterms.format": "text/html",
      "dcterms.identifier": canonicalUrl,
      "dcterms.source": `${config.url}/blog`,
      "dcterms.creator": config.author.name,
      "dcterms.publisher": config.author.name,
      "dcterms.date": publishedISO,
      "dcterms.created": publishedISO,
      "dcterms.modified": publishedISO,
      "dcterms.subject": categories
        .map((cat: any) => cat.title)
        .filter(Boolean)
        .join(", "),
      "dcterms.audience":
        "software developers, programmers, technical professionals",
      "dcterms.coverage": "global",
      "dcterms.rights": `© ${publishedDate.getFullYear()} ${config.author.name}. All rights reserved.`,

      // Enhanced SEO metadata
      "article:author": config.author.name,
      "article:published_time": publishedISO,
      "article:modified_time": publishedISO,
      "article:section":
        categories.length > 0
          ? categories[0].title || "Software Development"
          : "Software Development",
      "article:tag": categories
        .map((cat: any) => cat.title)
        .filter(Boolean)
        .join(", "),

      // Microsoft Application metadata
      "msapplication-starturl": canonicalUrl,
      "msapplication-tooltip": postTitle,
      "msapplication-window": "width=1024;height=768",
      "msapplication-task": `name=${postTitle};action-uri=${canonicalUrl};icon-uri=${config.url}/favicon/favicon.ico`,
      "msapplication-TileImage": `${config.url}/favicon/mstile-144x144.png`,
      "msapplication-TileColor": PAPER,
      "msapplication-config": `${config.url}/favicon/browserconfig.xml`,

      // Schema.org JSON-LD reference
      "schema-org": "BlogPosting",

      // Content categorization
      "content-type": "blog-post",
      "content-category": categories
        .map((cat: any) => cat.title)
        .filter(Boolean)
        .join(", "),
      "content-language": "es",
      "content-author": config.author.name,
      "content-publication-date": publishedISO,
    },
  };
}

export default async function PostLayout({ children }: PostLayoutProps) {
  return <>{children}</>;
}
