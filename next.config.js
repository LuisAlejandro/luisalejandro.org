module.exports = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["imgix.cosmicjs.com", "galleria-slideshow.vercel.app"],
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
