const pwaManifest = require('@pwa/manifest')
const mapObj = require('map-obj')
const decamelize = require('decamelize')

const defaultManifest = {
  name: 'My PWA',
	short_name: 'My Short PWA Name',
	start_url: '/index.html?homescreen=1',
	display: 'standalone',
	background_color: '#EFEFEF',
  theme_color: '#FFEEFF'
}

export default class PWAManifestWebpackPlugin {
  constructor(manifest) {
    manifest = mapObj(manifest, (k, v) => [decamelize(k, '_'), v])
    this.manifest = Object.assign(defaultManifest, manifest)
  }

  apply(compiler) {
    const { compilation, emit } = compiler.hooks
      emit.tapAsync('PWAManifestWebpackPlugin', async (compilation, done) => {
        const manifest = JSON.stringify(await pwaManifest(this.manifest), '', '\t')
        compilation.assets['manifest.json'] = {
          source: () => manifest,
          size: () => manifest.length,
        }

        done()
    })
  }
}
