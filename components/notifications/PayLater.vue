<template>
  <div class="px-0 pl-md-3 pr-md-4">
    <v-card-title class="headline pb-6">
      <div class="d-flex">
        <SvgRender name="pay-later" class="notification d-flex align-center" />
        <p class="mb-0 text-h5" v-html="$t(payLaterData.title)"></p>
      </div>
    </v-card-title>
    <v-card-text class="pb-0">
      <p class="mb-2 text-subtitle-2" v-html="$t(payLaterData.schemaTitle)">.</p>
      <div class="d-flex flex-sm-row flex-column align-center gray px-6 py-3 justify-space-between">
        <SvgRender name="pay-later-schema" />
        <ul class="schema-list blue--text text-uppercase text-subtitle-2">
          <li v-for="item in payLaterData.schemaList" :key="'A' + item.id">{{ $t(item.name) }}</li>
        </ul>
      </div>
      <p class="mb-3 mt-4 text-subtitle-2">{{ $t(payLaterData.totalOrderSumTitle) }}</p>
      <ul class="pl-0 text-subtitle-2">
        <li
          class="pb-3"
          v-for="item in payLaterData.orderSumList"
          :key="'B' + item.id"
          v-html="
            $t(item.name, {
              orderPayment: $n(item.orderPayment, 'currency', $store.state.currencies.selectedCurrency.name),
              totalOrderSum: $n(item.totalOrderSum, 'currency', $store.state.currencies.selectedCurrency.name),
            })
          "
        ></li>
      </ul>
      <p class="mb-0 pt-2 text-subtitle-2" v-html="$t(payLaterData.paymentMethodSelected)"></p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <Button buttonClassName="text-subtitle-1" color="blue" isText :buttonText="payLaterData.buttonChatNow"></Button>
      <Button
        buttonClassName="text-subtitle-1"
        color="blue"
        isText
        :buttonText="payLaterData.buttonClose"
        eventName="closeDialog"
        @closeDialog="$emit('closeDialog')"
      ></Button>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  name: 'PayLater',
  data() {
    return {}
  },
  props: {
    payLaterData: {
      type: Object,
      default: () => ({
        title: 'NOTIFICATION_PAY_LATER_TITLE',
        schemaTitle: 'NOTIFICATION_PAY_LATER_SCHEMA_TITLE',
        schemaList: [
          { id: 1, name: 'NOTIFICATION_PAY_LATER_LIST_SCHEMA_TEXT_1' },
          { id: 2, name: 'NOTIFICATION_PAY_LATER_LIST_SCHEMA_TEXT_2' },
          { id: 3, name: 'NOTIFICATION_PAY_LATER_LIST_SCHEMA_TEXT_3' },
        ],
        totalOrderSumTitle: 'NOTIFICATION_PAY_LATER_TOTAL_ORDER_SUM_TITLE',
        orderSumList: [
          { id: 1, name: 'NOTIFICATION_PAY_LATER_TOTAL_ORDER_SUM_LIST_TEXT_1', orderPayment: 20, totalOrderSum: 29.99 },
          { id: 2, name: 'NOTIFICATION_PAY_LATER_TOTAL_ORDER_SUM_LIST_TEXT_2', orderPayment: 30, totalOrderSum: 30.99 },
          { id: 3, name: 'NOTIFICATION_PAY_LATER_TOTAL_ORDER_SUM_LIST_TEXT_3', orderPayment: 40, totalOrderSum: 40.99 },
          { id: 4, name: 'NOTIFICATION_PAY_LATER_TOTAL_ORDER_SUM_LIST_TEXT_4', orderPayment: 50, totalOrderSum: 50.99 },
          { id: 5, name: 'NOTIFICATION_PAY_LATER_TOTAL_ORDER_SUM_LIST_TEXT_5', orderPayment: 60, totalOrderSum: 500 },
        ],

        ymentMethodSelected: 'NOTIFICATION_PAY_LATER_EASY_PAY_METHOD_SELECTED',
        ttonChatNow: 'NOTIFICATION_BUTTON_CHAT_NOW',
        ttonClose: 'NOTIFICATION_BUTTON_CLOSE',
      }),
    },
  },
}
</script>

<style lang="scss" scoped>
.headline {
  word-break: normal;
}
.schema-list li {
  list-style: disc;
}
</style>
