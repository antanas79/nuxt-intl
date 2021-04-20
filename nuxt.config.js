import i18n from './config/i18n'


export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  router: {
    base: '/nuxt-intl/',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
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
  generate: {
    // subFolders: false
    // routes: function () {
    //   return fetch('http://chunkbytes.com/userlist')
    //     .then((res) => {§
    //       return res.data.map((user) => {
    //         return {
    //           route: '/users/' + user.id
    //         }
    //       })
    //     })
    // }
    // routes: ['/steps/1', '/steps/2']
    
    routes() {
        const steps = [
      {
          id: 1,
          continent: 'europe',
          slug: 'slug1',
          title: 'title1'
      },
      {
          id: 2,
          continent: 'asia',
          slug: 'slug2',
          title: 'title2',
      },
    ]
      return [
        {route: 'steps/1',
        payload: {
          id: 1,
          continent: 'europe',
          slug: 'slug1',
          title: 'title1'
      }
        },
        {route: 'steps/2',
        payload: {
          id: 2,
          continent: 'asia',
          slug: 'slug2',
          title: 'title2',
      }
        }
      ]
    }
  }
}
