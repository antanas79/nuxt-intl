<template>
  <div>
    <v-container class="lighten-5 pa-0">
      <v-row no-gutters>
        <v-col
          v-for="item of [1, 2, 3]"
          :key="item"
          :data="item"
          cols="12"
          sm="6"
          md="4"
          class="pa-3"
        >
          <!-- <v-system-bar
            v-if="item == 1"
            class="mx-auto"
            color="red"
          ></v-system-bar>
          <v-system-bar v-else class="mx-auto"></v-system-bar> -->
          <v-card class="mx-auto" max-width="344">
            <v-card-title> License </v-card-title>

            <v-card-subtitle> 1,000 miles of wonder </v-card-subtitle>

            <v-card-actions class="d-flex justify-center align-end">
              <v-btn color="primary lighten-2" class="" text outlined>
                Select
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
div:not(.v-card) > {
  width: 100%;
  display: flex;
}
</style>

<script lang="ts">
export default {}
</script>
