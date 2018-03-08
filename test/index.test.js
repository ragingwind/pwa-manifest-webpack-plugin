const { join } = require('path')
const fs = require('fs')
const WebpackPlugin = require('../dist/index.js');

const dest = join(__dirname, '.tmp')

test('typeof', () => {
  expect(typeof WebpackPlugin).toBe('function')
})

test('manifest', () => {
  const manifest = JSON.parse(
    fs.readFileSync(join(dest, 'manifest.json'))
  )

  expect(manifest.name).toBe('My PWA')
  expect(manifest.theme_color).toBe('#000000')
})