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
            // fetch from server
            await fb.fetchSyncedResource('courses', id, (snap) => {
                if (!snap.val()) {
                    return router.replace({name: 'not-found'})
                }
                commit(mutations.APPEND_COURSE, {...snap.val(), id})
            })
        },
        async fetchCourses({dispatch}) {
            try {
               await dispatch('fetchCoursesAndCommit');
            } catch (err) {
                showError('CAN_NOT_FETCH_COURSES')
            }
        },
        async fetchCoursesAndCommit({commit}) {
            const courses = await fb.fetchCourses()
            Object.entries(courses).forEach((courseEntry) => {
                commit(mutations.APPEND_COURSE, {...courseEntry[1], id: courseEntry[0]})
            })
        },
        async createCourse(_, {name}) {
            try {
                return await fb.createCourse({name})
            } catch (err) {
                showError(err.code)
            }
        },
        async deleteCourse(_, {courseId}) {
            await fb.deleteCourse(courseId)
        },
    },
}
