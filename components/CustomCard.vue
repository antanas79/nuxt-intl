<template>
  <div>
    <v-container class="lighten-5 pa-0">
      <v-row no-gutters>
        <v-col
          v-for="(item, index) in [1, 2, 3]"
          :key="item"
          :data="item"
          cols="12"
          sm="6"
          md="4"
          class="pa-3"
        >
          <v-hover>
            <template #default="{ hover }">
              <v-card
                :class="`elevation-${hover ? 24 : 6}`"
                class="mx-auto d-flex flex-column transition-swing"
                max-width="344"
              >
                <v-card-title
                  class="col-12 mb-6 d-flex justify-start blue darken-4"
                >
                  License
                </v-card-title>

                <v-card-subtitle class="text-subtitle-1 pt-3 pb-0">
                  1 year Free upgrade and support included
                </v-card-subtitle>

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
                  <span class="font-weight-black" color="primary">
                    13.32 x 3 Payments
                  </span>
                </v-card-subtitle>

                <v-card-actions class="d-flex justify-center align-end">
                  <v-btn color="primary lighten-2" class="" text outlined 
                    @click="$store.commit('cards/toggleCard', index)"
                  >
                    {{cards.selectedCards.includes(index)  ? 'Selected' : 'Select'}}
                  </v-btn>

                </v-card-actions>
              </v-card>
                           
            </template>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script lang="ts">

import { mapState } from "vuex";
export default {
  props: {  
      selectedCardId: {
        type: [Number],
        required: false
      }
  },
  computed: {
      ...mapState(['cards']),  
  },
  methods: {
      // toggleCard (index) {
      //     if (process.browser) {
      //       this.$store.commit('cards/toggleCard', index)
      //     }
      // }
  }
}
</script>

<style lang="scss" scoped>
div:not(.v-card) > {
  width: 100%;
  display: flex;
}
</style>
