<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card :class="`${!card.isPreSelected && (hover || isSelected) ? 'border-blue' : 'border-white'} ${cardClass} `">
        <Dialog
          :width="600"
          notificationName="CardInfo"
          :className="dialogClass"
          :selectedCurrency="selectedCurrency.name"
          :data="card"
          contentClass="ma-0 ma-sm-6 align-self-sm-center align-self-end"
        >
          <v-card-title class="mb-0 pa-1 d-flex flex-column" v-if="card.title" :class="titleClass">
            <v-system-bar
              :color="card.IsLimitedTimeOffer ? 'red' : card.IsRecommended ? 'green' : ''"
              :class="`d-flex align-self-end ${card.IsRecommended || card.IsLimitedTimeOffer ? '' : 'hidden'}`"
              height="21"
            >
              <i18n tag="span" :path="card.Disclaimer" class="white--text text-caption text-uppercase" v-if="card.IsLimitedTimeOffer || card.IsRecommended">
                <template v-slot:disclaimerDiscount v-if="card.IsLimitedTimeOffer">
                  <span>{{ card.DisclaimerDiscount }}</span>
                </template>
              </i18n>
            </v-system-bar>

            <div class="d-flex flex-column px-3 align-self-start">
              <div class="d-flex align-self-start">
                <div class="text-no-wrap" :title="$t(card.TitleLine1)" v-html="$t(card.TitleLine1)"></div>
                <v-icon :color="iconColor" v-if="card.IconName" :class="iconClass">mdi-{{ card.IconName }}</v-icon>
              </div>
              <div class="d-none d-md-flex align-self-start min-height-32px">
                <div class="blue--text text-caption" v-if="card.BenefitsText" v-html="$t(card.BenefitsText)"></div>
                <div v-else v-html="$t(card.TitleLine2)"></div>
              </div>
            </div>
          </v-card-title>
          <v-card-subtitle class="text-subtitle-1 paragraph-1 pt-4 pb-0 text-left d-none d-md-block">
            <span :class="{ 'blue--text': card.TypeOfParagraph1 == 'why' }" v-html="$t(card.Paragraph1)"> </span>
            <span v-if="card.TypeOfParagraph1 == 'list'"
              ><span class="blue--text" v-for="(item, index) in card.WhatsIncludedList" :key="item">
                {{ item }}<span class="black--text" v-if="index !== card.WhatsIncludedList.length - 1">,</span>
              </span>
            </span>
          </v-card-subtitle>
          <v-card-subtitle class="text-subtitle-1 paragraph-2 pt-0 pb-0 text-left d-none d-md-block">
            <span :class="{ 'blue--text': card.TypeOfParagraph2 == 'why' }" v-html="$t(card.Paragraph2)"> </span>
            <span v-if="card.TypeOfParagraph2 == 'list'"
              ><span class="blue--text" v-for="(item, index) in card.WhatsIncludedList" :key="item">
                {{ item }}<span class="black--text" v-if="index !== card.WhatsIncludedList.length - 1">,</span>
              </span>
            </span>
          </v-card-subtitle>
        </Dialog>
        <v-card-actions
          class="d-flex flex-column justify-center align-end cursor-pointer"
          @click="onPricingCardToggled"
          :class="card.IsPreSelected ? 'no-pointer-events' : ''"
        >
          <v-card-text class="text-subtitle-1 pt-0 pt-md-3 pb-0">
            <div class="d-flex flex-wrap">
              <div class="current-price red--text col-5 pa-0 text-left">
                <i18n-n tag="div" class="hide-dot-comma-space main d-flex" :value="39.95" format="currency" :locale="selectedCurrency.name">
                  <template v-slot:currency="slotProps">
                    <div class="text-h6 currency vertical-align-top">
                      <span>{{ slotProps.currency }}</span>
                    </div>
                  </template>
                  <template v-slot:integer="slotProps">
                    <span
                      class="integer text-h3"
                      :class="{
                        'text-h5': card.PriceWithDiscount > 1000,
                        'text-h4': card.PriceWithDiscount > 100 && card.PriceWithDiscount < 1000,
                        'text-h3': card.PriceWithDiscount <= 100,
                      }"
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
              <Button
                :isDisabled="card.IsPreSelected"
                color="primary"
                :isOutlined="true"
                :isText="true"
                :buttonClassName="`${buttonClassName} d-md-none d-flex align-self-end ml-auto text-caption`"
                :buttonText="payload.maxCards > 1 ? (isSelected ? 'REMOVE' : 'ADD_TO_CART') : isSelected ? 'SELECTED' : 'SELECT'"
                :iconName="card.IsPreSelected ? 'lock' : ''"
              >
              </Button>
              <div class="current-price black--text text-caption col-7 pa-0 d-flex" v-if="card.OrPayLaterText && card.PayLaterNumberOfPaymentsText">
                <v-divider vertical class="d-none d-md-block"></v-divider>
                <div>
                  <i18n tag="div" :path="card.OrPayLaterText" class="text-caption text-left pl-3 d-none d-md-block">
                    <template v-slot:br>
                      <br />
                    </template>
                    <template v-slot:paymentAmount>
                      <span class="pay-later-price text-underlined red--text">{{ $n(13, 'currency', selectedCurrency.name) }}</span>
                    </template>
                    <template v-slot:numberOfPayments>
                      <a class="pay-later-price no-text-decoration blue--text" href="" target="_blank" v-on:click.stop="">
                        {{ $t(card.PayLaterNumberOfPaymentsText, { numberOfPayments: 3 }) }}
                      </a>
                    </template>
                  </i18n>
                </div>
              </div>
            </div>
            <div class="min-height-28px">
              <i18n tag="div" :path="card.OldPriceText" class="grey--text text-caption text-left w-100 d-flex" v-if="card.OldPriceText">
                <template v-slot:oldPrice>
                  <span class="text-underlined pl-1">
                    <i18n-n tag="div" class="hide-dot-comma-space old-price d-flex" :value="49.95" format="currency" :locale="selectedCurrency.name">
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
          </v-card-text>
          <v-card-text class="py-3 d-none d-md-flex justify-center">
            <Button
              :isDisabled="card.IsPreSelected"
              color="primary"
              :isOutlined="true"
              :isText="true"
              :buttonClassName="`${buttonClassName}`"
              :buttonText="payload.maxCards > 1 ? (isSelected ? 'REMOVE' : 'ADD_TO_CART') : isSelected ? 'SELECTED' : 'SELECT'"
              :iconName="card.IsPreSelected ? 'lock' : ''"
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
      default: 'upper-part',
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

.currency,
.fraction {
  position: relative;
  span {
    position: absolute;
    top: -1px;
  }
}

.text-subtitle-1 {
  line-height: 1.45rem;
  color: #383838 !important;
}

@media all and (min-width: 0px) and (max-width: 400px) {
  .v-card {
    width: 290px;
  }
}

@media all and (min-width: 400px) and (max-width: 767px) {
  .v-card {
    width: 353px;
  }
}
@media all and (max-width: 767px) {
  .v-card {
    .v-card__title {
      min-height: 84px;
    }
    .v-card__actions {
      min-height: 88px;
    }
  }
}
@media all and (min-width: 768px) {
  .v-card {
    width: 308px;
    max-width: 308px;
    height: 362px;
    .upper-part {
      height: calc(100% - 144px);
    }
    .paragraph-1 {
      min-height: 64px;
    }
    .paragraph-2 {
      min-height: 84px;
    }
    .v-card__actions {
      min-height: 144px;
    }
  }
}
</style>
