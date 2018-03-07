const pwaManifest = require('@pwa/manifest');

const defaultManifest = {
  name: 'My PWApp', // from packge name
	short_name: 'My Short PWA Name', // name shortern
	start_url: '/index.html?homescreen=1',
	display: 'standalone',
	background_color: '#EFEFEF',
	theme_color: '#FFEEFF'
}

export default class PWAManifestWebpackPlugin {
  constructor(config) {
    this.config = {
      manifest: defaultManifest,
      // ...config
    }
  }

  apply(compiler) {
    const { compilation, emit } = compiler.hooks
      emit.tapAsync('PWAManifestWebpackPlugin', async (compilation, done) => {
        const manifest = JSON.stringify(await pwaManifest(this.config.manifest), '', '\t')
        compilation.assets['manifest.json'] = {
          source: () => manifest,
          size: () => manifest.length,
        }
        done()
    })
  }
}
