import fb from '../../services/firebase-facade'

export default {
    namespaced: true,
    state: {
        logged: false,
        uid: '',
        email: '',
        displayName: '',
        photoURL: '',
        courses: [],

    },
    mutations: {
        ['SET_USER'](state, user) {
            if (user) {
                const {uid, displayName, email, photoURL,} = user
                state = Object.assign(state, {uid, displayName, email, photoURL,})
                state.logged = true
            }else{
                //reset state
                state= {
                    logged: false,
                    uid: '',
                    email: '',
                    displayName: '',
                    photoURL: '',
                    courses: [],
                }
            }
        },
        ['SET_USER_COURSES'](state, courses) {
            state.courses = courses
        },
    },
    actions: {

        // eslint-disable-next-line no-unused-vars
        signIn({commit}, {email, password}) {
            return fb.auth.signInWithEmailAndPassword(email, password)
            // eslint-disable-next-line no-unused-vars
            //         .catch(function(error) {
            //         // Handle Errors here.
            //         // var errorCode = error.code;
            //         // var errorMessage = error.message;
            //         // ...
            //     });
        },

        // eslint-disable-next-line no-unused-vars
        signUp({commit}, {email, password}) {
            return fb.auth.createUserWithEmailAndPassword(email, password)
            // eslint-disable-next-line no-unused-vars
            //         .catch(function(error) {
            //         // Handle Errors here.
            //         // var errorCode = error.code;
            //         // var errorMessage = error.message;
            //         // ...
            //     });
        },

        // eslint-disable-next-line no-unused-vars
        signOut({commit}) {
            return fb.auth.signOut()
            // eslint-disable-next-line no-unused-vars
            //         .catch(function(error) {
            //         // Handle Errors here.
            //         // var errorCode = error.code;
            //         // var errorMessage = error.message;
            //         // ...
            //     });
        },

        // eslint-disable-next-line no-unused-vars
        async fetchUserCourses({state, commit}) {
            // fetch from server
            fb.db.ref('students')
                .child(state.uid)
                .child('courses')
                .on('value', function (snap) {
                    console.log('snap',snap);
                    console.log('snap.val()',snap.val());

                    commit('SET_USER_COURSES', snap.val())
                })
            // otherwise show user-friendly error

        },


    },
    getters: {
        loggedIn(state) {
            return state.logged
        },
    },
}