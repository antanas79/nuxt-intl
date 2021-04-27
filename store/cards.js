import client from '../plugins/contentful'

export const state = () => ({
    cards: [],
    selectedCards: [],
    currentStepCards: []
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    setCurrentStepCards(state, payload) {
        state.currentStepCards = state.cards.filter(el => el.fields.stepId === payload)
    },
    toggleCard(state, payload) {
        if (state.selectedCards.includes(payload)) {
            console.log(state.selectedCards)
            let index = state.selectedCards.findIndex((el) => el === payload )
            state.selectedCards.splice(index, 1)
        } else {
            state.selectedCards.push(payload)
        }   
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
    },
}

