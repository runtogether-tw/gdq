module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  pwa: {
    iconPaths: {
      faviconSVG: null,
      favicon32: 'pic/touch-icon-iphone.png',
      favicon16: 'pic/touch-icon-iphone.png',
      appleTouchIcon: 'pic/touch-icon-iphone.png',
      maskIcon: null,
      msTileImage: null,
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/js/service-worker.js',
      exclude: [/\.map$/, /^manifest.*\.js$/, /\.json$/, /\.txt$/],
    },
  },
  css: {
    loaderOptions: {
      css: {
        url: false,
      },
    },
  },
};
