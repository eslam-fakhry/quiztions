import Vue from 'vue'
import Vuex from 'vuex'

// import getters from './getters'

//modules
import user from './user'
import courses from './courses'
import lessons from './lessons'
import questions from './questions'
import answers from './answers'
import layouts from './layouts'
import snackbars from './snackbars'

import fb from '../services/firebase-facade'


Vue.use(Vuex)
Vue.config.devtools = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
    modules: {
        user,
        courses,
        lessons,
        questions,
        answers,
        layouts,
        snackbars,
    },
    actions: {

        //---------------------------------- TEST ----------------------

        // todo: remove this function
        async addCoursesToUser({state}) {
            console.log('adding course to user');
            fb.db.ref('students').child(state.user.uid).child('courses').set({
                "course1": {name: "intro to machine learning"},
                "course2": {name: "intro to machine learning 2"},
            })

        },

        //---------------------------------- END TEST ----------------------
    },

})
