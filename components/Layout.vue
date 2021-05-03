<template>
  <v-container
    :class="`container-big mx-auto ${small ? 'container-small' : ''} mx-0`"
  >
    <slot />
  </v-container>
</template>

<script>
export default {
  props: {
    small: Boolean,
    default: false,
  },
}
</script>

<style lang="scss" scoped>
//1026 MAZAS konteineris
//1177 DIDELIS konteineris
.container-big {
  max-width: 1300px;
  padding: 0 60px;
}
.container-small {
  max-width: 1176px;
  padding: 0 60px;
}
/* .container-license {
  max-width: 1210px;
  padding: 0 15px;
}
 */
@media (max-width: 1160px) {
  .container-big {
    padding: 0 60px;
  }
}
@media (max-width: 1090px) {
  .container-big {
    padding: 0 40px;
  }
}
@media (max-width: 1050px) {
  .container-big {
    padding: 0 20px;
  }
}
@media (max-width: 1010px) {
  .container-big {
    padding: 0 15px;
  }
}
@media (max-width: 991px) {
  .container-big {
    padding: 0 40px;
  }
}
@media (max-width: 768px) {
  .container-big {
    padding: 0 40px;
  }
}
@media (max-width: 414px) {
  .container-big {
    padding: 0 20px;
  }
}
@media (max-width: 360px) {
  .container-big {
    padding: 0 10px;
  }
}
</style>
