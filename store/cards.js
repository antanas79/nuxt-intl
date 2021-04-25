import client from '../plugins/contentful'

export const state = () => ({
    cards: []
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    }
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

