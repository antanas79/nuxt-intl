<template>
  <component v-if="icon" :is="dynamicIcon" />
</template>

<script>
export default {
  name: 'DynamicIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    dynamicIcon() {
      const a = require(`~/assets/sprite/svg/${this.icon}.svg?raw`)
      return a
    },
  },
}
</script>
<style lang="scss">
.team-logo ::v-deep {
  width: 100px;
  height: 120px;
  fill: #969696;
  .blue {
    transition: fill 0.1s linear 0.2s;
  }
  .green {
    transition: fill 0.1s linear 0s;
  }
  .yellow {
    transition: fill 0.1s linear 0.1s;
  }
  .red {
    transition: fill 0.1s linear 0.3s;
  }
  :hover .blue {
    fill: #8bb8e2;
  }
  :hover .green {
    fill: #54b846;
  }
  :hover .red {
    fill: #ee6c4a;
  }
  :hover .yellow {
    fill: #ffd938;
  }
}
</style>
