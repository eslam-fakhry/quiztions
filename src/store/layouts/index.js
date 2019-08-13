import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        layout: "Dashboard",

    },
    mutations: {
        [mutations.SET_LAYOUT](state, layout) {
            state.layout = layout
        },
    },
}
