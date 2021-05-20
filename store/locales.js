import client from '../plugins/contentful'

export const state = () => ({
    selectedLocale: {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.js',
    },
    locales: [
        {
            code: 'fr',
            name: 'Français',
            iso: 'fr-FR',
            file: 'fr.js',
        },
        {
            code: 'de',
            name: 'Deutsch',
            iso: 'de-de',
            file: 'de.js',
        },
        {
            code: 'en',
            name: 'English',
            iso: 'en-US',
            file: 'en.js',
        },
    ],
})

export const mutations = {
    // setCurrencies(state, payload) {
    //     state.currencies = payload
    // },
    setSelectedLocale(state, payload) {
        state.selectedLocale = payload
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