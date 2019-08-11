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
            return fb.refs.coursesRef
                .child(id)
                .once('value')
                .then(snap => {
                    const newCourse = {...snap.val(), id}
                    commit(mutations.APPEND_COURSE, newCourse)
                    return newCourse
                })
            // todo:show 404 page
            // otherwise show 404 page
        },

        async createCourse({commit, state}, {id}) {
            let course = state.courses[id]
            if (course) return course
            // fetch from server
            return fb.refs.coursesRef
                .child(id)
                .once('value')
                .then(snap => {
                    const newCourse = {...snap.val(), id}
                    commit(mutations.APPEND_COURSE, newCourse)
                    return newCourse
                })
            // todo:show 404 page
            // otherwise show 404 page
        },


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
