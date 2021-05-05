<template>
  <v-col :cols="cols" :sm="colsSm" :md="colsMd" class="pa-0">
    <v-hover>
      <template #default="{ hover }">
        <v-card :class="`${hover && isPricingCard ? 'border-blue' : 'border-white'} ${cardClass}`" :max-width="maxWidth">
          <slot />
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
    cardClass: {
      type: String,
      required: false,
    },
    isPricingCard: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    // onCardButtonClicked: function (event) {
    //   this.$emit(event)
    // },
  },
})
</script>

<style lang="scss" scoped>
.border-blue {
  border: 2px solid #7aaad6;
}
.border-white {
  border: 2px solid transparent;
}
</style>