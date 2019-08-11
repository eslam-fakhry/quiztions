import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        answers: {
            'question1': ['Nile'],
            'question2': ['Nile'],
            'question3': ['black', 'blue'],
            'question4': ['game'],
            'question5': ['game'],
            'question6': ['Ahmed']
        },

    },
    mutations: {
        [mutations.APPEND_ANSWER](state, payload) {
            state.rightAnswers[payload.id] = payload.value
        },
    },
    actions: {

        async fetchRightAnswer({getters, commit}, {id}) {
            let rightAnswer = getters.getRightAnswer(id);
            // await new Promise(r => setTimeout(r, 2000));
            if (rightAnswer) return rightAnswer;
            // fetch from server
            return fb.refs.rightAnswersRef
                .child(id)
                .once('value')
                .then(snap => {
                    const newRightAnswer = {value: snap.val(), id}
                    commit(mutations.APPEND_ANSWER, newRightAnswer)
                    return newRightAnswer
                })
            // todo: show user-friendly error
            // otherwise show user-friendly error
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
