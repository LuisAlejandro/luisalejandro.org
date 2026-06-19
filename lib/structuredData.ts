import { config, experience, ProjectList } from "@constants/constants";

const portfolioDescription =
  "Full stack developer portfolio: Expedia API (39% booking boost), Dockershelf (294K+ downloads), Canaima Linux (220K+ users). 60+ open source projects.";

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
    jobTitle: "Full Stack Software Engineer",
    description: `${config.author.first_name} is a Venezuelan full stack software engineer with more than ${experience} years of experience in TypeScript, Python, Go, open source, CI/CD, and remote software development.`,
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
        name: `${config.author.first_name} - Software Engineer`,
        description: config.description,
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

export function generatePortfolioJsonLd() {
  const portfolioUrl = `${config.url}/portfolio`;
  const personId = `${config.url}/#Person`;
  const websiteId = `${config.url}/#WebSite`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildPersonNode(portfolioUrl),
      {
        "@type": "ProfilePage",
        "@id": `${portfolioUrl}#ProfilePage`,
        url: portfolioUrl,
        name: `Portfolio | ${config.author.first_name} - Software Engineer`,
        description: portfolioDescription,
        isPartOf: {
          "@id": websiteId,
        },
        mainEntity: {
          "@id": personId,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${portfolioUrl}#CaseStudies`,
        name: "Case Studies",
        description:
          "Selected software engineering projects and case studies from Luis Alejandro's portfolio.",
        itemListElement: ProjectList.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: `${config.url}${project.visit}`,
            image: `${config.url}${project.image}`,
            keywords: project.tags.join(", "),
          },
        })),
      },
    ],
  };
}

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
