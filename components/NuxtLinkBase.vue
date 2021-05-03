<template>
  <div>
    <NuxtLink :class="nuxtLinkClassName" :to="localePath({ path: nuxtLink })">
      <slot />
    </NuxtLink>
  </div>
</template>


<script lang="ts">
export default {
  props: {
    buttonText: {
      type: String,
      required: true,
    },
    nuxtLink: {
      type: String,
      required: false,
    },
    buttonClassName: {
      type: String,
      required: false,
    },
    anchorClassName: {
      type: String,
      required: false,
    },
    anchorLink: {
      type: String,
      required: false,
    },
    nuxtLinkClassName: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    // a computed getter
    // lastStepName: function () {
    //   // `this` points to the vm instance
    //   return this.currentSteps[this.currentSteps.length - 1].link
    // },
  },
}
</script>

<style lang="scss">
</style>