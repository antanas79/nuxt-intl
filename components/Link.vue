<template>
  <a v-if="isExternal" :href="link" :class="className" :title="$t(title)" target="_blank">
    <slot />
  </a>
  <NuxtLink v-else :to="localePath({ path: link })" :class="className"><slot></slot> </NuxtLink>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true,
    },
    isExternal: {
      type: Boolean,
      required: false,
    },
    className: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped></style>
