<template>
  <a :class="anchorClassName" :href="anchorLink"><slot /></a>
</template>


<script lang="ts">
export default {
  props: {
    anchorClassName: {
      type: String,
      required: false,
    },
    anchorLink: {
      type: String,
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