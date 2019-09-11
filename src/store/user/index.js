import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'
import {showError} from "@/utils";
import router from "@/router";

export default {
    namespaced: true,
    state: {
        logged: false,
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        job: '',
        gender: '',
        birthday: '',
        courses: {},

    },

    mutations: {
        [mutations.SET_USER](state, user) {
            if (user) {
                const {uid, displayName, email, photoURL,} = user
                state = Object.assign(state, {uid, displayName, email, photoURL,})
                state.logged = true
            } else {
                //reset state
                state = {
                    logged: false,
                    uid: '',
                    email: '',
                    displayName: '',
                    photoURL: '',
                    job: '',
                    gender: '',
                    birthday: '',
                    courses: [],
                }
            }
        },
        [mutations.SET_USER_COURSES](state, courses) {
            state.courses = courses
        },
        [mutations.SET_PHOTO_URL](state, url) {
            state.photoURL = url
        },
        [mutations.SET_JOB](state, job) {
            state.job = job
        },
        [mutations.SET_DISPLAY_NAME](state, name) {
            state.displayName = name
        },
        [mutations.SET_GENDER](state, gender) {
            state.gender = gender
        },
        [mutations.SET_BIRTHDAY](state, birthday) {
            state.birthday = birthday
        },
    },

    actions: {
        signIn(_, {email, password}) {
            return fb.auth.signInWithEmailAndPassword(email, password)
        },
        signUp(_, {email, password}) {
            return fb.auth.createUserWithEmailAndPassword(email, password)
        },
        async signOut() {
            await fb.auth.signOut()
            router.replace({name: 'login'})
        },
        async fetchUserCourses({state, commit}) {
            // fetch from server
            await fb.fetchUserCourses(state.job, function (snap) {
                commit(mutations.SET_USER_COURSES, snap.val() || [])
            })
        },
        async setUserProfile({commit}, user) {
            try {
                commit(mutations.SET_USER, user)
                if (!user) return;
                commit(mutations.SET_JOB, await fb.getUserJob())
            } catch (e) {
                showError()
            }
        },
        async setUserJob({dispatch, commit}, {job}) {
            try {
                await dispatch('setJobInProfile', job)
                commit(mutations.SET_JOB, job)
                await dispatch('setEmailInDatabase')
                await fb.auth.currentUser.getIdToken(true)
            }catch (err) {
               showError(err.code)
            }
        },
        async setJobInProfile(_, job) {
            await fb.functions.httpsCallable('setJob')({job})
        },
        async setEmailInDatabase({getters, state}) {
            await fb.db.ref(getters.userDatabasePath)
                .set({
                    email: state.email,
                    profileCompletion: 2,
                })
        },
        async updateUserInfo({dispatch, commit}, payload) {
            await dispatch('updateNameInProfile', payload.fullName)
            await dispatch('updateUserInfoInDatabase', payload)
            commit(mutations.SET_DISPLAY_NAME, payload.fullName)
            commit(mutations.SET_GENDER, payload.gender)
            commit(mutations.SET_BIRTHDAY, payload.birthday)
        },
        async updateNameInProfile(_, displayName) {
            await fb.auth.currentUser.updateProfile({displayName,})
        },
        async updateUserInfoInDatabase({getters}, {fullName, gender, birthday}) {
            await fb.db.ref(getters.userDatabasePath)
                .update({
                    displayName: fullName,
                    gender,
                    birthday,
                    profileCompletion: 3,
                })
        },
        async updatePhotoURL({dispatch, commit}, url) {
            try {
                const photoURL = await fb.storage.ref(url).getDownloadURL()
                await dispatch('updatePhotoURLInProfile', photoURL)
                await dispatch('updatePhotoURLInDatabase', photoURL)
                commit(mutations.SET_PHOTO_URL, photoURL)
            } catch (e) {
                showError()
            }
        },
        async updatePhotoURLInProfile(_, photoURL) {
            await fb.auth.currentUser.updateProfile({photoURL,})
        },
        async updatePhotoURLInDatabase({getters}, photoURL) {
            // reference teachers or students records
            await fb.db.ref(getters.userDatabasePath)
                .update({
                    photoURL,
                    profileCompletion: 4,
                })
        },
        async enrollInCourse(_, {id, name}) {
            try {
                await fb.enrollInCourse({id, name})
            } catch (e) {
                showError()
            }
        },
        async leaveCourse(_, {id}) {
            try {
                await fb.leaveCourse({id})
            } catch (e) {
                showError()
            }
        },
    },

    getters: {
        isEnrolled(state) {
            return courseId => {
                return Object.keys(state.courses).includes(courseId)
            }
        },
        userDatabasePath(state){
            return state.job + 's/' + state.uid
        },
    },
}
