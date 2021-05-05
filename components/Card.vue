<template>
  <v-col :cols="cols" :sm="colsSm" :md="colsMd" class="pa-0">
    <v-hover>
      <template #default="{ hover }">
        <v-card :class="`elevation-${hover ? 24 : 6}`" class="mx-auto d-flex flex-column transition-swing" :max-width="maxWidth">
          <v-card-title class="mb-6 d-flex justify-start blue darken-4" v-if="card.title">
            {{ $t(card.title) }}
          </v-card-title>
          <slot />
          <v-card-actions class="d-flex justify-center align-end">
            <Button
              :hasButton="hasButton"
              :isDisabled="card.isPreSelected"
              color="primary"
              :isOutlined="true"
              :isText="true"
              :buttonClassName="buttonClassName"
              :buttonText="buttonText"
              eventName="card-button-clicked"
              :payload="payload"
              @card-button-clicked="onCardButtonClicked"
            >
            </Button>
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