<template>
  <div class="container pa-0">
    <div class="mb-3 upper d-flex flex-column">
      <h1 class="font-weight-bold my-3">{{ $t('steps_title') }}</h1>
      <div class="text-subtitle-1 mb-3">
        {{ $t('steps_subtitle') }}
      </div>
    </div>
    <div class="cards">
      <CustomCard />
    </div>
    <div class="steps">
      <CustomStepper :current-step="parseInt(currentStep)" />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  async asyncData({ store, params, payload }) {
    // await store.dispatch('steps/getSteps')
  },
  data: () => ({
    step: null,
    show: false,
  }),
  computed: {
    currentStep() {
      return this.$route.params.id
    },
    ...mapState(['steps']),
    isLoading() {
      return this.$store.state.step.isLoading
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
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
