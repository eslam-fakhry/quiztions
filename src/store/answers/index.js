import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        answers: {},
    },
    mutations: {
        [mutations.APPEND_ANSWER](state, payload) {

            state.answers[payload.id] = payload.value
        },
    },
    actions: {

        async fetchRightAnswer({state, commit}, {id}) {

            let rightAnswer = state.answers[id];
            if (rightAnswer) return rightAnswer;
            try {
                // fetch from server
                const value = await fb.fetchResource('rightAnswers', id)
                commit(mutations.APPEND_ANSWER, {value,id})
                return value
            } catch (err) {
                // otherwise show error
                console.error(err)
                return null
            }
        },

    },
    getters: {
        getRightAnswer(state) {
            return (id) => {
                return state.answers[id]
            }
        },
    },
}
