const { join } = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const WebpackPlugin = require('../dist/index.js');

module.exports = function build(dest, src, done) {
  rimraf(dest, () => {
    webpack({
      entry: `${src}/app.js`,
      output: {
        path:dest,
        filename:'app.js'
      },
      plugins: [
        new WebpackPlugin({
          themeColor: '#000000'
        })
      ]
    }, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err
      }

      done()
    })
  })
}