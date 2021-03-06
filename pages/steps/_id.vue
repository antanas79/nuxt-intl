<template>
  <div class="lighten-5 col-12 pa-0">
    <div class="cards-container background-grey">
      <div v-if="isLoaded">
        <div>
          <Layout small>
            <div class="d-flex flex-column justify-center pa-0">
              <div class="mb-3 upper d-flex flex-column align-items-center" v-if="currentSteps[currentStepNumber]">
                <!-- payload is:{{ payload }} -->
                <div class="font-weight-bold my-3 text-h4 d-none d-sm-block" v-html="$t(currentSteps[currentStepNumber].H4)"></div>
                <div class="font-weight-bold my-3 text-h5 d-sm-none" v-html="$t(currentSteps[currentStepNumber].ShortH5)"></div>
                <div class="text-subtitle-1 mb-0 d-none d-md-block text-body-1" v-html="$t(currentSteps[currentStepNumber].TextBody1)"></div>
              </div>
              <div class="cards">
                <div class="pa-0 d-flex flex-column">
                  <div class="d-flex flex-column d-md-none">
                    <PricingCard
                      @pricing-card-toggled="onCardToggled"
                      :card="card"
                      cardClass="mx-auto mx-md-3 col-12 pa-0 d-flex flex-column justify-space-between transition-swing mb-3 pricing-card"
                      iconColor="blue"
                      iconClass="ml-3"
                      :selectedCurrency="selectedCurrency"
                      :payload="{
                        id: card.Id,
                        currentStep: currentStep,
                        maxCards: currentStepMaxCards,
                        minCards: currentStepMinCards,
                      }"
                      :buttonClassName="isSelected(card.Id) ? 'no-uppercase blue-grey lighten-5' : 'no-uppercase'"
                      eventName="pricing-card-toggled"
                      :isSelected="isSelected(card.Id)"
                      v-for="card in currentStepCards"
                      :key="card.Id"
                    >
                    </PricingCard>
                  </div>
                  <div class="d-none d-md-flex">
                    <v-sheet class="mx-auto background-grey" max-width="100%">
                      <v-slide-group v-model="model" center-active class="pa-0" show-arrows>
                        <v-slide-item v-for="card in currentStepCards" :key="card.Id">
                          <div>
                            <PricingCard
                              @pricing-card-toggled="onCardToggled"
                              :card="card"
                              cardClass="mx-auto mx-md-3 col-12 pa-0 d-flex flex-column justify-space-between transition-swing mb-3 pricing-card"
                              iconName="information"
                              iconColor="blue"
                              iconClass="ml-3"
                              :selectedCurrency="selectedCurrency"
                              :payload="{
                                id: card.Id,
                                currentStep: currentStep,
                                maxCards: currentStepMaxCards,
                                minCards: currentStepMinCards,
                              }"
                              :buttonClassName="isSelected(card.Id) ? 'no-uppercase blue-grey lighten-5' : 'no-uppercase'"
                              eventName="pricing-card-toggled"
                              :isSelected="isSelected(card.Id)"
                            >
                            </PricingCard>
                          </div>
                        </v-slide-item>
                      </v-slide-group>
                    </v-sheet>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ params, error, payload }) {
    if (payload) return { payload: payload }
    //else make api call to get data from developing locally
    // else return console.log('payload error')
  },
  data: function () {
    return {
      payload: null,
      isLoaded: false,
      model: [],
    }
  },
  computed: mapState({
    cards: (state) => state.cards.cards,
    currentStepCards: (state) => state.cards.currentStepCards,
    currentStepSelectedCards: (state) => state.cards.currentStepSelectedCards,
    selectedCards: (state) => state.cards.selectedCards,
    steps: (state) => state.steps.steps,
    nextStepLink: (state) => state.steps.nextStepLink,
    previousStepLink: (state) => state.steps.previousStepLink,
    currentSteps: (state) => state.steps.currentSteps,
    currentStep: (state) => state.steps.currentStep,
    currentStepNumber: (state) => state.steps.currentStepNumber,
    currentStepMaxCards: (state) => state.steps.currentStepMaxCards,
    currentStepMinCards: (state) => state.steps.currentStepMinCards,
    selectedCurrency: (state) => state.currencies.selectedCurrency,
    selectedLocale: (state) => state.locales.selectedLocale,
  }),
  methods: {
    onCardToggled(event) {
      this.toggleCard(event)
      this.setNextPreviousLinks()
      //redirect to another page if only one card can be selected
      if (this.currentStepMaxCards === 1 && this.currentStepSelectedCards.length === 1 && !this.isLastStep()) {
        setTimeout(() => {
          if (this.currentStepSelectedCards.length === 1) {
            this.$router.push({ path: this.getLocalePath() + '/steps/' + this.nextStepLink })
          }
        }, 500)
      }
    },
    getLocalePath() {
      return this.selectedLocale.code == 'en' ? '' : '/' + this.selectedLocale.code
    },
    toggleCard(payload) {
      if (this.selectedCards.includes(payload.id) && !payload.fromQueryParams) {
        let index = this.selectedCards.findIndex((el) => el == payload.id)
        this.$store.commit('cards/deleteSelectedCard', { index: index, amount: 1 })
      } else {
        if (!this.selectedCards.includes(payload.id)) {
          this.$store.commit('cards/addSelectedCard', payload.id)
        }
        //delete previous card if more than step limit of cards
        if (this.cards.filter((el) => el?.StepLink == payload.currentStep && this.selectedCards.includes(el.Id)).length > payload.maxCards) {
          let index = this.selectedCards.findIndex((el) => el == this.currentStepSelectedCards.find((el) => el.Id !== payload.id).Id)
          this.$store.commit('cards/deleteSelectedCard', { index: index, amount: 1 })
        }
      }
      //reset current step selected cards
      this.$store.commit('cards/setCurrentStepSelectedCards', this.currentStep)
    },
    setNextPreviousLinks() {
      let index = this.currentSteps.findIndex((el) => el.Link === this.currentStep)
      if (this.steps[0].Link == this.currentStep && this.currentStepSelectedCards?.length > 0) {
        this.$store.commit('steps/setNextStepLink', this.currentStepSelectedCards[0].NextStep)
        this.$store.commit('steps/setPreviousStepLink', '')
      } else {
        this.$store.commit('steps/setPreviousStepLink', this.currentSteps[index - 1]?.Link)
        this.$store.commit('steps/setNextStepLink', this.currentSteps[index + 1]?.Link)
      }
    },
    isSelected(id) {
      return this.selectedCards.includes(id)
    },
    isLastStep() {
      return this.currentStep == this.currentSteps[this.currentSteps.length - 1].Link
    },
  },
  mounted() {
    if (process.browser) {
      setTimeout(() => {
        //set selected cards from query ids
        if (this.$route.query.selectedCardsIds) {
          let ids = this.$route.query.selectedCardsIds.split(',')
          for (let i = 0; i < ids.length; i++) {
            this.toggleCard({
              id: parseInt(ids[i]),
              currentStep: this.$route.params.id,
              maxCards: this.steps.find((el) => el.link == this.$route.params.id).MaxCards,
              fromQueryParams: true,
            })
          }
        }
        this.$store.commit('steps/setCurrentStep', this.$route.params.id)
        let selectedFirstStepCard = this.cards.find((el) => el.StepId === 1 && this.selectedCards?.includes(el.Id))
        if (selectedFirstStepCard && this.currentStep != this.steps[0].Link) {
          this.$store.commit(
            'steps/setCurrentSteps',
            this.steps.filter((el) => selectedFirstStepCard.Steps.includes(el.Link))
          )
        } else {
          this.$store.commit('steps/setCurrentSteps', this.steps)
        }
        this.$store.commit('cards/setCurrentStepCards', this.currentStep)
        this.$store.commit(
          'steps/setCurrentStepNumber',
          this.currentSteps.findIndex((el) => el.Link == this.currentStep)
        )
        this.$store.commit('cards/setCurrentStepSelectedCards', this.currentStep)
        this.$store.commit('steps/setCurrentStepMaxCards', this.steps.find((el) => el.Link == this.currentStep).MaxCards)
        this.$store.commit('steps/setCurrentStepMinCards', this.steps.find((el) => el.Link == this.currentStep).MinCards)
        this.setNextPreviousLinks()
        //redirecting to first step if something needed doesn't exist
        if (
          !this.cards ||
          !this.steps ||
          !this.currentStep ||
          !this.currentSteps ||
          !this.currentStepCards ||
          this.currentStepNumber < 0 ||
          (this.currentStepNumber > 0 && this.currentStepNumber !== this.currentSteps.length - 1 && !this.nextStepLink) ||
          (this.currentStepNumber > 0 && !this.previousStepLink) ||
          !this.currentStepMaxCards ||
          !this.currentStepMinCards
        ) {
          this.$router.push({ path: this.getLocalePath() + '/steps/' + this.steps[0].Link })
        }
        this.isLoaded = true
      }, 0)
    }
  },
}
</script>
<style lang="scss" scoped>
.cards-container {
  min-height: 360px;
}

::v-deep .v-slide-group__next:not(.v-slide-group__next--disabled),
::v-deep .v-slide-group__prev:not(.v-slide-group__prev--disabled) {
  .theme--light.v-icon {
    color: #1976d2;
  }
}
.container {
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  .cards {
    width: 100%;
    div {
      display: flex;
    }
  }
  > div.upper {
    display: flex;
    margin-bottom: 50px;
  }
  div.steps {
    width: 100%;
  }
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
.v-slide-group::v-deep .v-slide-group__next--disabled .v-icon,
.v-slide-group::v-deep .v-slide-group__prev--disabled .v-icon {
  display: none;
}
@media all and (min-width: 768px) {
  .row.no-gutters {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
  }
  .cards-container {
    min-height: 485px;
  }
}
</style>
