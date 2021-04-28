<template>
  <div class="container pa-0" v-if="steps && steps.currentStep">
    <div class="mb-3 upper d-flex flex-column">
      <h1 class="font-weight-bold my-3">{{ $t(steps.steps[(steps.currentStep -1)].fields.h1) }}</h1>
      <div class="text-subtitle-1 mb-3">
        {{ $t(steps.steps[(steps.currentStep -1)].fields.paragraph) }}
      </div>
    </div>
    <div class="cards">
      <CustomCard />  
    </div>
    <div class="steps">
      <CustomStepper/>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    step: null,
    show: false,
  }),
  mounted() {
    if (process.browser) {
        this.$store.commit('steps/setCurrentStep', this.$store.state.steps.steps.find(el => el.fields.link == this.$route.params.id)?.fields?.id);
        this.$store.commit('steps/setPreviousStepLink', this.$store.state.steps.steps.find(el => el.fields.id == (this.$store.state.steps.currentStep -1))?.fields?.link);
        this.$store.commit('steps/setNextStepLink', this.$store.state.steps.steps.find(el => el.fields.id == (this.$store.state.steps.currentStep +1))?.fields?.link);
        this.$store.commit('cards/setCurrentStepCards', this.$store.state.steps.currentStep)
        this.$store.commit('cards/setCurrentStepSelectedCards', this.$store.state.steps.currentStep)
    }
  },
  watch: {
    '$route.query': '$fetch',
  },
  computed: {
      ...mapState(['cards', 'steps']),  
  },
  methods: {
    selectCard (index) {
        this.$store.commit('cards/setSelectedCards', index)
    },
  }
}
</script>
<style lang="scss" scoped>
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
      justify-content: space-evenly;
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
</style>
