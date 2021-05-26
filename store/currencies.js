import client from '../plugins/contentful'

export const state = () => ({
    selectedCurrency: { id: 1, name: 'en-Us', currency: 'USD', path: 'flags/usd' },
    currencies: [
        { id: 1, name: 'en-Us', currency: 'USD', path: 'flags/usd' },
        { id: 2, name: 'en-GB', currency: 'GBP', path: 'flags/gbp' },
        { id: 3, name: 'eu', currency: 'EUR', path: 'flags/eur' },
        { id: 4, name: 'en-AU', currency: 'AUD', path: 'flags/aud' },
        { id: 5, name: 'en-CA', currency: 'CAD', path: 'flags/cad' },
        { id: 6, name: 'ja-JP', currency: 'JPY', path: 'flags/jpy' },
        { id: 7, name: 'zh-hk', currency: 'HKD', path: 'flags/hkd' },
    ],
})

export const mutations = {
    // setCurrencies(state, payload) {
    //     state.currencies = payload
    // },
    setSelectedCurrency(state, payload) {
        state.selectedCurrency = payload
    },
}

export const actions = {
    // async getCards({ commit }) {
    //     try {
    //         const response = await client.getEntries({
    //             content_type: 'currencies'
    //         });

    //         if (response.items.length > 0) {
    //             commit('setCurrencies', response.items.map(el => el.fields));
    //         }
    //     } catch (error) {
    //         // you could redirect to custom error page for instance
    //         console.error(error);
    //     }
    // },
}