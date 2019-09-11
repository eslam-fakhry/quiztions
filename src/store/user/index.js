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
        signIn({commit}, {email, password}) {
            return fb.auth.signInWithEmailAndPassword(email, password)
        },
        signUp({commit}, {email, password}) {
            return fb.auth.createUserWithEmailAndPassword(email, password)
        },
        async signOut() {
            await fb.auth.signOut()
            router.replace({name:'login'})
        },
        async fetchUserCourses({state, commit}) {
            // fetch from server
            await fb.fetchUserCourses(state.job, function (snap) {
                commit(mutations.SET_USER_COURSES, snap.val() || [])
            })
        },
        async setUserProfile({state, commit}, user) {
            try {
                commit(mutations.SET_USER, user)
                if (!user) return;
                commit(mutations.SET_JOB, await fb.getUserJob())
            } catch (e) {
                showError()
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
                showError()
            }
        },
        async enrollInCourse({state}, {id, name}) {
            try {
                await fb.enrollInCourse({id, name})
            } catch (e) {
                showError()
            }
        },
        async leaveCourse({state}, {id}) {
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
        }
    },
}
