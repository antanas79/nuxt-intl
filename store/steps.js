import client from '../plugins/contentful'

export const state = () => ({
    steps: [],
    currentStep: null,
    previousStepLink: '',
    nextStepLink: ''
})

export const mutations = {
    setSteps(state, payload) {
        state.steps = payload.sort((a, b) => a.order.toString().localeCompare(b.order.toString()))
    },
    setCurrentStep(state, payload) {
        state.currentStep = payload
    },
    setPreviousStepLink(state, payload) {
        state.previousStepLink = payload
    },
    setNextStepLink(state, payload) {
        state.nextStepLink = payload
    }
}

export const actions = {
    async getSteps({commit}) {
        try {
            const response = await client.getEntries({
                  content_type: 'steps'
            });

            if (response.items.length > 0) {
                commit('setSteps', response.items.map(el=> el.fields));
            }
          } catch (error) {
            // you could redirect to custom error page for instance
            console.error(error);
          }
    },
}

export const getters = {
   getStepsList() {
       return this.state.steps
   }
}


