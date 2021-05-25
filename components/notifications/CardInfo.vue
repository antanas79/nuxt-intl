<template>
  <div class="">
    <div class="text-right pl-8 pr-4 pt-4" @click="$emit('closeDialog')">
      <v-btn icon color="black">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    <v-card-title class="text-h5 pt-0 pb-6 pl-8" v-html="$t(data.title)"> </v-card-title>
    <v-card-text class="pb-4 pl-8">
      <p v-html="$t(data.paragraph1)" class="mb-2"></p>
      <p v-if="data.paragraph2" v-html="$t(data.paragraph2)" class="mb-8"></p>
      <div class="current-price red--text text-left">
        <i18n-n tag="div" class="hide-dot-comma-space main d-flex" :value="39.95" format="currency" :locale="selectedCurrency">
          <template v-slot:currency="slotProps">
            <div class="text-h6 currency vertical-align-top">
              <span>{{ slotProps.currency }}</span>
            </div>
          </template>
          <template v-slot:integer="slotProps">
            <span
              class="integer text-h3"
              :class="{ 'text-h5': data.Price > 1000, 'text-h4': data.Price > 100 && data.Price < 1000, 'text-h3': data.Price <= 100 }"
              >{{ slotProps.integer }}</span
            >
          </template>
          <template v-slot:group="slotProps">
            <span class="group">{{ slotProps.group }}</span>
          </template>
          <template v-slot:fraction="slotProps">
            <div class="text-h6 vertical-align-top fraction">
              <span>{{ slotProps.fraction }}</span>
            </div>
          </template>
        </i18n-n>
      </div>
      <div class="min-height-28px pb-8">
        <i18n tag="div" :path="data.oldPriceText" class="text-caption text-left w-100 d-flex" v-if="data.oldPriceText">
          <template v-slot:oldPrice>
            <span class="pl-1">
              <i18n-n tag="div" class="hide-dot-comma-space old-price d-flex" :value="49.95" format="currency" :locale="selectedCurrency">
                <template v-slot:currency="slotProps">
                  <span class="currency text-caption">{{ slotProps.currency }}</span>
                </template>
                <template v-slot:integer="slotProps">
                  <span class="integer text-caption">{{ slotProps.integer }}</span>
                </template>
                <template v-slot:group="slotProps">
                  <span class="group text-caption">{{ slotProps.group }}</span>
                </template>
                <template v-slot:fraction="slotProps">
                  <span class="fraction text-caption">{{ slotProps.fraction }}</span>
                </template>
              </i18n-n>
            </span>
          </template>
          <template v-slot:percentageDiscount>
            <span class="old-price-percentage-discount">20</span>
          </template>
        </i18n>
      </div>
      <i18n tag="div" :path="data.payLater" class="text-caption text-left">
        <template v-slot:paymentAmount>
          <span class="pay-later-price red--text">{{ $n(13, 'currency', selectedCurrency) }}</span>
        </template>
        <template v-slot:numberOfPayments>
          <a class="pay-later-price no-text-decoration blue--text" href="" target="_blank" v-on:click.stop="">
            {{ $t(data.payLaterNumberOfPayments, { numberOfPayments: 3 }) }}
          </a>
        </template>
      </i18n>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="pl-8 py-3 pr-4 d-flex justify-space-between justify-md-end">
      <Button
        buttonClassName="text-subtitle-1"
        color="blue"
        isText
        buttonText="NOTIFICATION_BUTTON_CLOSE"
        eventName="closeDialog"
        @closeDialog="$emit('closeDialog')"
      ></Button>
      <Button buttonClassName="text-subtitle-1" color="primary" buttonText="NOTIFICATION_BUTTON_KEEP_SHOPPING"></Button>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    selectedCurrency: {
      type: String,
      required: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.currency,
.fraction {
  position: relative;
  span {
    position: absolute;
    top: -1px;
  }
}
.min-height-28px {
  min-height: 28px;
}
.hide-dot-comma-space.main {
  font-size: 0;
  div,
  span {
    font-family: 'Amazon Ember' !important;
  }
  .currency {
    width: 12px;
  }
  .fraction {
    width: 24px;
  }
}
</style>
