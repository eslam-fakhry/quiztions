import fb from '@/services/firebase-facade'

export default {
    namespaced: true,
    state: {
        courses: {},

    },

    mutations: {
        ['SET_USER_COURSES'](state, courses) {
            state.courses = courses
        },
        ['APPEND_COURSE'](state, payload) {
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
                    commit('APPEND_COURSE', newCourse)
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
                    commit('APPEND_COURSE', newCourse)
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
