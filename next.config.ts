import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    domains: ["imgix.cosmicjs.com"],
  },
  experimental: {
    optimizePackageImports: ["yet-another-react-lightbox"],
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
