import Vue from 'vue'
import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'
import router from "../../router";
import {showSnackbar} from "@/utils";

export default {
    namespaced: true,
    state: {
        lessons: {},

    },
    mutations: {
        [mutations.APPEND_LESSON](state, payload) {
            Vue.set(state.lessons, payload.id, payload)

        },
    },
    actions: {
        async fetchLesson({getters, state, commit}, {id}) {
            let lesson = state.lessons[id];
            if (lesson) return lesson
            commit(mutations.APPEND_LESSON, {questions: [], id})

            await fb.fetchSyncedResource('lessons', id, (snap) => {
                if (!snap.val()) {
                    return router.replace({name: 'not-found'})
                }
                commit(mutations.APPEND_LESSON, {...snap.val(), id})
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
                    if (err.code === "PERMISSION_DENIED") {
                        showSnackbar('You have no authentication to complete this process', 'error')
                        return
                    }
                    showSnackbar('Something went wrong','error')
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
