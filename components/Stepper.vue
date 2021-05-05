<template>
  <div class="stepper-container">
    <v-container class="pa-0" v-if="currentSteps">
      <v-row no-gutters>
        <v-col sm="2" md="2" class="align-center justify-center justify-sm-end d-none d-sm-flex px-1">
          <Button v-if="previousStepLink" :link="`/steps/${previousStepLink}`" :isNuxtLink="true" :buttonText="backButton" :isSmall="true"></Button>
        </v-col>
        <v-col cols="12" sm="8" md="8">
          <v-stepper alt-labels>
            <v-expand-transition>
              <v-stepper-header class="py-0" :class="currentSteps.length == 3 ? 'col-sm-10' : currentSteps.length == 2 ? 'col-sm-6' : 'col-12'">
                <template v-for="(step, index) in currentSteps">
                  <v-stepper-step
                    :key="step.Id"
                    step=""
                    :class="{
                      'passed-or-current-steps': currentStepNumber >= index,
                    }"
                  >
                    {{ $t(step.title) }}
                  </v-stepper-step>
                  <v-divider
                    v-if="currentSteps.length - 1 !== index"
                    :key="step.Id"
                    :class="{
                      'passed-or-current-steps': currentStepNumber > index,
                    }"
                  ></v-divider>
                </template>
              </v-stepper-header>
            </v-expand-transition>
          </v-stepper>
        </v-col>
        <v-col cols="6" sm="2" md="2" class="d-flex align-center justify-center justify-sm-start d-sm-none px-1">
          <Button v-if="previousStepLink" :link="`/steps/${previousStepLink}`" :isNuxtLink="true" :buttonText="backButton" :isSmall="true"></Button>
        </v-col>
        <v-col cols="6" sm="2" md="2" class="d-flex align-center justify-center justify-sm-start px-1">
          <Button
            :isNuxtLink="isLastStep ? false : true"
            :isAnchor="isLastStep ? true : false"
            :anchorClassName="isStepperNextButtonEnabled ? 'white--text ' : 'black--text disabled'"
            :isDisabled="isStepperNextButtonEnabled ? false : true"
            :nuxtLinkClassName="isStepperNextButtonEnabled ? '' : 'disabled'"
            :link="isLastStep ? 'https://www.4team.biz' : `/steps/${nextStepLink}`"
            :buttonClassName="isLastStep && isStepperNextButtonEnabled ? 'green white--text' : ''"
            :buttonText="nextButton"
          >
            ({{ currentStepSelectedCards.length }})
          </Button>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script lang="ts">
export default {
  props: {
    currentSteps: {
      type: Array,
      required: true,
    },
    isLastStep: {
      type: Boolean,
      required: false,
      default: false,
    },
    isStepperNextButtonEnabled: {
      type: Boolean,
      required: false,
      default: true,
    },
    currentStep: {
      type: String,
      required: true,
    },
    currentStepNumber: {
      type: Number,
      required: true,
    },
    currentStepSelectedCards: {
      type: Array,
      required: true,
    },
    currentStepMinCards: {
      type: Number,
      required: true,
    },
    previousStepLink: {
      type: String,
      required: false,
    },
    backButton: {
      type: String,
      required: false,
    },
    nextButton: {
      type: String,
      required: true,
    },
    nextStepLink: {
      type: String,
      required: false,
    },
  },
  computed: {
    // a computed getter
    // lastStepName: function () {
    //   // `this` points to the vm instance
    //   return this.currentSteps[this.currentSteps.length - 1].link
    // },
  },
}
</script>

<style lang="scss">
.v-stepper__header {
  margin: 0 auto;
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
  .passed-or-current-steps .v-stepper__step__step,
  .v-divider.passed-or-current-steps {
    //TODO change to variable
    background: #0d47a1 !important;
    background-color: #0d47a1 !important;
  }
  @media all and (min-width: 320px) and (max-width: 600px) {
    .v-stepper__step {
      flex-basis: 160px !important;
    }
  }
}
</style>