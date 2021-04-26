import client from '../plugins/contentful'

export const state = () => ({
    selectedCards: [],
    isLoading: true
})

export const mutations = {
    setCurrentCard(state, payload) {
        state.currentCard = payload
    },
    setSelectedCards(state, payload) {
        state.selectedCards.push(payload)
    },
    setLoading(state, payload) {
        state.isLoading = payload
    }
}

export const actions = {
    async getCardById({commit}, id) {
        commit('setLoading', true);
        const response = await client.getEntries({
            content_type: 'cards',
            'fields.id': id
        })
        commit('setCurrentCard', response.items[0])
        commit('setLoading', false)
    }
}