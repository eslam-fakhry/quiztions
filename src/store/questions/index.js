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

        async createQuestion({commit, state, rootState}, payload) {
            // A question entry.
            const questionData = {
                ...payload.question,
                teacherId:rootState.user.uid,
            };

            // Get a key for a new Question.
            const newQuestionKey = fb.db.ref().child('questions').push().key;

            // Write the new question's data simultaneously in the questions list and the user's question list.
            const updates = {};
            updates['/questions/' + newQuestionKey] = questionData;
            updates['/lessons/' + payload.lessonId + '/questions/' + newQuestionKey] = newQuestionKey;
            updates['/rightAnswers/' + newQuestionKey] = payload.rightAnswer;
            await fb.db.ref().update(updates);
            return newQuestionKey
        },

    },
}
