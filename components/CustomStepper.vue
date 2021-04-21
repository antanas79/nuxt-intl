<template>
  <div>
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" sm="2" md="2"> </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-stepper alt-labels>
            <v-stepper-header>
              <template v-for="step of steps">
                <v-stepper-step :key="step.Id" step="">
                  {{ step.fields.title }}
                </v-stepper-step>

                <v-divider :key="step.Id"></v-divider>
              </template>
              <!-- <v-stepper-step step=""> Licenses </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step=""> Upgrades </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step=""> Bundles </v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step=""> Extras </v-stepper-step> -->
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

<style lang="scss">
.v-stepper,
.v-stepper__header {
  box-shadow: none !important;
}
.v-stepper__step span {
  width: 12px;
  height: 12px;
  min-width: 12px;
  margin-top: 6px;
}

@media all and (min-width: 320px) and (max-width: 600px) {
  .v-stepper__step {
    flex-basis: 160px !important;
  }
}
</style>

<script lang="ts">
export default {
  props: ['steps'],
}
</script>
