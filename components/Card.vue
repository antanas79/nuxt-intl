<template>
  <v-col :cols="cols" :sm="colsSm" :md="colsMd" class="pa-0">
    <v-hover>
      <template #default="{ hover }">
        <v-card :class="`elevation-${hover ? 24 : 6} ${cardClass}`" :max-width="maxWidth">
          <Dialog :maxWidth="600" :cols="12" :class="dialogClass">
            <v-card-title class="mb-6 d-flex justify-start" v-if="card.title" :class="titleClass">
              {{ $t(card.title) }} <v-icon :color="iconColor" v-if="iconName" :class="iconClass">mdi-{{ iconName }}</v-icon>
            </v-card-title>
            <v-card-subtitle v-if="card.subtitle" class="text-subtitle-1 pt-3 pb-0"> 1 year Free upgrade and support included </v-card-subtitle>
            <v-card-subtitle v-else class="text-subtitle-1 pt-3 pb-0"> 1 year Free upgrade and support included </v-card-subtitle>
            <slot />
          </Dialog>

          <v-divider></v-divider>
          <v-card-actions class="d-flex flex-column justify-center align-end">
            <v-card-text class="text-subtitle-1 pt-3 pb-0">
              <div class="d-flex">
                <div class="current-price red--text text-h4 col-5 pa-0 text-left">
                  $39.95
                  <!-- <div class="current-price-cents red--text text-h6 flex align-start">95</div> -->
                </div>

                <div class="current-price black--text text-caption col-7 pa-0 d-flex">
                  <v-divider vertical></v-divider>
                  <div>
                    <i18n tag="div" path="OR_PAY_LATER" class="text-caption text-left pl-2">
                      <template v-slot:br>
                        <br />
                      </template>
                      <template v-slot:paymentAmount>
                        <span class="old-price text-underlined red--text">$13</span>
                      </template>
                      <template v-slot:numberOfPayments>
                        <span class="old-price text-underlined blue--text">
                          {{ $t('X_NUMBER_OF_PAYMENTS', { numberOfPayments: 3 }) }}
                        </span>
                      </template>
                    </i18n>
                  </div>
                </div>
              </div>

              <i18n tag="div" path="OLD_PRICE" class="text-caption text-left w-100">
                <template v-slot:oldPrice>
                  <span class="old-price text-underlined">$49.95</span>
                </template>
                <template v-slot:percentageDiscount>
                  <span class="old-price-percentage-discount">20</span>
                </template>
              </i18n>
            </v-card-text>
            <v-card-text class="text-subtitle-1 pt-3 pb-0">
              <Button
                :hasButton="hasButton"
                :isDisabled="card.isPreSelected"
                color="primary"
                :isOutlined="true"
                :isText="true"
                :buttonClassName="`${buttonClassName}`"
                :buttonText="buttonText"
                eventName="card-button-clicked"
                :payload="payload"
                @card-button-clicked="onCardButtonClicked"
              >
              </Button
            ></v-card-text>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>
<script lang="ts">
import { mapState } from 'vuex'
import Vue from 'vue'
export default Vue.extend({
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
    cardClass: {
      type: String,
      required: false,
    },
  },
  methods: {
    onCardButtonClicked: function (event) {
      this.$emit(this.eventName, event)
    },
  },
})
</script>

<style lang="scss" scoped>
</style>