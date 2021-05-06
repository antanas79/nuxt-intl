<template>
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
    <!--   <v-icon> mdi-cloud-upload </v-icon> -->
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      group: null,
      selectedCurrency: { id: 1, name: 'en-Us', currency: 'USD - $', path: 'flags/usd' },
      currencies: [
        { id: 1, name: 'en-Us', currency: 'USD - $', path: 'flags/usd' },
        { id: 2, name: 'en-GB', currency: 'GBP - £', path: 'flags/gbp' },
        { id: 3, name: 'eu', currency: 'EUR', path: 'flags/eur' },
        { id: 4, name: 'en-AU', currency: 'AUD - AU $', path: 'flags/aud' },
      ],
    }
  },
  props: {
    NavArray: [
      { isExternal: false, iconName: 'path/name', link: '/home', name: 'SIGN_UP', title: 'Hover => click here', prefetch: '?' },
      { isExternal: true, iconName: 'mdi-name', link: '', name: '', title: 'REGISTER', title: 'REGISTER' },
      { isExternal: false, iconName: '', link: 'wwww.sync2.com', name: 'sync2', title: '' },
      {
        isExpandable: false,
        isExternal: false,
        iconName: '',
        link: '',
        name: '',
        title: '',
        prefetch: '?',
        nestedLinks: [
          { isExternal: false, iconName: '', link: '', name: '', title: '', prefetch: '?' },
          { isExternal: false, iconName: '', link: '', name: '', title: '', prefetch: '?' },
        ],
      },
      {
        isExternal: false,
        iconName: '',
        link: '',
        name: '',
        title: '',
        prefetch: '',
        nestedLinks: [{ isExternal: false, iconName: '', link: '', name: '', title: '', prefetch: '?' }],
      },
    ],
  },
  methods: {
    changeSelection(event) {
      console.log(event)
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

<style lang="scss" scoped></style>
