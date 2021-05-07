<template>
  <div class="steps-container">
    <div class="container pa-0" v-if="isLoaded">
      <div class="mb-3 upper d-flex flex-column">
        <h1 class="font-weight-bold my-3" v-html="$t(currentSteps[currentStepNumber].h1)"></h1>
        <div class="text-subtitle-1 mb-0" v-html="$t(currentSteps[currentStepNumber].paragraph)"></div>
      </div>
      <div class="cards">
        <v-container class="lighten-5 pa-0">
          <v-row no-gutters>
            <PricingCard
              @pricing-card-toggled="onCardToggled"
              :card="card"
              cardClass="mx-auto mx-sm-3 col-12 pa-0 d-flex flex-column justify-space-between transition-swing mb-3 pricing-card"
              iconName="information"
              iconColor="blue"
              iconClass="ml-3"
              :payload="{
                cardId: card.cardId,
                currentStep: currentStep,
                maxCards: currentStepMaxCards,
                minCards: currentStepMinCards,
              }"
              :maxWidth="344"
              :buttonClassName="isSelected(card.cardId) ? 'no-uppercase blue-grey lighten-5' : 'no-uppercase'"
              :buttonText="isSelected(card.cardId) ? card.buttonTextRemove : card.buttonTextAdd"
              eventName="pricing-card-toggled"
              :isSelected="isSelected(card.cardId)"
              v-for="card in currentStepCards"
              :key="card.cardId"
            >
            </PricingCard>
          </v-row>
        </v-container>
      </div>
      <div class="steps">
        <Stepper
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
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data: function () {
    return {
      isLoaded: false,
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
  }),
  methods: {
    onCardToggled(event) {
      this.toggleCard(event)
      this.setNextPreviousLinks()
    },
    toggleCard(payload) {
      if (this.selectedCards.includes(payload.cardId) && !payload.fromQueryParams) {
        let index = this.selectedCards.findIndex((el) => el == payload.cardId)
        this.$store.commit('cards/deleteSelectedCard', { index: index, amount: 1 })
      } else {
        if (!this.selectedCards.includes(payload.cardId)) {
          this.$store.commit('cards/addSelectedCard', payload.cardId)
        }
        //delete previous card if more than step limit of cards
        if (this.cards.filter((el) => el?.stepLink == payload.currentStep && this.selectedCards.includes(el.cardId)).length > payload.maxCards) {
          let index = this.selectedCards.findIndex((el) => el == this.currentStepSelectedCards.find((el) => el.cardId !== payload.cardId).cardId)
          this.$store.commit('cards/deleteSelectedCard', { index: index, amount: 1 })
        }
      }
      //reset current step selected cards
      this.$store.commit('cards/setCurrentStepSelectedCards', this.currentStep)
    },
    setNextPreviousLinks() {
      let index = this.currentSteps.findIndex((el) => el.link === this.currentStep)
      if (this.steps[0].link == this.currentStep && this.currentStepSelectedCards?.length > 0) {
        this.$store.commit('steps/setNextStepLink', this.currentStepSelectedCards[0].nextStep)
        this.$store.commit('steps/setPreviousStepLink', '')
      } else {
        this.$store.commit('steps/setPreviousStepLink', this.currentSteps[index - 1]?.link)
        this.$store.commit('steps/setNextStepLink', this.currentSteps[index + 1]?.link)
      }
    },
    isSelected(id) {
      return this.selectedCards.includes(id)
    },
    isLastStep() {
      return this.currentStep == this.currentSteps[this.currentSteps.length - 1].link
    },
    isStepperNextButtonEnabled() {
      return this.currentStepSelectedCards.length >= this.currentStepMinCards
    },
  },
  mounted() {
    if (process.browser) {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 500)
      })

      setTimeout(() => {
        //set selected cards from query ids
        if (this.$route.query.selectedCardsIds) {
          let ids = this.$route.query.selectedCardsIds.split(',')
          for (let i = 0; i < ids.length; i++) {
            this.toggleCard({
              cardId: parseInt(ids[i]),
              currentStep: this.$route.params.id,
              maxCards: this.steps.find((el) => el.link == this.$route.params.id).maxCards,
              fromQueryParams: true,
            })
          }
        }
        this.$store.commit('steps/setCurrentStep', this.$route.params.id)
        let selectedFirstStepCard = this.cards.find((el) => el.stepId === 1 && this.selectedCards?.includes(el.cardId))
        if (selectedFirstStepCard && this.currentStep != this.steps[0].link) {
          this.$store.commit(
            'steps/setCurrentSteps',
            this.steps.filter((el) => selectedFirstStepCard.steps.includes(el.link))
          )
        } else {
          this.$store.commit('steps/setCurrentSteps', this.steps)
        }
        this.$store.commit('cards/setCurrentStepCards', this.currentStep)
        // console.log(this.currentSteps.findIndex((el) => el.link == this.currentStep))
        // console.log(this.currentStep)
        // console.log(this.currentSteps)
        this.$store.commit(
          'steps/setCurrentStepNumber',
          this.currentSteps.findIndex((el) => el.link == this.currentStep)
        )
        this.$store.commit('cards/setCurrentStepSelectedCards', this.currentStep)
        this.$store.commit('steps/setCurrentStepMaxCards', this.steps.find((el) => el.link == this.currentStep).maxCards)
        this.$store.commit('steps/setCurrentStepMinCards', this.steps.find((el) => el.link == this.currentStep).minCards)
        this.setNextPreviousLinks()
        this.isLoaded = true
      }, 0)
    }
  },
}
</script>
<style lang="scss" scoped>
.steps-container {
  min-height: 560px;
}

// .row.no-gutters {
//   padding-top: 30px;
//   padding-bottom: 30px;
// }

.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  .cards {
    width: 100%;
    div {
      display: flex;
      // justify-content: space-evenly;
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

@media all and (min-width: 600px) {
  .row.no-gutters {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
  }
}
</style>