import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'

export default {
    namespaced: true,
    state: {
        courses: {},

    },

    mutations: {
        [mutations.APPEND_COURSE](state, payload) {
            state.courses[payload.id] = payload
        },
    },

    actions: {
        async fetchCourse({commit, state}, {id}) {
            let course = state.courses[id]
            if (course) return course
            // fetch from server
            return fb.fetchResource('courses', id)
                .then(course => {
                    commit(mutations.APPEND_COURSE, course)
                    return course
                })
                .catch(err => {
                    console.error(err)
                })
            // todo:show 404 page
            // otherwise show 404 page
        },

        async createCourse({commit, state, rootState}, {name}) {
            return fb.createCourse({name})
            // otherwise show user-friendly error
                .catch(err => {
                    console.error(err)
                    // todo: show user-friendly error
                })
        },

        // async deleteCourse({commit, state, rootState}, {id}) {
        //
        //     return;
        //     // Get a key for a new Course.
        //     // const newCourseKey = fb.db.ref().child('courses').push().key;
        //
        //     // Write the new course's data simultaneously in the courses list and the user's course list.
        //
        //     const updates = {};
        //     updates['/courses/' + id] = null;
        //     updates['/teachers/' + rootState.user.uid + '/courses/' + id] = null;
        //     await fb.db.ref().update(updates);
        // },


    },
    getters: {
        courses(state) {
            return state.courses
        },
        getCourse(state) {
            return (id) => {
                return state.courses[id]
            }
        },
    },
}
