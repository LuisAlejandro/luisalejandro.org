import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgix.cosmicjs.com",
      },
      {
        protocol: "https",
        hostname: "cdn.cosmicjs.com",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 85, 90, 95, 100],
  },
  async headers() {
    return [
      // Feeds — 1h CDN cache + purge tags (blog-listings in BLOG_PURGE_TAGS)
      {
        source: "/blog/posts/:feed((?:feed|atom)\\.xml|feed\\.json)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Cache-Tag",
            value: "blog-listings, content",
          },
          {
            key: "Netlify-Cache-Tag",
            value: "blog-listings, content",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // Forever cache for blog posts - content is immutable once published
      {
        source:
          "/blog/posts/:slug((?!feed\\.xml$)(?!atom\\.xml$)(?!feed\\.json$).+)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Cache-Tag",
            value: "blog-posts, content",
          },
          {
            key: "Netlify-Cache-Tag",
            value: "blog-posts, content",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // Forever cache for case studies - content is immutable
      {
        source: "/case-studies/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Cache-Tag",
            value: "case-studies, content",
          },
          {
            key: "Netlify-Cache-Tag",
            value: "case-studies, content",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // Revalidation cache for blog index
      {
        source: "/blog",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Cache-Tag",
            value: "blog-index, blog-listings, content",
          },
          {
            key: "Netlify-Cache-Tag",
            value: "blog-index, blog-listings, content",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // Revalidation cache for blog category pages
      {
        source: "/blog/category/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Cache-Tag",
            value: "blog-index, blog-listings, content",
          },
          {
            key: "Netlify-Cache-Tag",
            value: "blog-index, blog-listings, content",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // Revalidation cache for portfolio
      {
        source: "/portfolio",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Netlify-CDN-Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
          {
            key: "Cache-Tag",
            value: "portfolio, content",
          },
          {
            key: "Netlify-Cache-Tag",
            value: "portfolio, content",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "Link",
            value:
              '</llms.txt>; rel="describedby"; type="text/markdown", </.well-known/api-catalog>; rel="api-catalog"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/index.md",
          destination: "/markdown-twin",
        },
        {
          source: "/:path((?!(?:_next|api|\\.well-known)).*)\\.md",
          destination: "/markdown-twin/:path",
        },
      ],
    };
  },
  experimental: {
    optimizePackageImports: ["yet-another-react-lightbox"],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeNonInheritableGroupAttrs: false,
                      moveElemsAttrsToGroup: false,
                      moveGroupAttrsToElems: false,
                      collapseGroups: false,
                      cleanupIds: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

export default withSentryConfig(config, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "luis-alejandro",
  project: "luisalejandroorg",
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Disable Sentrytelemetry
  telemetry: false,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for better error tracking
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Source maps configuration
  sourcemaps: {
    // Hides source maps from generated client bundles
    assets: "./.next/**/*",
    ignore: ["node_modules"],
    deleteSourcemapsAfterUpload: true,
  },

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,
});
