const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: () => {
    let options = {}
    if (process.env.NODE_ENV !== 'production') {
      options = Object.assign(options, {
        devtool: 'source-map',
        plugins: [new BundleAnalyzerPlugin()]
      })
    }
    options = Object.assign(options, {
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 400000
        }
      }
    })
    return options
  },
  pwa: {
    name: 'List of Things',
    workboxOptions: {
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/image\.tmdb\.org\//,
          handler: 'CacheFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/\w+\.themoviedb\.org\//,
          handler: 'NetworkFirst',
          options: {
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    }
  }
}
