<template>
  <div class="stepper-container container py-3 py-md-0">
    <div class="pa-0" v-if="currentSteps && currentStep && currentStepMinCards">
      <v-row no-gutters>
        <v-col cols="5" sm="3" md="2" class="d-flex align-center justify-center justify-sm-end px-1">
          <Button
            :title="backButton"
            v-if="previousStepLink"
            :link="`/steps/${previousStepLink}`"
            :isNuxtLink="true"
            :buttonText="backButton"
            :isSmall="true"
          ></Button>
        </v-col>
        <v-col cols="2" sm="6" md="8" class="d-flex flex-column justify-center">
          <v-stepper alt-labels>
            <v-expand-transition>
              <v-stepper-header
                class="pa-0 d-flex justify-center align-items-center"
                :class="currentSteps.length == 3 ? 'col-8' : currentSteps.length == 2 ? 'col-6' : 'col-10'"
              >
                <template v-for="(step, index) in currentSteps">
                  <v-stepper-step
                    :key="'step' + index"
                    step=""
                    :class="{
                      'passed-or-current-steps': currentStepNumber >= index,
                    }"
                  >
                    {{ $t(step.Title) }}
                  </v-stepper-step>
                  <v-divider
                    v-if="currentSteps.length - 1 !== index"
                    :key="'divider' + index"
                    :class="{
                      'passed-or-current-steps': currentStepNumber > index,
                    }"
                  ></v-divider>
                </template>
              </v-stepper-header>
            </v-expand-transition>
          </v-stepper>
        </v-col>
        <v-col cols="5" sm="3" md="2" class="d-flex align-center justify-center justify-sm-start px-1">
          <Button
            :title="nextButton"
            :isNuxtLink="isLastStep ? false : true"
            :isAnchor="isLastStep ? true : false"
            :anchorClassName="isStepperNextButtonEnabled ? 'white--text' : 'black--text disabled'"
            :isDisabled="isStepperNextButtonEnabled ? false : true"
            :nuxtLinkClassName="isStepperNextButtonEnabled ? '' : 'disabled'"
            :link="isLastStep ? 'https://www.4team.biz' : `/steps/${nextStepLink}`"
            :buttonClassName="isLastStep && isStepperNextButtonEnabled ? 'green white--text' : 'primary'"
            :buttonText="nextButton"
          >
            <span v-if="currentStepSelectedCards.length > 0"> ({{ currentStepSelectedCards.length }}) </span>
          </Button>
        </v-col>
      </v-row>
    </div>
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
    nextStepLink: {
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
  },
  computed: {},
}
</script>

<style lang="scss">
.v-stepper__header {
  margin: 0 auto;
}

.v-stepper__label {
  font-size: 0.75rem !important;
  font-weight: 400;
  line-height: 1.25rem;
  letter-spacing: 0.0333333333em !important;
  font-family: 'Roboto', sans-serif !important;
}

.v-stepper__step {
  flex-basis: 170px !important;
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
  @media all and (max-width: 767px) {
    .v-stepper__step {
      flex-basis: 0px !important;
      padding: 2px;
      span {
        width: 6px;
        height: 6px;
        min-width: 6px;
        min-height: 6px;
      }
    }
    hr.v-divider.theme--light {
      display: none;
    }
  }
}
</style>