import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

import Lesson from "@/views/Lesson.vue"
import Question from "@/components/Question.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('Lesson.vue', () => {
    let vuetify
    let state
    let actions
    let store



    beforeEach(() => {
        state = {
            lessons: {
                'lesson1': {
                    name: 'Lesson1',
                    questions: {
                        question1: 'question1',
                        question2: 'question2',
                    }
                }
            },
        }
        actions = {
            fetchLesson: jest.fn(cb => {
                state.lessons = {
                    'lesson1': {
                        name: 'Lesson1',
                        questions: {
                            question1: 'question1',
                            question2: 'question2',
                        }
                    }
                }
            }),
        }
        store = new Vuex.Store({
            modules: {
                lessons: {
                    namespaced: true,
                    actions,
                    state
                },
            },
        })
        vuetify = new Vuetify()
    })

    it('dispatches "fetchLesson" when created', () => {
        const lesson = {
            id: 'lesson1',
            name: 'basic html',
            questions: ['question1', 'question2', 'question3']
        }
        const lesson_id = 'question1'
        actions.fetchLesson.mockReturnValueOnce(Promise.resolve(lesson))

        createWrapper(lesson_id)

        expect(actions.fetchLesson).toHaveBeenCalled()

    })

    it('renders "Loading" when fetching', () => {
        const lesson = {
            id: 'lesson1',
            name: 'basic html',
            questions: ['question1', 'question2', 'question3']
        }
        const lesson_id = 'lesson1'
        actions.fetchLesson.mockReturnValueOnce(Promise.resolve(lesson))

        const wrapper = createWrapper(lesson_id)

        expect(wrapper.find({name: "Loading"}).exists()).toBeTruthy()
    })

    it('renders "Question" component with the first question id', async () => {
        const lesson = {
            id: 'lesson1',
            name: 'basic html',
            questions: ['question1', 'question2', 'question3']
        }
        const lesson_id = 'lesson1'
        actions.fetchLesson.mockReturnValueOnce(Promise.resolve(lesson))

        const wrapper = createWrapper(lesson_id)
        await flushPromises()
        expect(wrapper.find(Question).exists()).toBeTruthy()
        expect(wrapper.find(Question).attributes('questionid')).toBe(lesson.questions[0])
    })

    function createWrapper(lesson_id) {
        return mount(Lesson, {
            localVue,
            vuetify,
            store,
            propsData: {
                lesson_id
            },
            stubs:['Question','Loading','ResultMessage']
        })
    }
})
