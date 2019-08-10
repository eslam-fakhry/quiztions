import fb from '@/services/firebase-facade'

export default {
    namespaced: true,
    state: {
        questions: [],

    },
    mutations: {
        ['APPEND_QUESTION'](state, payload) {
            state.questions[payload.id] = payload
        },
    },
    actions: {

        async fetchQuestion({getters, commit}, {id}) {
            let question = getters.getQuestion(id);
            // await new Promise(r => setTimeout(r, 2000));
            if (question) return question;
            // fetch from server
            return fb.refs.questionsRef
                .child(id)
                .once('value')
                .then(snap => {
                    const newQuestion = {...snap.val(), id}
                    commit('APPEND_QUESTION', newQuestion)
                    return newQuestion
                })
            // otherwise show user-friendly error
            // todo: show user-friendly error
        },
        async fetchQuestionsInAdvance({dispatch}, {ids}) {
            ids.forEach((id) => {
                dispatch('fetchQuestion', {id})
            })
        },
    },
    getters: {
        getQuestion(state) {
            return (id) => {
                return state.questions[id]
            }
        },
    },
}
