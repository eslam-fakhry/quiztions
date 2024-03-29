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

        async fetchQuestion({state, commit}, {id}) {
            let question = state.questions[id]
            if (question) return question;
            try {
                // fetch from server
                const value = await fb.fetchResource('questions', id)
                question = {...value, id}
                commit(mutations.APPEND_QUESTION, question)
                return question
            } catch (err) {
                // otherwise show 404 page
                router.replace({name: 'not-found'})
                return null
            }
        },

        createQuestion(_, {question, rightAnswer, lessonId}) {
            return fb.createQuestion({question, rightAnswer, lessonId})
        },

        async deleteQuestion(_, {questionId, lessonId}) {
            await fb.deleteQuestion(questionId, lessonId)
        },
    },
}
