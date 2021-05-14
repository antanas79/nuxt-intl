<template>
  <v-app>
    <v-main>
      <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
        <v-system-bar color="red" class="justify-center text-caption white--text text-center py-8 py-sm-6 py-md-0 cursor-pointer">
          <span class="mb-0" v-html="$t(bannersData.topBannerText, { currency: bannersData.topBannerTextCurrency, amount: bannersData.topBannerTextAmount })">
          </span>
        </v-system-bar>
        <NavBar :isPricingPage="isPricingPage()" />

        <Dialog notificationName="PayLater">
          <v-system-bar color="gray" height="40" class="justify-center py-10 py-sm-6 py-md-0 cursor-pointer">
            <span class="text-caption mb-0 d-flex">
              <SvgRender :name="bannersData.payLaterIconName" smallIcon />
              <span class="font-weight-bold"
                >{{ $t(bannersData.payLaterBoldedText) }}
                <span class="font-weight-regular">
                  {{
                    $t(bannersData.payLaterMainText, {
                      interestPaymentCount: bannersData.interestPaymentCount,
                      currency: bannersData.currency,
                      amount: bannersData.amount,
                      weeksCount: bannersData.weeksCount,
                    })
                  }}
                </span>

                <span class="blue--text">{{ $t(bannersData.payLaterBlueText) }}</span> <v-icon>mdi-arrow-right</v-icon></span
              >
            </span>
          </v-system-bar>
        </Dialog>

        <v-scroll-x-transition :hide-on-leave="true">
          <Nuxt />
        </v-scroll-x-transition>

        <div ref="stepper" class="stepper" :class="{ 'stepper--sticky': isStepperSticky }">
          <v-divider></v-divider>
          <Stepper
            v-if="isPricingPage() && isLoaded"
            :currentStep="currentStep"
            :currentStepNumber="currentStepNumber"
            :currentStepMinCards="currentStepMinCards"
            :currentStepSelectedCards="currentStepSelectedCards"
            :isStepperNextButtonEnabled="isStepperNextButtonEnabled()"
            :previousStepLink="previousStepLink"
            :nextStepLink="nextStepLink"
            :currentSteps="currentSteps"
            :isLastStep="isLastStep()"
            :backButton="'BACK'"
            :nextButton="'NEXT'"
          />
        </div>

        <v-divider></v-divider>
        <PaymentSection />
        <Footer />
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async fetch() {
    this.posts = await this.$http.$get('https://api.nuxtjs.dev/posts/1')
    console.log(this.posts)
  },
  computed: mapState({
    currentStepSelectedCards: (state) => state.cards.currentStepSelectedCards,
    nextStepLink: (state) => state.steps.nextStepLink,
    previousStepLink: (state) => state.steps.previousStepLink,
    currentSteps: (state) => state.steps.currentSteps,
    currentStep: (state) => state.steps.currentStep,
    currentStepNumber: (state) => state.steps.currentStepNumber,
    currentStepMinCards: (state) => state.steps.currentStepMinCards,
  }),
  data: function () {
    return {
      isLoaded: false,
      scrollY: null,
      headerBottom: 0,
      isStepperSticky: true,
    }
  },
  watch: {
    group() {
      this.drawer = false
    },
    scrollY(newValue) {
      if (newValue - 120 > this.stepperTop) {
        this.isStepperSticky = false
      } else {
        this.isStepperSticky = true
      }
    },
  },
  methods: {
    isPricingPage() {
      return this.$route.path.includes('/steps/')
    },
    isLastStep() {
      return this.currentStep == this.currentSteps[this.currentSteps.length - 1]?.link
    },
    isStepperNextButtonEnabled() {
      return this.currentStepSelectedCards.length >= this.currentStepMinCards
    },
  },
  props: {
    bannersData: {
      default: () => ({
        topBannerText: 'TOP_BANNER',
        // topBannerTextDescription: 'TOP_BANNER_DESCRIPTION',
        topBannerTextCurrency: '$',
        topBannerTextAmount: 30,
        payLaterBoldedText: 'PAY_LATER_BOLDED_TEXT',
        payLaterMainText: 'PAY_LATER_MAIN_TEXT',
        payLaterBlueText: 'PAY_LATER_BLUE_TEXT',
        payLaterIconName: 'pay-later',
        interestPaymentCount: 3,
        currency: '$',
        amount: 10.32,
        weeksCount: 2,
      }),
    },
  },
  mounted() {
    if (process.browser) {
      window.addEventListener('load', () => {
        window.addEventListener('scroll', () => {
          this.scrollY = Math.round(window.scrollY)
        })
        this.stepperTop = this.$refs.stepper?.getBoundingClientRect().top

        console.log(this.stepperTop)
        console.log(this.scrollY)
      })
      setTimeout(() => {
        this.isLoaded = true
      }, 0)
    }
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  min-height: 100vh;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

//style overrides
#app .currency-selection {
  max-width: 160px;
}
#app .currency-selection .v-input__slot {
  padding: 0;
}
.md-app {
  min-height: 350px;
  border: 1px solid rgba(#000, 0.12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
.no-uppercase {
  text-transform: none !important;
}

.no-pointer-events {
  pointer-events: none;
}
.vertical-align-top {
  vertical-align: top;
}
.no-text-decoration {
  text-decoration: none;
}
.cursor-pointer {
  cursor: pointer;
}
.hidden {
  visibility: hidden;
}

.background-grey {
  //TODO change this to something normal
  background-color: #f8f8f8 !important;
  background: #f8f8f8 !important;
}
b {
  display: inline;
}

::v-deep .small-icon {
  display: inline;
}

a.disabled,
button.disabled {
  pointer-events: none;
  opacity: 0.65;
}

@media all and (max-width: 767px) {
  .stepper {
    &--sticky {
      position: fixed;
      bottom: 0;
      width: 100%;
      background: white;
      z-index: 100;
    }
  }
}
</style>
