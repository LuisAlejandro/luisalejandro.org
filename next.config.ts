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

export default config;
