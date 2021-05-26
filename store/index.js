const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('steps/getSteps')
    await dispatch('cards/getCards')
  },
}

export default {
  actions,
}
