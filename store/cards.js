import client from '../plugins/contentful'

export const state = () => ({
    cards: [],
    selectedCards: []
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    setSelectedCards(state, payload) {
        state.selectedCards.push(payload)
    },
}

export const actions = {
    async getCards({commit}) {
        const response = await client.getEntries({
            content_type: 'cards'
        });
        if (response.items.length > 0) {
            commit('setCards', response.items);
        }
    }
}

