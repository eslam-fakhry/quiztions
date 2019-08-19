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
            // Get a key for a new Lesson.
            const newLessonKey = fb.db.ref().child('lessons').push().key;
            // Write the new lesson's data simultaneously in the lessons list and the user's lesson list.
            const updates = {};
            updates['/lessons/' + newLessonKey] = {
                name,
                teacherId: rootState.user.uid,
            };
            updates['/courses/' + courseId + '/lessons/' + newLessonKey] = {
                name,
            };
            await fb.db.ref().update(updates);
            return newLessonKey
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
