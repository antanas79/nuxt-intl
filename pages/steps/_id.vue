<template>
  <div>
    <h1 v-if="step">Step id: {{ step }}</h1>
    <p>Path: {{ $route.path }}</p>
    <NuxtLink to="/">Back to Steps</NuxtLink>
  </div>
</template>
<script>
export default {
  async asyncData({ route, error, payload }) {
    if (payload) console.log(payload)
    if (payload) return { step: payload }
  },
  //   async asyncData({ params, redirect }) {
  //     const mountains = await fetch(
  //       'https://api.nuxtjs.dev/mountains'
  //     ).then((res) => res.json())

  //     const filteredMountain = mountains.find(
  //       (el) =>
  //         el.continent.toLowerCase() === params.continent &&
  //         el.slug === params.mountain
  //     )
  //     if (filteredMountain) {
  //       return {
  //         continent: filteredMountain.continent,
  //         mountain: filteredMountain.title,
  //       }
  //     } else {
  //       redirect('/')
  //     }
  //   },

  data: () => ({
    step: null,
    // loaded: false,
  }),
  // fetch() {
  //   console.log(this)
  // },
  // mounted() {
  //   this.loaded = true
  // },
}
</script>
