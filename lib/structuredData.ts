import { config } from "@constants/constants";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  created_at: string;
  metadata: {
    hero?: string;
    teaser?: string;
    content?: string;
    categories?: string[];
  };
}

export function generateBlogJsonLd(posts: BlogPost[]) {
  const blogPosts = posts.map((post) => {
    const blogPost: any = {
      "@type": "BlogPosting",
      "@id": `${config.url}/blog/posts/${post.slug}`,
      mainEntityOfPage: `${config.url}/blog/posts/${post.slug}`,
      headline: post.title,
      name: post.title,
      description:
        post.metadata.teaser?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
      datePublished: post.created_at,
      dateModified: post.created_at,
      author: {
        "@type": "Person",
        "@id": `${config.url}/portfolio`,
        name: config.author.name,
        url: `${config.url}/portfolio`,
      },
      url: `${config.url}/blog/posts/${post.slug}`,
      keywords: post.metadata.categories || [],
    };

    // Only add image if it exists
    if (post.metadata.hero) {
      blogPost.image = {
        "@type": "ImageObject",
        "@id": `${config.url}${post.metadata.hero}`,
        url: `${config.url}${post.metadata.hero}`,
      };
    }

    return blogPost;
  });

  return {
    "@context": "https://schema.org/",
    "@type": "Blog",
    "@id": `${config.url}/blog`,
    mainEntityOfPage: `${config.url}/blog`,
    name: "Luis Alejandro - Software Development & Remote Work Insights",
    description:
      "Software development blog by Venezuelan engineer. TypeScript, Python, Golang tutorials. Remote work tips, open source insights & tech discoveries.",
    publisher: {
      "@type": "Person",
      "@id": `${config.url}/portfolio`,
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
    description:
      post.metadata.teaser?.replace(/<[^>]*>/g, "").substring(0, 160) || "",
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: {
      "@type": "Person",
      "@id": `${config.url}/about/#Person`,
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
    about:
      post.metadata.categories?.map((category) => ({
        "@type": "Thing",
        name: category,
      })) || [],
    keywords: post.metadata.categories || [],
  };

  // Only add image if it exists
  if (post.metadata.hero) {
    blogPosting.image = {
      "@type": "ImageObject",
      "@id": `${config.url}${post.metadata.hero}`,
      url: `${config.url}${post.metadata.hero}`,
    };
  }

  return blogPosting;
}
