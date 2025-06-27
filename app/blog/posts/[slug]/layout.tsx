import { Metadata } from "next";
import { notFound } from "next/navigation";

import { ADSENSE_PUBLISHER_ID, config } from "@constants/constants";
import { getPostAndMorePosts } from "@lib/api";

import "@styles/tailwind.css";
import "yet-another-react-lightbox/styles.css";

interface PostLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

// Generate comprehensive SEO metadata for individual blog posts
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);

  if (!data?.post) {
    return {
      title: "Post Not Found | Luis Alejandro Blog",
      description:
        "The requested blog post could not be found. Explore other software development insights on Luis Alejandro's blog.",
    };
  }

  const post = data.post;

  // Clean and optimize description
  const rawDescription = post.metadata?.teaser?.replace(/<[^>]*>/g, "") || "";
  const optimizedDescription =
    rawDescription.length > 160
      ? rawDescription.substring(0, 157) + "..."
      : rawDescription;

  // Generate SEO-optimized title
  const postTitle = post.title;
  const seoTitle =
    postTitle.length > 60
      ? `${postTitle.substring(0, 57)}... | Luis Alejandro Blog`
      : `${postTitle} | Luis Alejandro - Software Development Blog`;

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

  // Optimize hero image
  const heroImage = post.metadata?.hero;
  const optimizedImageUrl = heroImage?.url
    ? heroImage.url.startsWith("http")
      ? heroImage.url
      : `${config.url}${heroImage.url}`
    : `${config.url}/images/banner.png`;

  // Generate article schema-friendly publication date
  const publishedDate = new Date(post.created_at);
  const publishedISO = publishedDate.toISOString();

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
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: postTitle,
    },
    openGraph: {
      title: seoTitle,
      description: optimizedDescription,
      url: canonicalUrl,
      siteName: "Luis Alejandro Martínez Faneyth - Software Development Blog",
      images: [
        {
          url: optimizedImageUrl,
          width: 1200,
          height: 630,
          alt: `${postTitle} - Software Development Insights by Luis Alejandro`,
        },
        {
          url: `${config.url}/images/banner.png`,
          width: 1200,
          height: 630,
          alt: "Luis Alejandro - Full Stack Developer & Open Source Expert",
        },
      ],
      locale: "en_US",
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
      images: [optimizedImageUrl],
      site: `@${config.blog.twitter}`,
      creator: `@${config.author.twitter}`,
    },
    icons: {
      icon: [
        {
          url: `${config.url}/favicon/favicon.svg`,
          type: "image/svg+xml",
        },
        {
          url: `${config.url}/favicon/favicon.png`,
          type: "image/png",
        },
        {
          url: `${config.url}/favicon/favicon.ico`,
          type: "image/x-icon",
        },
        {
          url: `${config.url}/favicon/favicon-32x32.png`,
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: `${config.url}/favicon/favicon-16x16.png`,
          sizes: "16x16",
          type: "image/png",
        },
      ],
      shortcut: `${config.url}/favicon/favicon.ico`,
      apple: [
        {
          url: `${config.url}/favicon/apple-touch-icon.png`,
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: `${config.url}/favicon/safari-pinned-tab.svg`,
          color: "#000000",
        },
      ],
    },
    manifest: `${config.url}/favicon/site.webmanifest`,
    alternates: {
      canonical: canonicalUrl,
      types: {
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
      },
    },
    other: {
      // Google AdSense verification
      "google-adsense-account": ADSENSE_PUBLISHER_ID || "",

      // Article-specific Dublin Core metadata
      "dcterms.title": postTitle,
      "dcterms.description": optimizedDescription,
      "dcterms.language": "en",
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
      "msapplication-square70x70logo": `${config.url}/favicon/mstile-70x70.png`,
      "msapplication-square144x144logo": `${config.url}/favicon/mstile-144x144.png`,
      "msapplication-square150x150logo": `${config.url}/favicon/mstile-150x150.png`,
      "msapplication-square310x310logo": `${config.url}/favicon/mstile-310x310.png`,
      "msapplication-wide310x150logo": `${config.url}/favicon/mstile-310x150.png`,
      "msapplication-TileImage": `${config.url}/favicon/mstile-310x310.png`,
      "msapplication-TileColor": "#f8d983",
      "msapplication-config": `${config.url}/favicon/browserconfig.xml`,

      // Facebook metadata
      "fb:admins": config.author.fb_profile_id,
      "fb:profile_id": config.author.fb_profile_id,
      "fb:app_id": config.blog.fb_app_id,

      // Additional SEO enhancements
      "theme-color": "#f8d983",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": postTitle,

      // Schema.org JSON-LD reference
      "schema-org": "BlogPosting",

      // Content categorization
      "content-type": "blog-post",
      "content-category": categories
        .map((cat: any) => cat.title)
        .filter(Boolean)
        .join(", "),
      "content-language": "en",
      "content-author": config.author.name,
      "content-publication-date": publishedISO,
    },
  };
}

export default async function PostLayout({
  children,
  params,
}: PostLayoutProps) {
  const { slug } = await params;
  const data = await getPostAndMorePosts(slug);

  if (!data?.post?.slug) {
    notFound();
  }

  return <>{children}</>;
}
