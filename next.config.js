module.exports = {
  images: {
    domains: ["imgix.cosmicjs.com"],
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
                  name: "prefixIds",
                  params: {
                    prefixIds: false,
                  },
                },
                {
                  name: "cleanupIds",
                  params: {
                    cleanupIds: false,
                  },
                },
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeNonInheritableGroupAttrs: false,
                      moveElemsAttrsToGroup: false,
                      moveGroupAttrsToElems: false,
                      collapseGroups: false,
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
