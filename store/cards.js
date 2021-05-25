import client from '../plugins/contentful'

export const state = () => ({
    cards: [],
    selectedCards: [],
    currentStepCards: [],
    currentStepSelectedCards: [],
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    setSelectedCards(state, payload) {
        state.selectedCards = payload
    },
    addSelectedCard(state, payload) {
        state.selectedCards.push(payload)
    },
    deleteSelectedCard(state, payload) {
        state.selectedCards.splice(payload.index, payload.amount)
    },
    setCurrentStepCards(state, payload) {
        state.currentStepCards = state.cards.filter(el => el?.StepLink === payload).sort((a, b) => a.Order.toString().localeCompare(b.Order.toString()))
    },
    setCurrentStepSelectedCards(state, payload) {
        state.currentStepSelectedCards = state.cards.filter(el => el.StepLink == payload && state.selectedCards.includes(el.Id))
    }
}

export const actions = {
    async getCards({ commit }) {
        try {
            const response = await client.getEntries({
                content_type: 'cards'
            });

            if (response.items.length > 0) {
                commit('setCards', response.items.map(el => el.fields));
            }
        } catch (error) {
            // you could redirect to custom error page for instance
            console.error(error);
        }
    },
}