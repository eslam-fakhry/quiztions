/* eslint-disable no-unused-vars */
import Vue from 'vue'

import './plugins/vuelidate'
import vuetify from './plugins/vuetify'
import fb from './services/firebase-facade'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/app.scss'

Vue.config.productionTip = false

// new Vue({
//     vuetify,
//     router,
//     store,
//     render: h => h(App)
// }).$mount('#app')

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
