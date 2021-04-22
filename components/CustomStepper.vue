<template>
  <div class="stepper-container">
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col  sm="2" md="2" class="align-center justify-center justify-sm-end d-none d-sm-flex px-1"> 
          <NuxtLink :to="localePath({ path: `/steps/${currentStep - 1}` })" v-if="currentStep != 1">
            <v-btn> Back </v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-stepper alt-labels>
            <v-stepper-header>
              <template v-for="(step, index) in steps">
                <v-stepper-step
                  :key="step.fields.Id"
                  step=""
                  :class="{
                    'passed-or-current-steps': currentStep >= step.fields.id,
                  }"
                >
                {{step.fields.title}}
                </v-stepper-step>
                <v-divider
                  v-if="steps.length - 1 !== index"
                  :key="step.fields.Id"
                  :class="{
                    'passed-or-current-steps': currentStep > step.fields.id,
                  }"
                ></v-divider>
              </template>
            </v-stepper-header>
          </v-stepper>
        </v-col>
         <v-col cols="6" sm="2" md="2" class="d-flex align-center justify-center justify-sm-start d-sm-none px-1"> 
              <NuxtLink :to="localePath({ path: `/steps/${currentStep - 1}` })" v-if="currentStep != 1">
                <v-btn> Back </v-btn>
              </NuxtLink>
        </v-col>
        <v-col
          cols="6"
          sm="2"
          md="2"
          class="d-flex align-center justify-center justify-sm-start px-1"
        >
        <NuxtLink :to="localePath({ path: `/steps/${currentStep + 1}` })">
          <v-btn> Next </v-btn>
        </NuxtLink>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss">
// $color-pack: false;
// @import '../node_modules/vuetify/src/styles/main.sass';
.stepper-container {
a {
  text-decoration: none;
}
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
.passed-or-current-steps .v-stepper__step__step,  .v-divider.passed-or-current-steps {
  //TODO change to variable
  background: #0D47A1!important;
  background-color: #0D47A1!important;
}

@media all and (min-width: 320px) and (max-width: 600px) {
  .v-stepper__step {
    flex-basis: 160px !important;
  }
}

}
</style>

<script lang="ts">
export default {
  //TODO 
  props: {  
      steps: {
        type: Array,
        required: true
      },
      currentStep: {
        type: [Number],
        required: true
      }
  }
}
</script>
