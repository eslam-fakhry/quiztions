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

        async deleteLesson({commit, state, rootState}, {lessonId}) {

            const value = await fb.fetchResource('lessons', lessonId)
            const questions = value.questions ? Object.keys(value.questions) : []
            const courseId = value.courseId

            const updates = {};
            updates['/lessons/' + lessonId] = null;
            updates['/courses/' + courseId + '/lessons/' + lessonId] = null;
            questions.forEach((questionId) => {
                updates['/questions/' + questionId] = null;
                updates['/rightAnswers/' + questionId] = null;
            })

            fb.db.ref('lessons/' + lessonId).off('value')

            try {
                await fb.db.ref().update(updates);
            } catch (e) {
                if (e.code === "PERMISSION_DENIED") {
                    showSnackbar('You have no authentication to complete this process', 'error')
                    return
                }
                showSnackbar('Something went wrong', 'error')
            }
        },
    },
}
