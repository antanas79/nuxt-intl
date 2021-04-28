<template>
  <div class="stepper-container" v-if="steps">
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col  sm="2" md="2" class="align-center justify-center justify-sm-end d-none d-sm-flex px-1"> 
          <NuxtLink :to="localePath({ path: `/steps/${steps.previousStepLink}` })" v-if="steps.currentStep != 1">
            <v-btn> Back </v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-stepper alt-labels>
            <v-stepper-header>
              <template v-for="(step, index) in steps.steps">
                <v-stepper-step
                  :key="step.Id"
                  step=""
                  :class="{
                    'passed-or-current-steps': steps.currentStep >= step.id,
                  }"
                >
                {{$t(step.title)}}
                </v-stepper-step>
                <v-divider
                  v-if="steps.steps.length - 1 !== index"
                  :key="step.Id"
                  :class="{
                    'passed-or-current-steps': steps.currentStep > step.id,
                  }"
                ></v-divider>
              </template>
            </v-stepper-header>
          </v-stepper>
        </v-col>
         <v-col cols="6" sm="2" md="2" class="d-flex align-center justify-center justify-sm-start d-sm-none px-1"> 
              <NuxtLink :to="localePath({ path: `/steps/${steps.previousStepLink}` })" v-if="steps.currentStep != 1">
                <v-btn> Back </v-btn>
              </NuxtLink>
        </v-col>
        <v-col
          cols="6"
          sm="2"
          md="2"
          class="d-flex align-center justify-center justify-sm-start px-1"
        >
        <NuxtLink :class="cards.currentStepSelectedCards.length > 0 ? '': 'disabled'" v-if="steps.currentStep < steps.steps.length" :to="localePath({ path: `/steps/${steps.nextStepLink}` })" >
          <v-btn :class="cards.currentStepSelectedCards.length > 0 ? 'primary': ''"> 
              Next ({{cards.currentStepSelectedCards.length }}) 
          </v-btn>
        </NuxtLink>

          <v-btn :disabled="cards.currentStepSelectedCards.length === 0" v-if="steps.currentStep === steps.steps.length" :class="cards.currentStepSelectedCards.length > 0 ? 'primary': ''"> 
            <a :class="cards.currentStepSelectedCards.length > 0 ? 'white--text': 'black--text disabled'" href="http://www.4team.biz/" >Submit ({{cards.currentStepSelectedCards.length }}) </a>
          </v-btn>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
import { mapState } from "vuex";
export default {
  computed: {
  ...mapState(['steps', 'cards']),
  },
}
</script>

<style lang="scss">
// $color-pack: false;
// @import '../node_modules/vuetify/src/styles/main.sass';
.disabled {
   pointer-events: none;
   opacity: 0.5;
}
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