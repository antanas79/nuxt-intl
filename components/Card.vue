<template>
  <v-col cols="12" sm="6" md="4" class="pa-3">
    <v-hover>
      <template #default="{ hover }">
        <v-card :class="`elevation-${hover ? 24 : 6}`" class="mx-auto d-flex flex-column transition-swing" max-width="344">
          <v-card-title class="mb-6 d-flex justify-start blue darken-4">
            {{ $t(card.title) }}
          </v-card-title>

          <v-card-subtitle class="text-subtitle-1 pt-3 pb-0"> 1 year Free upgrade and support included </v-card-subtitle>

          <v-card-subtitle class="text-subtitle-1 py-0">
            <span class="font-weight-black"> Note: </span>
            1 license can be used when moving data between 2 PCs.
          </v-card-subtitle>

          <v-card-subtitle class="text-subtitle-1 py-0 mb-6">
            <span class="font-weight-black"> $39.95</span>
            $49.95
          </v-card-subtitle>

          <v-card-subtitle class="text-subtitle-1 py-0 mb-6">
            or
            <span class="font-weight-black"> Pay Later</span>
            <span class="font-weight-black" color="primary"> 13.32 x 3 Payments </span>
          </v-card-subtitle>

          <v-card-actions class="d-flex justify-center align-end">
            <v-btn
              outlined
              text
              :rounded="true"
              :disabled="card.isPreSelected"
              :class="customClass"
              color="primary"
              @click="
                $emit('card-toggled', {
                  cardId: card.cardId,
                  currentStep: currentStep,
                  maxCards: currentStepMaxCards,
                  minCards: currentStepMinCards,
                })
              "
              :style="{
                backgroundColor: selectedCards && selectedCards.includes(card.cardId) ? 'lightgrey !important' : '',
              }"
            >
              {{ selectedCards && selectedCards.includes(card.cardId) ? $t(card.buttonTextRemove) : $t(card.buttonTextAdd) }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>
<script lang="ts">
import { mapState } from 'vuex'
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
    customClass: {
      type: String,
      required: true,
    },
    currentStep: {
      type: String,
      required: true,
    },
    currentStepMaxCards: {
      type: Number,
      required: true,
    },
    currentStepMinCards: {
      type: Number,
      required: true,
    },
    selectedCards: {
      type: Array,
      required: false,
    },
  },
  // data: function () {
  //   return {
  //     isLoaded: false
  //   }
  // },
  computed: function () {
    return {
      // isCardSelected: function () {
      //   this.selectedCards && this.selectedCards.includes(this.card.cardId)
      // },
    }
  },
  methods: {
    // a computed getter
    // computedName: function () {
    //   // `this` points to the vm instance
    //   return require('/static/images/svg/sprite.svg#' + this.name)
    // },
    // buildLogoUrl() {
    //   return require(`/static/images/svg/sprite.svg#'${this.name}`);
    // },
  },
  // mounted() {
  //   this.isLoaded = true;
  // }
}
</script>

<style lang="scss" scoped>
</style>