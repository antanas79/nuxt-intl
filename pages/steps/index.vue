<template>
  <div>
    <!-- <ul v-for="step in steps" :key="step.id">
      <NuxtLink :to="localePath({ path: `steps/${step.id}` })">
        <li>{{ step.title }}</li>
      </NuxtLink>
    </ul> -->
    <!-- <NuxtLink v-for="locale in availableLocales" :key="locale.code" :to="switchLocalePath(locale.code)">{{ locale.name }}LOCALE </NuxtLink> -->
    <!--     <v-btn color="primary"> Button </v-btn>
    <v-btn color="my-custom-color"> My custom color </v-btn>
    <v-btn color="next-custom-color" @click="swap"> Swap</v-btn> -->
  </div>
</template>
<script>
export default {
  // async asyncData({ store, params, payload }) {
  //   await store.dispatch('steps/getSteps')
  // },
  data: () => ({
    step: null,
    show: false,
  }),
  methods: {
    touchAll() {
      const value = this.$vuetify.theme.themes[this.theme]
      this.$vuetify.theme.themes[this.theme] = {}
      this.$vuetify.theme.themes[this.theme] = value
      console.log(value)
    },
    swap() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark
      // necessary to reset colors after changing the theme, perhaps a Vuetify.js bug
      this.touchAll(1)
    },
  },
  computed: {
    theme() {
      return this.$vuetify.theme.isDark ? 'dark' : 'light'
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
    currentStep() {
      return this.$store.state.steps.currentStep
    },
    steps() {
      return this.$store.state.steps.steps
    },
    isLoading() {
      return this.$store.state.steps.isLoading
    },
  },
  // watch: {
  //   '$route.query': '$fetch',
  // },
}
</script>
