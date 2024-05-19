const path = require('path')

module.exports = {
  // Другие настройки Webpack...
  resolve: {
    fallback: {
      path: require.resolve('path-browserify')
    }
  }
}
