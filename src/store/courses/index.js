import Vue from 'vue'
import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'
import router from "@/router";
import {showError} from "@/utils";

export default {
    namespaced: true,
    state: {
        courses: {},

    },

    mutations: {
        [mutations.APPEND_COURSE](state, payload) {
            Vue.set(state.courses, payload.id, payload)
        },
    },

    actions: {
        async fetchCourse({commit, state}, {id}) {
            let course = state.courses[id]
            if (course) return course
            commit(mutations.APPEND_COURSE, {lessons: [], id})
            // fetch from server
            await fb.fetchSyncedResource('courses', id, (snap) => {
                if (!snap.val()) {
                    return router.replace({name: 'not-found'})
                }
                commit(mutations.APPEND_COURSE, {...snap.val(), id})
            })
        },
        async fetchCourses({commit}) {
            try {
                // fetch from server
                const courses = await fb.fetchCourses()
                Object.entries(courses).forEach((courseEntry) => {
                    commit(mutations.APPEND_COURSE, {...courseEntry[1], id: courseEntry[0]})
                })
            } catch (err) {
                // otherwise show 404 page
                showError('CAN_NOT_FETCH_COURSES')
            }
        },

        async createCourse(_, {name}) {
            return fb.createCourse({name})
            // otherwise show user-friendly error
                .catch(err => {
                   showError(err.code)
                })
        },

        async deleteCourse(_, {courseId}) {
           await fb.deleteCourse(courseId)
        },
    },
}
