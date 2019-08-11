import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        lessons: {},

    },
    mutations: {
        [mutations.APPEND_LESSON](state, payload) {
            state.lessons[payload.id] = payload
        },
    },
    actions: {

        async fetchLesson({getters, commit}, {id}) {
            let lesson = getters.getLesson(id);
            if (lesson) return lesson
            // fetch from server
            return fb.refs.lessonsRef
                .child(id)
                .once('value')
                .then(snap => {
                    const newLesson = {...snap.val(), id}
                    commit(mutations.APPEND_LESSON, newLesson)
                    return newLesson
                })
            // otherwise show 404 page
            // todo:show 404 page
        },

    },
    getters: {
        lessons(state) {
            return state.lessons
        },
        getLesson(state) {
            return (id) => {
                return state.lessons[id]
            }
        },
    },
}
