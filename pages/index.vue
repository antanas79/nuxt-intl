<template>
  <div>
    <ul v-for="mountain in mountains" :key="mountain.id">
      <NuxtLink :to="`${mountain.continent.toLowerCase()}/${mountain.slug}`">
        <li>{{ mountain.title }}</li>
      </NuxtLink>
    </ul>
  </div>
</template>
<script>
export default {
  //   async asyncData() {
  //     const mountains = await fetch('https://api.nuxtjs.dev/mountains').then(
  //       (res) => console.log(res),
  //       res.json()
  //     )

  //     return { mountains }
  //   },

  data: () => ({
    mountains: [
      {
        id: 1,
        continent: 'europe',
        slug: 'slug1',
        title: 'title1',
      },
      {
        id: 2,
        continent: 'asia',
        slug: 'slug2',
        title: 'title2',
      },
    ],
  }),
}
</script>
