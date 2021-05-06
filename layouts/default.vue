<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
        <v-system-bar color="red"></v-system-bar>
        <v-app-bar color="white accent-4">
          <NuxtLink class="d-flex align-center" :to="switchLocalePath('/')">
            <Logo />
          </NuxtLink>

          <v-spacer></v-spacer>
          <!--           <v-select
            v-model="selectedCurrency"
            :items="currencies"
            item-text="currency"
            label="select currency"
            hide-details
            flat
            solo
            :key="selectedCurrency.id"
            return-object
            single-line
            class="currency-selection"
          >
            <template v-slot:selection="{ item }">
              <SvgRender flag payment :name="item.path" />
              {{ item.currency }}
            </template>
            <template v-slot:item="{ item }"> <SvgRender flag payment :name="item.path" />{{ item.currency }} </template>
          </v-select> -->
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
              <v-list-item v-for="(locale, i) in availableLocales" :key="i" nuxt :to="switchLocalePath(locale.code)" isLabel="Select currency" newValue>
                {{ locale.name }}
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-system-bar color="grey" height="40"></v-system-bar>

        <v-navigation-drawer v-model="drawer" absolute temporary right>
          <v-list nav dense>
            <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
              <v-list-item>
                <NuxtLink class="col-12 px-0" :to="localePath('/steps')">Step1</NuxtLink>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  <NuxtLink to="/loading">Loading</NuxtLink>
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
        <v-card-text>
          <v-scroll-x-transition :hide-on-leave="true">
            <Nuxt />
          </v-scroll-x-transition>
        </v-card-text>
        <v-divider></v-divider>
        <p>{{ $n(70, 'currency', selectedCurrency.name) }}</p>
        <PaymentSection />
        <Footer />
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import Selector from '~/components/Selector.vue'
import SvgRender from '~/components/SvgRender.vue'

export default {
  async asyncData({ context, store, params, payload }) {
    this.payloadData = payload
    this.contextData = context
    this.storeData = store
    // await store.dispatch('steps/getSteps')
  },
  data: () => ({
    payloadData: null,
    contextData: null,
    storeData: null,
    drawer: false,
    group: null,
    selectedCurrency: { id: 1, name: 'en-Us', currency: 'USD - $', path: 'flags/usd' },
    currencies: [
      { id: 1, name: 'en-Us', currency: 'USD - $', path: 'flags/usd' },
      { id: 2, name: 'en-GB', currency: 'GBP - £', path: 'flags/gbp' },
      { id: 3, name: 'eu', currency: 'EUR', path: 'flags/eur' },
      { id: 4, name: 'en-AU', currency: 'AUD - AU $', path: 'flags/aud' },
    ],
  }),
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
  watch: {
    group() {
      this.drawer = false
    },
  },
  /*   updated() {
    console.log(this.selectedCurrency)
  }, */
  components: {
    SvgRender,
    Selector,
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-height: 100vh;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

//style overrides
#app .currency-selection {
  max-width: 160px;
}
#app .currency-selection .v-input__slot {
  padding-left: 0;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.no-uppercase {
  text-transform: none !important;
}
</style>
