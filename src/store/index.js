import Vue from 'vue'
import Vuex from 'vuex'

//modules
import user from './user'
import courses from './courses'
import lessons from './lessons'
import questions from './questions'
import answers from './answers'
import snackbars from './snackbars'

Vue.use(Vuex)
Vue.config.devtools = process.env.NODE_ENV === 'development'

export default new Vuex.Store({
    modules: {
        user,
        courses,
        lessons,
        questions,
        answers,
        snackbars,
    },
})
