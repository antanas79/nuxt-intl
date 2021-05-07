<template>
  <div class="py-10">
    <Layout small>
      <v-row>
        <v-col class="pb-0" xl="7" lg="7" md="8" sm="12" cols="12">
          <p class="mb-0 text-caption">{{ $t(paymentSectionData.topCaption) }}</p>
        </v-col>
        <v-col xl="7" lg="7" md="8" sm="12" cols="12" order="3" order-xl="2" order-lg="2" order-md="2" order-sm="3">
          <div class="d-flex align-center">
            <SvgRender name="payment/money-back" moneyBack />
            <p class="mb-0 text-h6">
              {{ $t(paymentSectionData.mainTextHeading) }}
            </p>
          </div>
          <i18n tag="p" path="PAYMENT_MAIN_TEXT" class="mb-1 text-caption">
            <template v-slot:br> <br /> </template
          ></i18n>
          <p class="mb-0 text-caption font-weight-bold">
            {{ $t(paymentSectionData.mainTextRefund) }}
          </p>

          <NuxtLink to="/" class="text-caption blue--text">{{ $t(paymentSectionData.mainTextBottom) }}</NuxtLink>
        </v-col>
        <v-col xl="7" lg="7" md="12" sm="12" cols="12" order="4" order-xl="4" order-lg="4" order-md="4" order-sm="4" class="pt-0">
          <div class="svg-card-container d-flex">
            <div class="d-flex mt-3">
              <SvgRender v-for="(svg, index) in images.filter((item, index) => index < images.length / 2)" :key="index" :name="`payment/` + svg" payment />
            </div>
            <div class="d-flex mt-3">
              <SvgRender v-for="(svg, index) in images.filter((item, index) => index >= images.length / 2)" :key="index" :name="`payment/` + svg" payment />
            </div>
          </div>
        </v-col>
        <v-col xl="5" lg="5" md="4" sm="12" cols="12" order="2" order-xl="3" order-lg="3" order-md="3" order-sm="2">
          <div class="d-flex align-center justify-md-end">
            <SvgRender name="payment/microsoft-gold" moneyBackGuarantee />
            <SvgRender name="payment/money-back-guarantee" microsoftGold />
          </div>
        </v-col>
      </v-row>
    </Layout>
    <div>
      <div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'visa',
        'american-express',
        'master-card',
        'discover-network',
        'wire-transfer',
        'purchase-order',
        'money-order',
        'check',
        'pay-pal',
        'pay-later',
      ],
    }
  },
  props: {
    paymentSectionData: {
      type: Object,
      default: () => ({
        topCaption: 'PAYMENT_TOP_CAPTION',
        mainTextHeading: 'PAYMENT_MAIN_TEXT_HEADING',
        mainTextRefund: 'PAYMENT_MAIN_TEXT_REFUND',
        mainTextBottom: 'PAYMENT_MAIN_TEXT_BOTTOM',
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
.svg-image {
  width: 100px;
  height: 100px;
}

@media (max-width: 700px) {
  .svg-card-container {
    flex-direction: column;
  }
}
</style>
