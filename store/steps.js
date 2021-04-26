import client from '../plugins/contentful'

export const state = () => ({
    steps: []
})

export const mutations = {
    setSteps(state, payload) {
        state.steps = payload
    }
}

export const actions = {
    async nuxtServerInit ({ commit }) {
        debugger
        try {
          const response = await client.getEntries({
                content_type: 'steps'
            });
            if (response.items.length > 0) {
                debugger
                console.log(response.items)
                commit('setSteps', response.items);
            }
        } catch (error) {
          // you could redirect to custom error page for instance
          console.error(error);
        }
    },
    // async getSteps({commit}) {
        
    //     if (state.steps?.length >0) {
                
    //     } else {
    //         const response = await client.getEntries({
    //             content_type: 'steps'
    //         });
    //         if (response.items.length > 0) {
    //             console.log(response.items)
    //             commit('setSteps', response.items);
    //         }
    //     }
    // }
}

export const getters = {
   
}


