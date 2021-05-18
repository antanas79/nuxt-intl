<template>
  <div class="py-10">
    <Layout small>
      <v-row>
        <v-col class="pb-0" xl="7" lg="7" md="8" sm="12" cols="12">
          <p class="mb-0 text-caption">{{ $t(paymentSectionData.topCaption) }}</p>
        </v-col>
        <v-col xl="7" lg="7" md="12" sm="12" cols="12" order="3" order-xl="2" order-lg="2" order-md="3" order-sm="3">
          <div class="d-flex align-center">
            <SvgRender :name="paymentSectionData.moneyBackIcon.name" className="money-back" :title="paymentSectionData.moneyBackIcon.title" />
            <p class="mb-0 text-h6">
              {{ $t(paymentSectionData.mainTextHeading) }}
            </p>
          </div>
          <p class="mb-1 text-caption" v-html="$t(paymentSectionData.mainText)"></p>
          <p class="mb-0 text-caption font-weight-bold">
            {{ $t(paymentSectionData.mainTextRefund) }}
          </p>

          <Link
            :isExternal="!paymentSectionData.mainTextBottom.isExternal"
            :link="paymentSectionData.mainTextBottom.link"
            className="text-caption link-underline"
            >{{ $t(paymentSectionData.mainTextBottom.name) }}</Link
          >
        </v-col>
        <v-col xl="7" lg="7" md="12" sm="12" cols="12" order="4" order-xl="4" order-lg="4" order-md="4" order-sm="4" class="pt-0">
          <div class="svg-card-container d-flex">
            <div class="d-flex mt-3">
              <SvgRender
                v-for="(icon, index) in paymentSectionData.cardsIcons.filter((item, index) => index < paymentSectionData.cardsIcons.length / 2)"
                :key="index"
                :name="`payment/` + icon.name"
                :title="icon.title"
                className="payment-margin"
              />
            </div>
            <div class="d-flex mt-3">
              <SvgRender
                v-for="(icon, index) in paymentSectionData.cardsIcons.filter((item, index) => index >= paymentSectionData.cardsIcons.length / 2)"
                :key="index"
                :name="`payment/` + icon.name"
                :title="icon.title"
                className="payment-margin"
              />
            </div>
          </div>
        </v-col>
        <v-col xl="5" lg="5" md="12" sm="12" cols="12" order="2" order-xl="3" order-lg="3" order-md="2" order-sm="2">
          <div class="d-flex align-center justify-lg-end">
            <Link
              :isExternal="paymentSectionData.microsoftGoldIcon.isExternal"
              :link="paymentSectionData.microsoftGoldIcon.link"
              :title="$t(paymentSectionData.microsoftGoldIcon.title)"
            >
              <SvgRender :name="paymentSectionData.microsoftGoldIcon.name" className="microsoft-gold" />
            </Link>
            <Link
              :isExternal="paymentSectionData.moneyBacGuaranteekIcon.isExternal"
              :link="paymentSectionData.moneyBacGuaranteekIcon.link"
              :title="$t(paymentSectionData.moneyBacGuaranteekIcon.title)"
            >
              <SvgRender :name="paymentSectionData.moneyBacGuaranteekIcon.name" className="money-back-guarantee ml-10" />
            </Link>
          </div>
        </v-col>
      </v-row>
    </Layout>
  </div>
</template>

<script>
export default {
  props: {
    paymentSectionData: {
      type: Object,
      default: () => ({
        topCaption: 'PAYMENT_TOP_CAPTION',
        mainTextHeading: 'PAYMENT_MAIN_TEXT_HEADING',
        mainTextRefund: 'PAYMENT_MAIN_TEXT_REFUND',
        mainTextBottom: { isExternal: false, name: 'PAYMENT_MAIN_TEXT_BOTTOM', link: '/' },
        mainText: 'PAYMENT_MAIN_TEXT',
        cardsIcons: [
          { name: 'visa', title: 'title' },
          { name: 'american-express', title: 'title' },
          { name: 'master-card', title: 'title' },
          { name: 'discover-network', title: 'title' },
          { name: 'wire-transfer', title: 'title' },
          { name: 'purchase-order', title: 'title' },
          { name: 'money-order', title: 'title' },
          { name: 'check', title: 'title' },
          { name: 'pay-pal', title: 'title' },
          { name: 'pay-later', title: 'title' },
        ],
        microsoftGoldIcon: {
          isExternal: true,
          link: 'https://www.microsoft.com/en-US/solution-providers/home',
          name: 'payment/microsoft-gold',
          title: 'ICON_MICROSOFT_GOLD_CERTIFIED_TITLE',
        },
        moneyBacGuaranteekIcon: { isExternal: false, link: '/refund-policy', name: 'payment/money-back-guarantee', title: 'ICON_MONEY_BACK_GUARANTEE_TITLE' },
        moneyBackIcon: { name: 'payment/money-back', title: 'title' },
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
