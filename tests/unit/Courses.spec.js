import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

import Courses from "@/views/Courses.vue"
import Router from "vue-router";

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Router)

describe('Courses.vue', () => {
    let vuetify
    let actions
    let state
    let store
    let router

    beforeEach(() => {
        state = {
            courses: {},
        }
        actions = {
            fetchUserCourses: jest.fn(() => {
                state.courses = {
                    'course1': {name: 'course1',},
                    'course2': {name: 'Course2',},
                }
            }),
        }
        store = new Vuex.Store({
            modules: {
                user: {namespaced: true, actions, state},
            },
        })
        vuetify = new Vuetify()
        router = new Router({
            routes: [
                {
                    path: '/course/:course_id',
                    name: 'course',
                }
            ]
        })
    })

    it('fetches course', async () => {
        createWrapper()
        expect(actions.fetchUserCourses).toHaveBeenCalled()
    })

    it('lists the lessons', async () => {
        const wrapper = createWrapper()
        await flushPromises()
        expect(wrapper.html()).toContain(state.courses.course1.name)
        expect(wrapper.html()).toContain(state.courses.course2.name)
    })

    function createWrapper() {
        return mount(Courses, {
            localVue,
            vuetify,
            store,
            router,
        })
    }
})
