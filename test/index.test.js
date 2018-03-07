const {join} = require('path')
const webpack = require('webpack')
const rimraf = require('rimraf')
const WebpackPlugin = require('../dist/index.js');

const tmp = join(__dirname, '.tmp')
const src = join(__dirname, 'fixtures')

const build = done => {
  rimraf(tmp, () => {
    webpack({
      entry: `${src}/app.js`,
      output: {
        path:tmp,
        filename:'app.js'
      },
      plugins: [
        new WebpackPlugin()
      ]
    }, (err, stats) => {
      if (err || stats.hasErrors()) {
        throw err
      }

      done()
    })
  })
}

beforeAll(done => build(done))

test('typeof', () => {
  expect(typeof WebpackPlugin).toBe('function')
})