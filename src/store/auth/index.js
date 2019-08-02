import fb from '../../services/firebase-facade'

export default {
    namespaced: true,
    state: {
       user:null

    },
    mutations: {
        ['SET_USER'](state,user){
            state.user = user
        }
    },
    actions: {

        // eslint-disable-next-line no-unused-vars
         signIn({commit}, {email,password}){
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
        signUp({commit}, {email,password}){
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
        signOut({commit}){
            return fb.auth.signOut()
        // eslint-disable-next-line no-unused-vars
        //         .catch(function(error) {
        //         // Handle Errors here.
        //         // var errorCode = error.code;
        //         // var errorMessage = error.message;
        //         // ...
        //     });
        },


    },
    getters: {
        loggedIn(state) {
            return state.user !== null
        },
    },
}
