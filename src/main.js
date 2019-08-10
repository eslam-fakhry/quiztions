/* eslint-disable no-unused-vars */
import Vue from 'vue'

import './plugins/vuelidate'
import vuetify from './plugins/vuetify'
import fb from './services/firebase-facade'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/app.scss'
import {showSnackbar} from "./utils";

Vue.config.productionTip = false

// new Vue({
//     vuetify,
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

Vue.config.devtools = process.env.NODE_ENV === 'development'

// handle page reloads
let app
fb.auth.onAuthStateChanged(user => {
    store.commit('user/SET_USER',user)

    if (!app) {
        app = new Vue({
            el:'#app',
            vuetify,
            router,
            store,
            render: h => h(App)
        })
        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;

    }
    // if (user) {
    //     // User is signed in.
    //     var displayName = user.displayName;
    //     var email = user.email;
    //     var emailVerified = user.emailVerified;
    //     var photoURL = user.photoURL;
    //     var isAnonymous = user.isAnonymous;
    //     var uid = user.uid;
    //     var providerData = user.providerData;
    //     // ...
    //     console.log(email);
    //     console.log(emailVerified);
    // } else {
    //     // User is signed out.
    //     // ...
    // }

});

window.onerror = function(message, source, lineNumber,collNumber, errorObject){
    showSnackbar('Something went wrong','error')
}

// firebase rules todos

//todo: only teachers can create courses, lessons, and questions
