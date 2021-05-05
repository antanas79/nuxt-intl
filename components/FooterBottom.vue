<template>
  <v-col class="pt-5 footer-bottom">
    <p class="">
      Copyright {{ date() }}
      {{ $t('FOOTER.FOOTER_BOTTOM.COPYRIGHT') }}
    </p>
    <p>
      {{ $t('FOOTER.FOOTER_BOTTOM.MAIN_TEXT') }}
    </p>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      date: () => new Date().getFullYear(),
    }
  },
}
</script>

<style lang="scss" scoped>
.footer-bottom {
  max-width: 70%;
  font-size: 0.7rem;
}
@media (max-width: 768px) {
  .footer-bottom {
    max-width: 100%;
  }
}
</style>
