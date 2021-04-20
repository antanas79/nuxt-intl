<template>
  <div>404 Page Does Not Exist</div>
</template>

<script lang="ts">
export default {
  asyncData({ payload }) {
    console.log(payload)
  },
}
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
