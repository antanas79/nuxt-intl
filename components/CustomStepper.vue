<template>
  <div>
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" sm="2" md="2"> </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-stepper alt-labels>
            <v-stepper-header>
              <v-stepper-step step="1"> Licenses </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2"> Upgrades </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3"> Bundles </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4"> Extras </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-col>
        <v-col
          cols="12"
          sm="2"
          md="2"
          class="d-flex align-center justify-center justify-sm-end"
        >
          <v-btn> Next </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.v-stepper,
.v-stepper__header {
  box-shadow: none;
}
</style>

<script lang="ts">
export default {}
</script>
