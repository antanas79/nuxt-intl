import i18n from './config/i18n';
require('dotenv').config();
const contentful = require('contentful');

export default {
  // Target: https://go.nuxtjs.dev/config-target
  // alias: [],
  target: 'static',
  router: {
    base: '/nuxt-intl/',
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     name: 'custom',
    //     path: '*',
    //     component: resolve(__dirname, 'pages/404.vue'),
    //     payload: 'test1'
    //   })
    // }
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
  plugins: [{
    src: '~/plugins/vuex-persist',
    mode: 'client'
  }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    "@nuxt/http",
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
            code: 'fr',
            name: 'Français',
            iso: 'fr-FR',
            file: 'fr.js'
          },
          {
            code: 'en',
            name: 'English',
            iso: 'en-US',
            file: 'en.js'
          },
          {
            code: 'de',
            name: 'Deutsch',
            iso: 'de-de',
            file: 'de.js'
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
  modules: [
    '@nuxtjs/dotenv',
  ],
  markdownit: {
    injected: true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
      /*
        ** Run ESLint on save
        */
        extend (config, { isDev, isClient }) {
          config.node = {
              fs: 'empty'
          }
      }
  },
  generate: {
    routes: () => {
      const client = contentful.createClient({
          space:  process.env.CTF_SPACE_ID,
          accessToken: process.env.CTF_CD_ACCESS_TOKEN
      });
   
      return client.getEntries({
          content_type: 'steps'
      }).then((response) => {
          // return response.items.map(entry => {
          //     return {
          //         route: '/steps/' + entry.fields.id,
          //         payload: entry.fields
          //     };
          // });
          let routes = [];
          let locales = ['', '/de', '/fr']
          if (response) {
            for (let i =0; i< response.items.length; i++) {
                for (let j=0; j< locales.length; j++) {
                  routes.push({
                    route: locales[j] + '/steps/' + response.items[i].fields.id,
                    payload: response.items[i].fields
                  })
                }
            }
            console.log(routes)
            return routes;
          }
      });
    }
  }
}
