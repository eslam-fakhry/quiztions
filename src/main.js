import Vue from 'vue'

import './plugins/vuetify'
import './plugins/vuelidate'
// import fb from './services/firebaseConfig'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// handle page reloads
// let app
// fb.auth.onAuthStateChanged(user => {
//     if (!app) {
//         app = new Vue({
//             el: '#app',
//             router,
//             store,
//             render: h => h(App)
//         })
//     }
// })
