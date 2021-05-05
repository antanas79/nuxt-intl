<template>
  <div v-if="name" :class="{ 'payment-cards': payment, 'current-flag': flag }" v-html="src"></div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    payment: Boolean,
    flag: Boolean,
  },
  computed: {
    src() {
      const src = require(`~/assets/sprite/svg/${this.name}.svg?raw`)
      return src
    },
  },
}
</script>
<style lang="scss" scoped>
.payment-cards {
  height: 35px;
  width: 60px;
  margin: 0 2px;
  &:first-child {
    margin-left: 0;
  }
}
.current-flag {
  height: 35px;
  width: 35px;
}
</style>
