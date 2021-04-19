<template>
<div>
 <v-stepper alt-labels>
            <v-stepper-header>
              <v-stepper-step step="1">
                Licenses
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="2">
                Upgrades
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">
                Bundles
              </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="4">
                Extras
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
</div>
  
</template>

<style lang="scss" scoped>
 div:not(.v-card) {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    .v-card {
      width:320px;
    }
  }
</style>

<script lang="ts">
   export default {}
</script>