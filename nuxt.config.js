import i18n from './config/i18n'


export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/nuxt-intl/',
  },
  loading: '~/components/LoadingBar.vue',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-intl',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: {
          onlyOnRoot: true,  // recommended
        },
        strategy: 'prefix_except_default',
        defaultLocale: 'en',
        seo: true,
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en-US',
            file: 'en.json'
          },
          {
            code: 'fr',
            name: 'Français',
            iso: 'fr-FR',
            file: 'fr.json'
          },
        ],
        lazy: true,
        vueI18n: i18n,
        langDir: 'lang/'
      },
    ],
  ],

  vuetify: {
    defaultAssets: false,
    treeShake: true
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // generate: {
  //   subFolders: false
  // }
}
