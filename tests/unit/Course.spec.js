import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Router from 'vue-router'
import flushPromises from 'flush-promises'
import Course from "@/views/Course.vue"

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Router)

describe('Course.vue', () => {
    let vuetify
    let state
    let actions
    let store
    let router

    beforeEach(() => {
        state = {
            courses: {},
        }
        actions = {
            fetchCourse: jest.fn(() => {
                state.courses = {
                    'course1': {
                        name: 'course1',
                        lessons: {
                            lesson1: {
                                name: 'Lesson1'
                            },
                            lesson2: {
                                name: 'Lesson2'
                            },
                        }

                    }
                }
            }),
        }
        store = new Vuex.Store({
            modules: {
                courses: {
                    namespaced: true,
                    actions,
                    state
                },
            },
        })
        vuetify = new Vuetify()
        router = new Router({
            routes:[
                {
                    path: '/lesson/:lesson_id',
                    name: 'lesson',
                }
            ]
        })
    })

    it('fetches course', async () => {
        const course_id = "course1"
        createWrapper(course_id)
        expect(actions.fetchCourse).toHaveBeenCalled()
    })

    it('lists the lessons', async () => {
        const course_id = "course1"
        const wrapper = createWrapper(course_id)
        await flushPromises()
        expect(wrapper.html()).toContain(state.courses.course1.lessons.lesson1.name)
        expect(wrapper.html()).toContain(state.courses.course1.lessons.lesson2.name)
    })

    function createWrapper(course_id) {
        return mount(Course, {
            localVue,
            vuetify,
            store,
            router,
            propsData: {
                course_id
            },
        })
    }
})
