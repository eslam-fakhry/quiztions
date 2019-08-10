
export default {
    namespaced: true,
    state: {
        layout: "Dashboard",

    },
    mutations: {
        ['SET_LAYOUT'](state, layout) {
            state.layout = layout
        },
    },
}
