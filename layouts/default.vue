<template>
  <v-app :class="selectedLocale.code">
    <v-main>
      <v-card class="mx-auto overflow-hidden" height="100%" width="100%">
        <v-system-bar color="red" class="justify-center text-caption white--text text-center py-8 py-sm-6 px-0 py-md-0 cursor-pointer">
          <Layout>
            <span class="mb-0" v-html="$t(bannersData.topBannerText, { currency: bannersData.topBannerTextCurrency, amount: bannersData.topBannerTextAmount })">
            </span>
          </Layout>
        </v-system-bar>
        <NavBar :isPricingPage="isPricingPage()" />
        <!--  <Dialog notificationName="UpgradeSupport" :width="1000"> -->
        <Dialog notificationName="PayLater" :width="540">
          <v-system-bar color="gray" height="40" class="justify-center py-10 py-sm-6 py-lg-0 px-0 cursor-pointer">
            <Layout>
              <span class="text-body-2 mb-0 d-inline text-center">
                <span class="font-weight-bold">
                  <SvgRender :name="bannersData.payLaterIconName" className="small-icon-centered" />{{ $t(bannersData.payLaterBoldedText) }}
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
            </Layout>
          </v-system-bar>
        </Dialog>
        <v-scroll-x-transition :hide-on-leave="true">
          <div class="main-content">
            <Nuxt />
          </div>
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
  computed: mapState({
    currentStepSelectedCards: (state) => state.cards.currentStepSelectedCards,
    nextStepLink: (state) => state.steps.nextStepLink,
    previousStepLink: (state) => state.steps.previousStepLink,
    currentSteps: (state) => state.steps.currentSteps,
    currentStep: (state) => state.steps.currentStep,
    currentStepNumber: (state) => state.steps.currentStepNumber,
    currentStepMinCards: (state) => state.steps.currentStepMinCards,
    selectedLocale: (state) => state.locales.selectedLocale,
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
      return this.currentStep == this.currentSteps[this.currentSteps.length - 1]?.Link
    },
    isStepperNextButtonEnabled() {
      return this.currentStepSelectedCards.length >= this.currentStepMinCards
    },
    handleScroll() {
      this.scrollY = Math.round(window.scrollY)
      this.stepperTop = this.$refs.stepper?.getBoundingClientRect().top
    },
  },
  props: {
    bannersData: {
      default: () => ({
        topBannerText: 'TOP_BANNER',
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
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })
      window.addEventListener('scroll', this.handleScroll)
      setTimeout(() => {
        this.isLoaded = true
      }, 0)
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
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

//other languages styles (not en):  minus approx 5% from current rem from 768px, minus approx 10% from current rem until 767px from all text classes

//       ['h1', 'Heading 1', '6rem', '300', '-.015625em', -1],
//       ['h2', 'Heading 2', '3.75rem', '300', '-.0083333333em', 0],
//       ['h3', 'Heading 3', '3rem', '400', 'normal', 1],
//       ['h4', 'Heading 4', '2.125rem', '400', '.0073529412em', 2],
//       ['h5', 'Heading 5', '1.5rem', '400', 'normal', 2],
//       ['h6', 'Heading 6', '1.25rem', '500', '.0125em', 3],
//       ['subtitle-1', 'Subtitle 1', '1rem', '400', '.009375em', 4],
//       ['subtitle-2', 'Subtitle 2', '0.875rem', '500', '.0071428571em', 4],
//       ['body-1', 'Body 1', '1rem', '400', '.03125em', 4],
//       ['body-2', 'Body 2', '0.875rem', '400', '.0178571429em', 4],
//       ['button', 'Button', '0.875rem', '500', '.0892857143em', 4],
//       ['caption', 'Caption', '0.75rem', '400', '.0333333333em', 4],
//       ['overline', 'Overline', '0.75rem', '500', '.1666666667em', 4],
.v-application:not(.en) {
  .v-btn.v-size--default,
  .text-body-2,
  .text-subtitle-2 {
    font-size: calc(0.875rem - 5%);
  }
  .text-caption,
  .v-stepper__label,
  .text-overline {
    font-size: calc(0.75rem - 5%);
  }

  .text-subtitle-1,
  .text-body-1 {
    font-size: calc(1rem - 5%);
  }
  .text-h1 {
    font-size: calc(6rem - 5%);
  }
  .text-h2 {
    font-size: calc(3.75rem - 5%);
  }
  .text-h4 {
    font-size: calc(2.125rem - 5%);
  }

  .text-h5 {
    font-size: calc(1.5rem - 5%);
  }

  .v-card__title,
  .text-h6 {
    font-size: calc(1.25rem - 5%);
  }

  @media all and (max-width: 767px) {
    .v-btn.v-size--default,
    .text-body-2,
    .text-subtitle-2 {
      font-size: calc(0.875rem - 5%);
    }
    .text-caption,
    .v-stepper__label,
    .text-overline {
      font-size: calc(0.75rem - 10%);
    }

    .text-subtitle-1,
    .text-body-1 {
      font-size: calc(1rem - 10%);
    }
    .text-h1 {
      font-size: calc(6rem - 10%);
    }
    .text-h2 {
      font-size: calc(3.75rem - 10%);
    }
    .text-h4 {
      font-size: calc(2.125rem - 10%);
    }

    .text-h5 {
      font-size: calc(1.5rem - 10%);
    }

    .v-card__title,
    .text-h6 {
      font-size: calc(1.25rem - 10%);
    }
  }
}

.v-menu__content.theme--light {
  max-height: none !important;
}

@media all and (max-width: 767px) {
  .main-content {
    min-height: 360px;
  }
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

@media all and (min-width: 768px) {
  .main-content {
    min-height: 485px;
  }
}
</style>
