import Vue from 'vue'
import Vuex from 'vuex'

// import getters from './getters'
import user from './user'

import fb from '../services/firebase-facade'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
    },

    state: {
        questions: {},
        lessons: {},
        courses: {},
        rightAnswers: {
            'question1': ['Nile'],
            'question2': ['Nile'],
            'question3': ['black', 'blue'],
            'question4': ['game'],
            'question5': ['game'],
            'question6': ['Ahmed']
        }
    },

    mutations: {
        ['SET_USER_COURSES'](state,courses){
            state.courses = courses
        },
        ['APPEND_COURSE'](state,payload){
            state.courses[payload.id] = payload
        },
        ['APPEND_LESSON'](state,payload){
            state.lessons[payload.id] = payload
        },
        ['APPEND_QUESTION'](state,payload){
            state.questions[payload.id] = payload
        },
        ['APPEND_RIGHT_ANSWER'](state,payload){
            state.rightAnswers[payload.id] = payload.value
        },
    },

    actions: {
        async fetchCourse({getters, commit}, {id}) {
            let course = getters.getCourse(id)
            if (course) return course
            // fetch from server
            return fb.refs.coursesRef
                .child(id)
                .once('value')
                .then(snap=>{
                    const newCourse = {...snap.val(),id}
                    commit('APPEND_COURSE',newCourse)
                    return newCourse
                })
            // todo:show 404 page
            // otherwise show 404 page
        },

        async fetchLesson({getters, commit}, {id}) {
            let lesson = getters.getLesson(id);
            if (lesson) return lesson
            // fetch from server
            return fb.refs.lessonsRef
                .child(id)
                .once('value')
                .then(snap=>{
                    const newLesson = {...snap.val(),id}
                    commit('APPEND_LESSON',newLesson)
                    return newLesson
                })
            // otherwise show 404 page
            // todo:show 404 page
        },

        async fetchQuestion({getters,commit}, {id}) {
            let question = getters.getQuestion(id);
            // await new Promise(r => setTimeout(r, 2000));
            if (question) return question;
            // fetch from server
            return fb.refs.questionsRef
                .child(id)
                .once('value')
                .then(snap=>{
                    const newQuestion = {...snap.val(),id}
                    commit('APPEND_QUESTION',newQuestion)
                    return newQuestion
                })
            // otherwise show user-friendly error
            // todo: show user-friendly error
        },

        async fetchRightAnswer({getters,commit}, {id}) {
            let rightAnswer = getters.getRightAnswer(id);
            // await new Promise(r => setTimeout(r, 2000));
            if (rightAnswer) return rightAnswer;
            // fetch from server
            return fb.refs.rightAnswersRef
                .child(id)
                .once('value')
                .then(snap=>{
                    const newRightAnswer = {value:snap.val(),id}
                    commit('APPEND_RIGHT_ANSWER',newRightAnswer)
                    return newRightAnswer
                })
            // todo: show user-friendly error
            // otherwise show user-friendly error
        },

        async fetchQuestionsInAdvance({dispatch}, {ids}) {
            ids.forEach((id) => {
                dispatch('fetchQuestion', {id})
            })
        },


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

    getters: {
        // todo: use mapState for simple getters
        courses(state) {
            return state.courses
        },
        lessons(state) {
            return state.lessons
        },
        questions(state) {
            return state.questions
        },
        getCourse(state) {
            return (id) => {
                return state.courses[id]
            }
        },
        getLesson(state) {
            return (id) => {
                return state.lessons[id]
            }
        },
        getQuestion(state) {
            return (id) => {
                return state.questions[id]
            }
        },
        getRightAnswer(state) {
            return (id) => {
                return state.rightAnswers[id]
            }
        },
    },
})
