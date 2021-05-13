<template>
  <Component :is="require(`@/assets/sprite/svg/${name}.svg`).default" class="BaseIcon" v-bind="$attrs" @v-on="$listeners" />
</template>

<script>
export default {
  name: 'BaseIcon',

  // Transparent wrapper component
  // https://vuejs.org/v2/guide/components-props.html#Disabling-Attribute-Inheritance
  inheritAttrs: false,

  props: {
    name: {
      type: String,
      required: true,
    },
  },
}
</script>

<style>
.BaseIcon {
  /* Add some default CSS declaration blocks */
}
</style>