import client from '../plugins/contentful'

export const state = () => ({
    steps: []
})

export const mutations = {
    setSteps(state, payload) {
        state.steps = payload
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


