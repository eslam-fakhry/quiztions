import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        message: "",
        color: "",

    },
    mutations: {
        [mutations.SET_TOAST](state, payload) {
            state.message = payload.message
            state.color = payload.color || "info"
        },
    },
}
