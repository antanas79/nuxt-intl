<template>
  <a v-if="isExternal" :href="link" :class="className" :title="$t(title)" target="_blank">
    <slot />
  </a>
  <NuxtLink v-else :to="link" :title="title" :class="className">
    <slot />
  </NuxtLink>
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

<style lang="scss" scoped>
.stepper-link {
  flex-basis: 140px;
}
@media (max-width: 1175px) {
  .stepper-link {
    flex-basis: 110px;
  }
}
@media (max-width: 967px) {
  .stepper-link {
    flex-basis: 90px;
  }
}
@media (max-width: 767px) {
  .stepper-link {
    flex-basis: 0px;
  }
}
</style>
