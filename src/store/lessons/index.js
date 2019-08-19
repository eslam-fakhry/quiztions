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

        async fetchLesson({getters, state, commit}, {id}) {
            let lesson = state.lessons[id];
            if (lesson) return lesson
            // fetch from server
            return fb.fetchResource('lessons', id)
                .then(lesson => {
                    commit(mutations.APPEND_LESSON, lesson)
                    return lesson
                })
                // otherwise show 404 page
                .catch((err) => {
                    console.error(err)
                    // todo:show 404 page
                })
        },
        async createLesson({commit, state, rootState}, {name, courseId}) {
            return fb.createLesson({name, courseId})
                .then(({key, lesson}) => {
                    commit(mutations.APPEND_LESSON, lesson)
                    // commit('course/UPDATE_COURSE')
                    return key
                })
                // otherwise show user-friendly error
                .catch(err => {
                    // todo: show user-friendly error
                    console.error(err)
                })
        },


        // async deleteLesson({commit, state, rootState}, {id}) {
        //
        //     // Get a key for a new Lesson.
        //     // const newLessonKey = fb.db.ref().child('courses').push().key;
        //
        //     // Write the new course's data simultaneously in the courses list and the user's course list.
        //
        //     const updates = {};
        //     updates['/courses/' + id] = null;
        //     updates['/teachers/' + rootState.user.uid + '/courses/' + id] = null;
        //     await fb.db.ref().update(updates);
        // },

    },
}
