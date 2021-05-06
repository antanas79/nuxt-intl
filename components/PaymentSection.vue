<template>
  <div class="py-10">
    <Layout small>
      <v-row>
        <!--         <svg-icon
          v-for="(image, index) in test"
          :key="index"
          :name="image"
          class=""
        /> -->
        <v-col class="pb-0" xl="7" lg="7" md="8" sm="12" cols="12">
          <p class="mb-0 text-caption">{{ $t(paymentSectionData.topCaption) }}</p>
        </v-col>
        <v-col xl="7" lg="7" md="8" sm="12" cols="12" order="3" order-xl="2" order-lg="2" order-md="2" order-sm="3">
          <div class="d-flex align-center">
            <svg class="svg-money-back">
              <use xlink:href="~assets/sprite/svg/sprite-icons.svg#money-back"></use>
            </svg>
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
            <!--      <div>
              <svg
                class="svg-card"
                v-for="(image, index) in images"
                :key="index"
              >
                <use
                  xlink:href="~assets/sprite/svg/sprite-icons.svg#visa"
                ></use>
              </svg>
            </div>
            <div>
              <svg
                class="svg-card"
                v-for="(image, index) in images"
                :key="index"
              >
                <use
                  xlink:href="~assets/sprite/svg/sprite-icons.svg#visa"
                ></use>
              </svg>
            </div> -->
            <div class="d-flex mt-3">
              <SvgRender v-for="(svg, index) in images.filter((item, index) => index < images.length / 2)" :key="index" :name="`payment/` + svg" payment />
            </div>
            <div class="d-flex mt-3">
              <SvgRender v-for="(svg, index) in images.filter((item, index) => index >= images.length / 2)" :key="index" :name="`payment/` + svg" payment />
            </div>
          </div>
        </v-col>
        <v-col xl="5" lg="5" md="4" sm="12" cols="12" order="2" order-xl="3" order-lg="3" order-md="3" order-sm="2" class="col-microsoft-container">
          <div class="d-flex align-center justify-md-end">
            <svg class="microsoft-svg">
              <use xlink:href="~assets/sprite/svg/sprite-icons.svg#microsoft-gold"></use>
            </svg>
            <svg class="money-back-svg ml-10">
              <use xlink:href="~assets/sprite/svg/sprite-icons.svg#money-back-guarantee"></use>
            </svg>
          </div>
        </v-col>
      </v-row>

      <!--     {{ show }} -->
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
  methods: {
    /*     half(half) {
      return this.images.filter((item, index) =>
        index <= this.images.length / 2 && half ? true : !half ? true : false
      )
    }, */
  },
  computed: {
    /*     show() {
      const a = this.images.slice(0, this.images.length / 2)
      console.log(this.images.length / 2 + 2)
      console.log(this.images.length)
      console.log(a)
    }, */
  },
}
</script>

<style lang="scss" scoped>
.svg-money-back {
  width: 30px;
  height: 40px;
}
.svg-image {
  width: 100px;
  height: 100px;
}

.microsoft-svg {
  height: 90px;
  width: 150px;
}
.money-back-svg {
  height: 110px;
  width: 134px;
}
@media (max-width: 700px) {
  .svg-card-container {
    flex-direction: column;
  }
}
</style>
