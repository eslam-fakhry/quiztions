import fb from '@/services/firebase-facade'
import mutations from '../mutation-types'
import {showSnackbar} from "@/utils";

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
        signIn({commit}, {email, password}) {
            return fb.auth.signInWithEmailAndPassword(email, password)
        },
        signUp({commit}, {email, password}) {
            return fb.auth.createUserWithEmailAndPassword(email, password)
        },
        signOut() {
            return fb.auth.signOut()
        },
        async fetchUserCourses({state, commit}) {
            // fetch from server
            await fb.fetchUserCourses(state.job, function (snap) {
                commit(mutations.SET_USER_COURSES, snap.val() || [])
            })
        },
        async setUserProfile({state, commit}, user) {
            commit(mutations.SET_USER, user)
            if (!user) return;
            try {
                const idTokenResult = await fb.auth.currentUser.getIdTokenResult()
                commit(mutations.SET_JOB, idTokenResult.claims.job)
            } catch (e) {
                showSnackbar("Something went wrong", "error")
            }
        },
        async setUserJob({state, commit}, {job}) {
            await fb.functions.httpsCallable('setJob')({job})
            commit(mutations.SET_JOB, job)
            await fb.db.ref(job + 's')
                .child(state.uid)
                .set({
                    email: state.email,
                    profileCompletion: 2,
                })
            await fb.auth.currentUser.getIdToken(true)
        },
        async updateUserInfo({state, commit}, {fullName, gender, birthday}) {
            await fb.auth.currentUser.updateProfile({
                displayName: fullName,
            })
            await fb.db.ref(state.job + 's')
                .child(state.uid)
                .update({
                    displayName: fullName,
                    gender,
                    birthday,
                    profileCompletion: 3,
                })
            commit(mutations.SET_DISPLAY_NAME, fullName)
            commit(mutations.SET_GENDER, gender)
            commit(mutations.SET_BIRTHDAY, birthday)
        },
        async updatePhotoURL({state, commit}, url) {
            try {
                const photoURL = await fb.storage.ref(url).getDownloadURL()
                await fb.auth.currentUser.updateProfile({
                    photoURL,
                })
                await fb.db.ref(state.job + 's')
                    .child(state.uid)
                    .update({
                        photoURL,
                        profileCompletion: 4,
                    })
                commit(mutations.SET_PHOTO_URL, photoURL)
            } catch (e) {
                showSnackbar("Something went wrong", "error")
            }
        },
        async enrollInCourse({state}, {id, name}) {
            try {
                await fb.enrollInCourse({id, name})
            } catch (e) {
                showSnackbar("Something went wrong", "error")
            }
        },
        async leaveCourse({state}, {id}) {
            try {
                await fb.leaveCourse({id})
            } catch (e) {
                showSnackbar("Something went wrong", "error")
            }
        },
    },

    getters: {
        isEnrolled(state) {
            return courseId => {
                return Object.keys(state.courses).includes(courseId)
            }
        }
    },
}
