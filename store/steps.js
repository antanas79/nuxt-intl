import client from '../plugins/contentful'

export const state = () => ({
    steps: [],
    currentStep: null,
    previousStepLink: '',
    nextStepLink: ''
})

export const mutations = {
    setSteps(state, payload) {
        // payload.sort((a, b) => a.fields.order.localeCompare(b.fields.order));
        console.log(payload)
        state.steps = payload.sort((a, b) => a.fields.order.toString().localeCompare(b.fields.order.toString()))
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
                commit('setSteps', response.items);
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


