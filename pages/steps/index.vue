<template>
  <div>
    <!-- <ul v-for="step in steps" :key="step.fields.id">
      <NuxtLink :to="localePath({ path: `steps/${step.fields.id}` })">
        <li>{{ step.fields.title }}</li>
      </NuxtLink>
    </ul>
    <NuxtLink
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}LOCALE
    </NuxtLink> -->
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
  computed: {
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
  watch: {
    '$route.query': '$fetch',
  },
}
</script>
