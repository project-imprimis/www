// The repo name should match name of repository hosting static project.
// The repo name will be used as the base URL. Otherwise images won't load.
const REPO_NAME = '/www/'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    // Specify the base URL to be either '/REPO_NAME/' or '/'.
    base: process.env.NODE_ENV === 'production' ? REPO_NAME : '/'
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Project Imprimis',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Coming to a dimension near you... Soon.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      {
        rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/stylesheets/variables.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/vue-carousel', mode: 'client' },
    { src: '~/plugins/fontawesome.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { css: false, materialDesignIcons: false }], // reduce insane space waste
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@nuxtjs/dayjs'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.js', name: 'English', flag: '🇺🇸' },
      { code: 'pl', iso: 'pl-PL', file: 'pl-PL.js', name: 'Polski', flag: '🇵🇱' }
    ],
    defaultLocale: 'en',
    langDir: '~/locales/'
  },
  dayjs: {
    locales: ['en', 'pl'],
    defaultLocale: 'en',
    plugins: ['relativeTime']
  }

}
