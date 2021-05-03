<template>
  <div class="stepper-container">
    <v-container class="pa-0" v-if="currentSteps">
      <v-row no-gutters>
        <v-col sm="2" md="2" class="align-center justify-center justify-sm-end d-none d-sm-flex px-1">
          <NuxtLink :to="localePath({ path: `/steps/${previousStepLink}` })" v-if="previousStepLink">
            <v-btn rounded small> {{ $t(backButton) }} </v-btn>
          </NuxtLink>
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
          <NuxtLink :to="localePath({ path: `/steps/${previousStepLink}` })" v-if="previousStepLink">
            <v-btn rounded small> {{ $t(backButton) }}</v-btn>
          </NuxtLink>
        </v-col>
        <v-col cols="6" sm="2" md="2" class="d-flex align-center justify-center justify-sm-start px-1">
          <NuxtLink
            :class="currentStepSelectedCards.length < currentStepMinCards ? 'disabled' : ''"
            v-if="currentStep != currentSteps[currentSteps.length - 1].link"
            :to="localePath({ path: `/steps/${nextStepLink}` })"
          >
            <v-btn rounded :class="currentStepSelectedCards.length > 0 ? 'primary' : ''"> {{ $t(nextButton) }} ({{ currentStepSelectedCards.length }}) </v-btn>
          </NuxtLink>

          <v-btn
            rounded
            :disabled="currentStepSelectedCards.length < currentStepMinCards"
            v-if="currentStep == currentSteps[currentSteps.length - 1].link"
            :class="currentStepSelectedCards.length > 0 ? 'green' : ''"
          >
            <a :class="currentStepSelectedCards.length > 0 ? 'white--text' : 'black--text disabled'" href="http://www.4team.biz/"
              >{{ $t(nextButton) }} ({{ currentStepSelectedCards.length }})
            </a>
          </v-btn>
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
      required: true,
    },
    nextButton: {
      type: String,
      required: true,
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