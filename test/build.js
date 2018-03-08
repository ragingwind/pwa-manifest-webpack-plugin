const { join } = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const WebpackPlugin = require('../dist/index.js');

const dest = join(__dirname, '.tmp')
const src = join(__dirname, 'fixtures')

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
      console.log(err)
    }
  })
})