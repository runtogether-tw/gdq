module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  pwa: {
    iconPaths: {},
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/js/service-worker.js',
      exclude: [/\.map$/, /^manifest.*\.js$/, /\.json$/, /\.txt$/],
    },
  },
};