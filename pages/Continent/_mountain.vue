<template>
  <div>
    <h1>Continent: {{ continent }}</h1>
    <h2>Mountain: {{ mountain }}</h2>
    <p>Path: {{ $route.path }}</p>
    <NuxtLink to="/">Back to Mountains</NuxtLink>
  </div>
</template>
<script>
export default {
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
  async asyncData({ params, redirect }) {
    console.log(params, redirect)
    const mountains = [
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
    ]
    const filteredMountain = mountains.find(
      (el) =>
        el.continent.toLowerCase() === params.continent &&
        el.slug === params.mountain
    )
    if (filteredMountain) {
      return {
        continent: filteredMountain.continent,
        mountain: filteredMountain.title,
      }
    } else {
      redirect('/')
    }
    return { slug }
  },
}
</script>
