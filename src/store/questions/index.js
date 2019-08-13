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
                    commit(mutations.APPEND_QUESTION, newQuestion)
                    return newQuestion
                })
            // otherwise show user-friendly error
            // todo: show user-friendly error
        },

        async createQuestion({commit, state, rootState}, payload) {
            console.log(payload);
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
    getters: {
        getQuestion(state) {
            return (id) => {
                return state.questions[id]
            }
        },
    },
}
