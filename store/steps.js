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
        const response = await client.getEntries({
            content_type: 'steps'
        });
        if (response.items.length > 0) {
            commit('setSteps', response.items);
        }
    }
}

