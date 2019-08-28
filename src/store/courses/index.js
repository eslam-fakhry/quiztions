import Vue from 'vue'
import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'
import router from "@/router";
import {showSnackbar} from "@/utils";

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
                Object.entries(courses).forEach((courseEntry)=>{
                    commit(mutations.APPEND_COURSE, {...courseEntry[1],id:courseEntry[0] })
                })
            } catch (err) {
               // otherwise show 404 page
               showSnackbar('Error fetching courses','error')
            }
        },

        async createCourse({commit, state, rootState}, {name}) {
            return fb.createCourse({name})
            // otherwise show user-friendly error
                .catch(err => {
                    if (err.code === "PERMISSION_DENIED") {
                        showSnackbar('You have no authentication to complete this process', 'error')
                        return
                    }
                    showSnackbar('Something went wrong','error')
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
}
