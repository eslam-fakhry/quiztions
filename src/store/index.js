import Vue from 'vue'
import Vuex from 'vuex'

// import getters from './getters'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
    },

    state: {
        students: {
            "student1": {
                name:"Eslam Fakhry",
                email:"eslam@email.com",
                courses:{
                    "course1":{name:'psychology 101'}
                }
            },
        },
        teachers: {
            "teacher1": {
                name:"Muhammad Khaled",
                email:"eslam@email.com",
                courses:{
                    "course1":{name:'psychology 101'}
                }
            },
        },

        questions: {
            "1":{
                id: '1',
                body: 'what is the longest river in Africa?',
                serverValidate: false,
                type: 'selection',
                options: ['Nile', 'Rhine', 'Amazon'],
                rightAnswer: ['Nile']
            },
            "2":{
                id: '2',
                body: 'what is the longest river in Africa?',
                serverValidate: false,
                type: 'input',
                rightAnswer: ['Nile']
            },
            "3":{
                id: '3',
                body: 'complete',
                serverValidate: false,
                type: 'completion',
                template: '--blank-- is the --blank-- darkest color',
                rightAnswer: ['black', 'blue']
            },

            "4":{
                id: '4',
                body: 'complete',
                serverValidate: false,
                type: 'completion',
                template: '--blank-- of thrones is name of the famous hbo series',
                rightAnswer: ['game']
            },
            "5":{
                id: '5',
                body: 'complete',
                serverValidate: false,
                type: 'completion',
                template: '--blank-- of thrones is name of the famous hbo series',
                rightAnswer: ['game']
            },
            "6":{
                id: '6',
                body: 'what is the actor of El-kebeer series?',
                serverValidate: false,
                type: 'input',
                rightAnswer: ['Ahmed']
            },

        },
        lessons: {
            "1":{
                id: '1',
                name: 'basics stuff',
                questions: ['1', '2', '3']
            },
            "2":{
                id: '2',
                name: 'advanced stuff',
                questions: ['6', '5', '3']
            },
            "3":{
                id: '3',
                name: 'stuff with medium',
                questions: ['1', '4', '6', '3']
            },
            "4":{
                id: '4',
                name: 'stuff about you1',
                questions: ['6', '5', '3'],
            },
            "5":{
                id: '5',
                name: 'stuff about you2',
                questions: ['2', '6', '4', '3', '6', '3',],
            },
            "6":{
                id: '6',
                name: 'stuff about you3',
                questions: ['2', '6', '5', '3', '4',],
            },
        },
        courses: {
            "1":{
                id: '1',
                name: 'intro to machine learning',
                lessons: [
                    {id: '1', name: 'basics stuff'},
                    {id: '2', name: 'stuff with medium'},
                    {id: '3', name: 'stuff about you2'},
                ]
            },
            "2":{
                id: '2',
                name: 'intro to algebra',
                lessons: [
                    {id: '1', name: 'basics stuff'},
                    {id: '4', name: 'stuff with medium4'},
                    {id: '3', name: 'stuff about you2'},
                    {id: '5', name: 'stuff about you2'},
                    {id: '6', name: 'stuff about you2'},
                    {id: '7', name: 'stuff about you2'},
                ]
            },
            "3":{
                id: '3',
                name: 'philosophy',
                lessons: [
                    {id: '1', name: 'basics stuff'},
                    {id: '6', name: 'stuff with medium6'},
                    {id: '4', name: 'stuff about you4'},
                ]
            },
            "4":{
                id: '4',
                name: 'dream psychology',
                lessons: [
                    {id: '5', name: 'basics stuff5'},
                    {id: '2', name: 'stuff with medium'},
                    {id: '3', name: 'stuff about you2'},
                ],
            },
        },
        rightAnswers: {
            '1': ['Nile'],
            '2': ['Nile'],
            '3': ['black', 'blue'],
            '4': ['game'],
            '5': ['game'],
            '6': ['Ahmed']
        }

    },

    mutations: {},

    actions: {

        // eslint-disable-next-line no-unused-vars
        async fetchUserCourses({getters}, {id}) {
            // fetch from server

            // otherwise show user-friendly error

        },
        async fetchCourse({getters}, {id}) {
            let course = getters.getCourse(id)
            await new Promise(r => setTimeout(r, 2000))
            if (course) return course
            // fetch from server
            // otherwise show 404 page

        },
        async fetchLesson({getters}, {id}) {
            let lesson = getters.getLesson(id);
            await new Promise(r => setTimeout(r, 2000));
            if (lesson) return lesson
            // fetch from server

            // otherwise show 404 page


        },
        async fetchQuestion({getters}, {id}) {
            let question = getters.getQuestion(id);
            await new Promise(r => setTimeout(r, 2000));
            if (question) return question;
            // fetch from server

            // otherwise show user-friendly error

        },

        async fetchQuestionsInAdvance({dispatch}, {ids}) {
            ids.forEach((id) => {
                dispatch('fetchQuestion', {id})
            })
        },
    },

    getters: {
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
                // return state.courses.find(course => course.id === id)
            }
        },
        getLesson(state) {
            return (id) => {
                return state.lessons[id]
                // return state.lessons.find(lesson => lesson.id === id)
            }
        },
        getQuestion(state) {
            return (id) => {
                return state.questions[id]
                // return state.questions.find(question => question.id === id)
            }
        },
        getRightAnswer(state) {
            return (id) => {
                return state.rightAnswers[id]
            }
        },
    },
})
