import client from '../plugins/contentful'

export const state = () => ({
    cards: [],
    selectedCards: []
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    // addCard(state, payload) {
    //     state.selectedCards.push(payload)
    // },
    // removeCard(state, payload) {
    //     let index = state.selectedCards.findIndex(payload)
    //     state.selectedCards.splice(index, 1)
    // },
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

