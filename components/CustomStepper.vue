<template>
  <div class="stepper-container" v-if="steps">
    <v-container class="pa-0">
      <v-row no-gutters>
        <v-col sm="2" md="2" class="align-center justify-center justify-sm-end d-none d-sm-flex px-1"> 
          <NuxtLink :to="localePath({ path: `/steps/${steps.previousStepLink}` })" v-if="steps.previousStepLink">
            <v-btn rounded small> {{$t("BACK")}} </v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-stepper alt-labels>
                 <v-expand-transition>
            <v-stepper-header :class="steps.currentSteps.length == 3 ? 'col-sm-10': (steps.currentSteps.length == 2 ? 'col-sm-6':'col-12')">
              <template v-for="(step, index) in steps.currentSteps">
                <v-stepper-step
                  :key="step.Id"
                  step=""
                  :class="{
                    'passed-or-current-steps': steps.currentStepNumber >= index,
                  }"
                >
                {{$t(step.title)}}
                </v-stepper-step>
                <v-divider
                  v-if="steps.currentSteps.length - 1 !== index"
                  :key="step.Id"
                  :class="{
                    'passed-or-current-steps': steps.currentStepNumber > index,
                  }"
                ></v-divider>
              </template>
            </v-stepper-header>
               </v-expand-transition>
          </v-stepper>
        </v-col>
         <v-col cols="6" sm="2" md="2" class="d-flex align-center justify-center justify-sm-start d-sm-none px-1"> 
              <NuxtLink :to="localePath({ path: `/steps/${steps.previousStepLink}` })" v-if="steps.previousStepLink">
                <v-btn rounded small> {{$t("BACK")}}</v-btn>
              </NuxtLink>
        </v-col>
        <v-col
          cols="6"
          sm="2"
          md="2"
          class="d-flex align-center justify-center justify-sm-start px-1"
        >
        <NuxtLink :class="cards.currentStepSelectedCards.length > 0 ? '': 'disabled'" v-if="steps.currentStep != steps.currentSteps[steps.currentSteps.length - 1].link" :to="localePath({ path: `/steps/${steps.nextStepLink}` })" >
          <v-btn rounded :class="cards.currentStepSelectedCards.length > 0 ? 'primary': ''"> 
              {{$t("NEXT")}} ({{cards.currentStepSelectedCards.length }}) 
          </v-btn>
        </NuxtLink>

        <v-btn rounded :disabled="cards.currentStepSelectedCards.length === 0" v-if="steps.currentStep == steps.currentSteps[steps.currentSteps.length - 1].link" :class="cards.currentStepSelectedCards.length > 0 ? 'green': ''"> 
            <a :class="cards.currentStepSelectedCards.length > 0 ? 'white--text': 'black--text disabled'" href="http://www.4team.biz/" >{{$t("NEXT")}} ({{cards.currentStepSelectedCards.length }}) </a>
        </v-btn>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
export default {
  props: {  
      cards: {
        type: Object,
        required: true
      },
      steps: {
        type: Object,
        required: true
      },
  },
  // computed: {
  //     lastStepName: (steps) => {steps.currentSteps[steps.currentSteps.length - 1].link}
  // },
   computed: {
    // a computed getter
    // lastStepName: function () {
    //   // `this` points to the vm instance
    //   return this.steps.currentSteps[this.steps.currentSteps.length - 1].link
    // }
  }
}

</script>

<style lang="scss">
// $color-pack: false;
// @import '../node_modules/vuetify/src/styles/main.sass';
 .v-stepper__header{
    margin: 0 auto;
}
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
// @media all and (min-width: 600px){
//  .v-stepper__header{
//     margin: 0 auto;
//   }
// }
@media all and (min-width: 320px) and (max-width: 600px) {
  .v-stepper__step {
    flex-basis: 160px !important;
    }
  }
}
</style>