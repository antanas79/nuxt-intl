<template>
  <div>
    <v-app-bar color="white accent-4 px-0">
      <Layout>
        <div class="col-12 pa-0 d-flex">
          <a class="d-flex align-center" :href="navBarData.project.link">
            <SvgRender :name="navBarData.project.logoSrc" class="d-none d-sm-flex align-self-center" />
            <div :class="`d-sm-none font-weight-bold text-h5 ${navBarData.project.nameColor}--text`">{{ navBarData.project.name }}</div>
          </a>
          <v-spacer></v-spacer>
          <Selector
            v-if="isPricingPage && isLoaded"
            @changeSelection="setSelectedCurrency"
            :selectorData="$store.state.currencies.currencies"
            :selectedValue="$store.state.currencies.selectedCurrency"
            :isKey="$store.state.currencies.selectedCurrency.id"
            itemText="currency"
            flag
            currencyClass
          />
          <v-menu bottom left v-if="isLoaded">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(locale, i) in availableLocales" :key="i" nuxt @click="setLocale(locale)">
                {{ locale.name }}
              </v-list-item>
            </v-list>
          </v-menu>

          <v-app-bar-nav-icon v-if="isLoaded" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </div>
      </Layout>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <template v-for="n in navBarData.links">
          <v-list-item v-if="!n.isExpandable" :key="n.id" nuxt :to="n.link">
            <v-list-item-icon>
              <v-icon>{{ n.iconName }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ n.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-group v-else :key="n.id" :prepend-icon="n.iconName" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ n.name }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="child in n.nestedLinks" :key="child.id" nuxt link :to="child.link">
              <v-list-item-icon>
                <v-icon>{{ child.iconName }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ child.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // async fetch() {
  //   if (!this.posts) {
  //     this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts/1')
  //   } else {
  //   }
  // },
  data() {
    return {
      drawer: false,
      group: null,
      selected: false,
      isLoaded: false,
    }
  },
  mounted() {
    if (process.browser) {
      setTimeout(() => {
        this.$store.commit(
          'locales/setSelectedLocale',
          this.$i18n.locales.find((i) => i.code === this.$i18n.locale)
        )

        this.isLoaded = true
      }, 0)
    }
  },
  computed: mapState({
    currencies: (state) => state.currencies.currencies,
    selectedCurrency: (state) => state.currencies.selectedCurrency,
    selectedLocale: (state) => state.locales.selectedLocale,
  }),
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
  methods: {
    setSelectedCurrency(event) {
      this.$store.commit('currencies/setSelectedCurrency', JSON.parse(JSON.stringify(event)))
    },
    setLocale(event) {
      //first set locale in vuex, only then redirect
      this.$store.commit('locales/setSelectedLocale', JSON.parse(JSON.stringify(event)))
      this.$i18n.setLocale(JSON.parse(JSON.stringify(event)).code)
    },
  },
  props: {
    isPricingPage: {
      type: Boolean,
      required: true,
    },
    navBarData: {
      type: Object,
      default: () => ({
        project: {
          logoSrc: 'sync2',
          name: 'Sync2',
          nameColor: 'primary',
          link: 'https://www.sync2.com',
        },
        links: [
          { id: 1, isExpandable: false, isExternal: false, iconName: 'mdi-ticket', link: '/', name: 'SIGN_UP', title: 'Hover => click here', prefetch: '?' },
          {
            id: 2,
            isExpandable: false,
            isExternal: true,
            iconName: 'mdi-ticket',
            link: '/',
            name: 'REGISTER',
            title: 'REGISTER',
            prefetch: '?',
          },
          {
            id: 3,
            isExpandable: true,
            isExternal: false,
            iconName: 'mdi-school',
            link: 'wwww.sync2.com',
            name: 'PRICING',
            title: 'PRICING',
            prefetch: '?',
            nestedLinks: [
              { id: 1, isExternal: false, iconName: 'mdi-tag', link: '/', name: 'CHILD', title: 'CHILD', prefetch: '?' },
              { id: 2, isExternal: false, iconName: 'mdi-tag', link: '/', name: 'CHILD', title: 'CHILD', prefetch: '?' },
            ],
          },
          {
            id: 4,
            isExpandable: true,
            isExternal: false,
            iconName: 'mdi-tag',
            link: '/',
            name: 'PARENT',
            title: '',
            prefetch: '?',
            nestedLinks: [
              { id: 1, isExternal: false, iconName: 'mdi-tag', link: '/', name: 'CHILD', title: 'CHILD', prefetch: '?' },
              { id: 2, isExternal: false, iconName: 'mdi-tag', link: '/', name: 'CHILD', title: 'CHILD', prefetch: '?' },
            ],
          },
        ],
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .v-toolbar__content {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>
