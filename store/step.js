import client from '../plugins/contentful'

export const state = () => ({
    currentSteps: {},
    isLoading: true
})

export const mutations = {
    setCurrentStep(state, payload) {
        state.currentStep = payload
    },
    setLoading(state, payload) {
        state.isLoading = payload
    }
}

export const actions = {
    async getStepById({commit}, id) {
        commit('setLoading', true);
        const response = await client.getEntries({
            content_type: 'steps',
            'fields.id': id
        });
        commit('setCurrentStep', response.items[0])
        commit('setLoading', false)
    }
}