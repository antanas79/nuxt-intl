<template>
<div class="steps-container">
  <div class="container  pa-0" v-if="cards && steps && steps.currentStep && cards.currentStepCards">
    <div class="mb-3 upper d-flex flex-column">
      <!-- <h1 class="font-weight-bold my-3">{{ $t(steps.steps[(steps.currentStep -1)].h1) }}</h1>
      <div class="text-subtitle-1 mb-3">
        {{ $t(steps.steps[(steps.currentStep -1)].paragraph) }}
      </div> -->
    </div>
    <div class="cards" >
        <v-container class="lighten-5 pa-0">
            <v-row no-gutters>
                <CustomCard @card-toggled="onCardToggled" :card="card" :cards="cards" :steps="steps" v-for="card in cards.currentStepCards" :key="card.id"/>  
            </v-row>
        </v-container>
    </div>
    <div class="steps">
      <CustomStepper :steps="steps" :cards="cards"/>
    </div>
  </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
      ...mapState(['cards', 'steps']),  
  },
  methods: {
    onCardToggled(event) {
      this.$store.commit('cards/toggleCard', event);
      this.setNextPreviousLinks();
    },
    setNextPreviousLinks() {
        let index = this.$store.state.steps.currentSteps.findIndex(el => el.link === this.$store.state.steps.currentStep);
        if (this.$store.state.steps.steps[0].link == this.$store.state.steps.currentStep && this.$store.state.cards.currentStepSelectedCards?.length > 0) {
          this.$store.commit('steps/setNextStepLink', this.$store.state.cards.currentStepSelectedCards[0].nextStep)
          this.$store.commit('steps/setPreviousStepLink', '')
        } else {
          this.$store.commit('steps/setPreviousStepLink', this.$store.state.steps.currentSteps[index - 1]?.link);
          this.$store.commit('steps/setNextStepLink', this.$store.state.steps.currentSteps[index + 1]?.link);
        }

        console.log(this.$store.state.steps.nextStepLink)
        console.log(this.$store.state.steps.previousStepLink)
        console.log(this.$store.state.steps.currentSteps)
        console.log(this.$store.state.steps.index)
    }
  },
  mounted() {
    if (process.browser) {
        this.$nextTick(() => {
          this.$nuxt.$loading.start()
          setTimeout(() => this.$nuxt.$loading.finish(), 500)
        })
        this.$store.commit('steps/setCurrentStep', this.$route.params.id);
        let selectedFirstStepCard = this.$store.state.cards.cards.find(el=> el.stepId === 1 && this.$store.state.cards.selectedCards?.includes(el.cardId));
        if (selectedFirstStepCard && this.$store.state.steps.currentStep != this.$store.state.steps.steps[0].link){
            this.$store.commit('steps/setCurrentSteps', this.$store.state.steps.steps.filter(el => selectedFirstStepCard.steps.includes(el.link)))
        } else {
            this.$store.commit('steps/setCurrentSteps', this.$store.state.steps.steps);
        };
        this.$store.commit('cards/setCurrentStepCards', this.$store.state.steps.currentStep)
        this.$store.commit('steps/setCurrentStepNumber', this.$store.state.steps.currentSteps.findIndex(el => el.link == this.$store.state.steps.currentStep))
        this.$store.commit('cards/setCurrentStepSelectedCards', this.$store.state.steps.currentStep)
        this.$store.commit('steps/setCurrentStepMaxCards', this.$store.state.steps.steps.find(el => el.link == this.$store.state.steps.currentStep).maxCards)
        this.setNextPreviousLinks();
    }
  }
}
</script>
<style lang="scss" scoped>

.steps-container {
  min-height: 560px;
}
.row.no-gutters {
  width:100%;
  overflow-x: auto;
}
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
    margin-top: 30px;
  }
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
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

@media all and (min-width: 800px) {
  .row.no-gutters {
    flex-wrap: nowrap;
  }
}
</style>