import client from '../plugins/contentful'

export const state = () => ({
    cards: [],
    currentStepCards: [],
    selectedCards: [],
    currentStepSelectedCards: [],
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    setCurrentStepCards(state, payload) {
        state.currentStepCards = state.cards.filter(el => el?.stepLink === payload).sort((a, b) => a.order.toString().localeCompare(b.order.toString()))
    },
    setCurrentStepSelectedCards(state, payload) {
        state.currentStepSelectedCards = state.cards.filter(el=> el.stepLink == payload && state.selectedCards.includes(el.cardId)) 
    },
    toggleCard(state, payload) {
        if (state.selectedCards.includes(payload.card.cardId)) {
            let index = state.selectedCards.findIndex((el) => el == payload.card.cardId )
            state.selectedCards.splice(index, 1)
        } else {
            state.selectedCards.push(payload.card.cardId);
            //delete previous card if more than step limit of cards
            if (state.cards.filter(el => el?.stepLink == payload.currentStep && state.selectedCards.includes(el.cardId)).length > payload.maxCards) {
                let index = state.selectedCards.findIndex(el => el == state.currentStepSelectedCards.find(el=> el.cardId !== payload.card.cardId).cardId);
                state.selectedCards.splice(index, 1);
            }
        };
        //reset current step selected cards
        state.currentStepSelectedCards = state.cards.filter(el=> el?.stepLink == payload.currentStep && state.selectedCards.includes(el?.cardId)) 
    },
}

export const actions = {
    async getCards({commit}) {
        try {
            const response = await client.getEntries({
                content_type: 'cards'
            });

            if (response.items.length > 0) {
                commit('setCards', response.items.map(el=> el.fields));
            }
          } catch (error) {
            // you could redirect to custom error page for instance
            console.error(error);
          }
    },
}