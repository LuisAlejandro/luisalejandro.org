module.exports = {
  images: {
    domains: ['imgix.cosmicjs.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader:'@svgr/webpack',
        options: {
          "svgoConfig": {
            plugins: [{
              name: 'preset-default',
              params: {
                overrides: {
                  prefixIds: false,
                  cleanupIDs: false,
                  removeNonInheritableGroupAttrs: false,
                  moveElemsAttrsToGroup: false,
                  moveGroupAttrsToElems: false,
                  collapseGroups: false,
                },
              },
            }],
          },
        }
      }]
    });

    return config;
  }
}
