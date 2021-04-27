const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('steps/getSteps')
  },
}

export default {
  actions,
}
