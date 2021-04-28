import client from '../plugins/contentful'

export const state = () => ({
    cards: [],
    currentStepCards: [],
    selectedCards: [],
    currentStepSelectedCards: []
})

export const mutations = {
    setCards(state, payload) {
        state.cards = payload
    },
    setCurrentStepCards(state, payload) {
        state.currentStepCards = state.cards.filter(el => el.fields.stepId === payload).sort((a, b) => a.fields.order.toString().localeCompare(b.fields.order.toString()))
    },
    setCurrentStepSelectedCards(state, payload) {
        state.currentStepSelectedCards = state.cards.filter(el=> el.fields?.stepId == payload && state.selectedCards.includes(el.fields?.cardId)) 
    },
    toggleCard(state, payload) {
        console.log(payload)
        if (state.selectedCards.includes(payload.cardId)) {
            let index = state.selectedCards.findIndex((el) => el == payload.cardId )
            state.selectedCards.splice(index, 1)
        } else {
            state.selectedCards.push(payload.cardId);
            console.log(state.cards.filter(el => el.fields?.stepId == payload.currentStep && state.selectedCards.includes(el.fields.cardId)).length)
            console.log(payload.maxCards)
            if (state.cards.filter(el => el.fields?.stepId == payload.currentStep && state.selectedCards.includes(el.fields.cardId)).length > payload.maxCards) {
                console.log('more than maxCards')
                // let index = state.selectedCards.findIndex(el => el.fields?.stepId == payload.currentStep )
            }
        };
        state.currentStepSelectedCards = state.cards.filter(el=> el.fields?.stepId == payload.currentStep && state.selectedCards.includes(el.fields?.cardId)) 

        console.log(state.currentStepSelectedCards)
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

