import fb from '@/services/firebase-facade'
import Vue from 'vue'
import mutations from '../mutation-types'
import router from "../../router";

export default {
    namespaced: true,
    state: {
        questions: [],

    },
    mutations: {
        [mutations.APPEND_QUESTION](state, payload) {
            Vue.set(state.questions, payload.id, payload)
        },
    },
    actions: {

        async fetchQuestion({getters, state, commit}, {id}) {
            let question = state.questions[id]
            if (question) return question;
            try {
                // fetch from server
                question = await fb.fetchResource('questions', id)
                commit(mutations.APPEND_QUESTION, question)
                return question
            } catch (err) {
                // otherwise show 404 page
                router.replace({name: 'not-found'})
                return null
            }
        },

        async createQuestion({commit, state, rootState}, {question, rightAnswer, lessonId}) {
            return fb.createQuestion({question, rightAnswer, lessonId})
                .catch(err => {
                    console.error(err)
                })
        },

    },
}
