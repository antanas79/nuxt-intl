<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card :class="`${!card.isPreSelected && (hover || isSelected) ? 'border-blue' : 'border-white'} ${cardClass} `">
        <Dialog :maxWidth="600" :cols="12" :class="dialogClass">
          <v-card-title class="mb-0 pa-1 d-flex flex-column" v-if="card.title" :class="titleClass">
            <v-system-bar
              :color="card.isLimitedTimeOffer ? 'red' : card.isRecommended ? 'green' : ''"
              :class="`d-flex align-self-end ${card.isRecommended || card.isLimitedTimeOffer ? '' : 'hidden'}`"
              height="21"
            >
              <i18n tag="span" :path="card.disclaimer" class="white--text text-caption text-uppercase" v-if="card.isLimitedTimeOffer || card.isRecommended">
                <template v-slot:disclaimerDiscount v-if="card.isLimitedTimeOffer">
                  <span>{{ card.disclaimerDiscount }}</span>
                </template>
              </i18n>
            </v-system-bar>

            <div class="d-flex flex-column px-3 align-self-start">
              <div class="d-flex align-self-start">
                <div class="text-no-wrap" :title="$t(card.title)" v-html="$t(card.title)"></div>
                <v-icon :color="iconColor" v-if="card.iconName" :class="iconClass">mdi-{{ iconName }}</v-icon>
              </div>
              <div class="d-none d-md-flex align-self-start min-height-32px">
                <div v-html="$t(card.titleLine2)"></div>
              </div>
            </div>
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1 pt-2 pb-0 text-left d-none d-md-block" v-html="$t(card.paragraph1)"></v-card-subtitle>
          <v-card-subtitle class="text-subtitle-1 pt-0 pb-0 text-left d-none d-md-block" v-html="$t(card.paragraph2)"></v-card-subtitle>
        </Dialog>

        <v-card-actions
          class="d-flex flex-column justify-center align-end cursor-pointer"
          @click="onPricingCardToggled"
          :class="card.isPreSelected ? 'no-pointer-events' : ''"
        >
          <v-card-text class="text-subtitle-1 pt-3 pb-0">
            <div class="d-flex flex-wrap">
              <div class="current-price red--text col-5 pa-0 text-left">
                <i18n-n :value="39.95" format="currency" :locale="selectedCurrency.name">
                  <template v-slot:currency="slotProps">
                    <span class="text-h6 vertical-align-top">{{ slotProps.currency }}</span>
                  </template>
                  <template v-slot:integer="slotProps">
                    <span class="text-h4">{{ slotProps.integer }}</span>
                  </template>
                  <template v-slot:group="slotProps">
                    <span class="group">{{ slotProps.group }}</span>
                  </template>
                  <template v-slot:fraction="slotProps">
                    <span class="text-h6 vertical-align-top">{{ slotProps.fraction }}</span>
                  </template>
                </i18n-n>
              </div>
              <Button
                :isDisabled="card.isPreSelected"
                color="primary"
                :isOutlined="true"
                :isText="true"
                :buttonClassName="`${buttonClassName} d-md-none d-flex align-self-end ml-auto text-caption`"
                :buttonText="buttonText"
                :iconName="card.isPreSelected ? 'lock' : ''"
              >
              </Button>
              <div class="current-price black--text text-caption col-7 pa-0 d-flex" v-if="card.payLater && card.payLaterNumberOfPayments">
                <v-divider vertical class="d-none d-md-block"></v-divider>
                <div>
                  <i18n tag="div" :path="card.payLater" class="text-caption text-left pl-3 d-none d-md-block">
                    <template v-slot:br>
                      <br />
                    </template>
                    <template v-slot:paymentAmount>
                      <span class="old-price text-underlined red--text">{{ $n(13, 'currency', selectedCurrency.name) }}</span>
                    </template>
                    <template v-slot:numberOfPayments>
                      <a class="old-price no-text-decoration blue--text" href="" target="_blank" v-on:click.stop="">
                        {{ $t(card.payLaterNumberOfPayments, { numberOfPayments: 3 }) }}
                      </a>
                    </template>
                  </i18n>
                </div>
              </div>
            </div>
            <div class="min-height-28px">
              <i18n tag="div" :path="card.oldPriceText" class="text-caption text-left w-100" v-if="card.oldPriceText">
                <template v-slot:oldPrice>
                  <span class="old-price text-underlined">{{ $n(49.95, 'currency', selectedCurrency.name) }}</span>
                </template>
                <template v-slot:percentageDiscount>
                  <span class="old-price-percentage-discount">20</span>
                </template>
              </i18n>
            </div>
          </v-card-text>
          <v-card-text class="text-subtitle-1 pt-3 pb-0 d-none d-md-flex justify-center">
            <Button
              :isDisabled="card.isPreSelected"
              color="primary"
              :isOutlined="true"
              :isText="true"
              :buttonClassName="`${buttonClassName}`"
              :buttonText="buttonText"
              :iconName="card.isPreSelected ? 'lock' : ''"
            >
            </Button
          ></v-card-text>
        </v-card-actions>
      </v-card>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
export default Vue.extend({
  components: {},
  props: {
    card: {
      type: Object,
      required: true,
    },
    titleClass: {
      type: String,
      required: false,
    },
    dialogClass: {
      type: String,
      required: false,
    },
    showTitle: {
      type: Boolean,
      required: false,
      default: true,
    },
    cardClass: {
      type: String,
      required: false,
    },
    maxWidth: {
      type: Number,
      required: false,
      default: 0,
    },
    cols: {
      type: Number,
      required: false,
      default: 12,
    },
    colsSm: {
      type: Number,
      required: false,
    },
    colsMd: {
      type: Number,
      required: false,
    },
    payload: {
      type: Object,
      required: false,
    },
    eventName: {
      type: String,
      required: true,
    },
    buttonClassName: {
      type: String,
      required: false,
    },
    buttonText: {
      type: String,
      required: false,
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    iconName: {
      type: String,
      required: false,
    },
    iconColor: {
      type: String,
      required: false,
    },
    iconClass: {
      type: String,
      required: false,
    },
    selectedCurrency: {
      type: Object,
      required: true,
    },
    slotProps: {
      type: Object,
      required: false,
      default: () => ({
        currency: 'EUR',
        integer: 100,
        group: 234,
        fraction: '00',
      }),
    },
  },

  methods: {
    onPricingCardToggled(event) {
      this.$emit('pricing-card-toggled', this.payload)
    },
  },
  watch: {},
})
</script>

<style scoped lang="scss">
.border-blue {
  border: 2px solid #7aaad6;
}
.border-white {
  border: 2px solid transparent;
}
.min-height-32px {
  min-height: 32px;
}
.min-height-28px {
  min-height: 28px;
}

@media all and (min-width: 0px) and (max-width: 400px) {
  .v-card {
    height: 176px;
    width: 290px;
  }
}

@media all and (min-width: 400px) and (max-width: 767px) {
  .v-card {
    height: 176px;
    width: 353px;
  }
}
@media all and (min-width: 768px) {
  .v-card {
    width: 308px;
    max-width: 308px;
    height: 362px;
  }
}
</style>