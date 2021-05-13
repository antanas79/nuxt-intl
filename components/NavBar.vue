<template>
  <div>
    <v-app-bar color="white accent-4 px-0">
      <Layout>
        <div class="col-12 pa-0 d-flex">
          <a class="d-flex align-center" :href="navBarData.project.link">
            <SvgRender :name="navBarData.project.logoName" class="d-none d-sm-flex align-self-center" />
            <div :class="`d-sm-none font-weight-bold text-h5 ${navBarData.project.nameColor}--text`">{{ navBarData.project.name }}</div>
          </a>
          <v-spacer></v-spacer>
          <Selector
            @changeSelection="changeSelection"
            :selectorData="currencies"
            :selectedValue="selectedCurrency"
            :isKey="selectedCurrency.id"
            itemText="currency"
            flag
            currencyClass
          />
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item v-for="(locale, i) in availableLocales" :key="i" nuxt :to="switchLocalePath(locale.code)">
                {{ locale.name }}
              </v-list-item>
            </v-list>
          </v-menu>
          <!-- <v-btn icon class="d-none">
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->

          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </div>
      </Layout>

      <!-- 
      <p>{{ $n(70, 'currency', selectedCurrency.name) }}</p> -->
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
export default {
  data() {
    return {
      drawer: false,
      group: null,
      selected: false,
      selectedCurrency: this.navBarData.selectedCurrency,
      currencies: this.navBarData.currencies,
    }
  },
  props: {
    navBarData: {
      type: Object,
      default: () => ({
        project: {
          logoName: 'sync2',
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
        // selectedCurrency: { id: 1, name: 'en-Us', currency: 'USD - $', path: 'flags/usd' },
        // currencies: [
        //   { id: 1, name: 'en-Us', currency: 'USD - $', path: 'flags/usd' },
        //   { id: 2, name: 'en-GB', currency: 'GBP - £', path: 'flags/gbp' },
        //   { id: 3, name: 'eu', currency: 'EUR', path: 'flags/eur' },
        //   { id: 4, name: 'en-AU', currency: 'AUD - AU $', path: 'flags/aud' },
        // ],
        selectedCurrency: { id: 1, name: 'en-Us', currency: 'USD', path: 'flags/usd' },
        currencies: [
          { id: 1, name: 'en-Us', currency: 'USD', path: 'flags/usd' },
          { id: 2, name: 'en-GB', currency: 'GBP', path: 'flags/gbp' },
          { id: 3, name: 'eu', currency: 'EUR', path: 'flags/eur' },
          { id: 4, name: 'en-AU', currency: 'AUD', path: 'flags/aud' },
        ],
      }),
    },
  },
  methods: {
    changeSelection(event) {
      this.selectedCurrency = JSON.parse(JSON.stringify(event))
    },
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
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
