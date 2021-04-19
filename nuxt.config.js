import i18n from './config/i18n'
// import * from 'vuetify.css.map'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/nuxt-intl/',
  },
  rules: [
    {
      test: /\.js$/,
      enforce: "pre",
      use: ["source-map-loader"],
    },
  ],

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
  css: [],

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
        strategy: 'prefix',
        defaultLocale: 'en',
        seo: true,
        locales: [
          {
            code: 'en',
            name: 'English',
            iso: 'en-US',
          },
          {
            code: 'fr',
            name: 'Français',
            iso: 'fr-FR'
          },
        ],
        vueI18n: i18n,
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
