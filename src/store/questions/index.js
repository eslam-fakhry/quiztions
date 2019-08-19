import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        questions: [],

    },
    mutations: {
        [mutations.APPEND_QUESTION](state, payload) {
            state.questions[payload.id] = payload
        },
    },
    actions: {

        async fetchQuestion({getters, state, commit}, {id}) {
            let question = state.questions[id]
            // await new Promise(r => setTimeout(r, 2000));
            if (question) return question;
            // fetch from server

            fb.fetchResource('questions', id,snap=>{
                const question = {...snap.val(), id}
                commit(mutations.APPEND_QUESTION, question)

            })

            return fb.fetchResource('questions', id)

                .then(question => {
                    commit(mutations.APPEND_QUESTION, question)
                    return question
                })
                // otherwise show user-friendly error
                .catch(err => {
                    console.error(err)
                    // todo: show user-friendly error
                })
        },

        async createQuestion({commit, state, rootState}, {question, rightAnswer, lessonId}) {
            return fb.createQuestion({question, rightAnswer, lessonId})
                .catch(err => {
                    console.error(err)
                })
        },

    },
}
