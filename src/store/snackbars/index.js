
export default {
    namespaced: true,
    state: {
        message: "",
        color: "",

    },
    mutations: {
        ['SET_TOAST'](state, payload) {
            state.message = payload.message
            state.color = payload.color || "info"
            console.log(payload.color);
        },
    },
}
