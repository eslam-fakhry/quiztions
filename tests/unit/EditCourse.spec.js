import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'
import Router from 'vue-router'

import helpers from '../helpers'
const {select} = helpers;

import EditCourse from "@/views/EditCourse.vue"

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Router)

describe('EditCourse.vue', () => {
    let vuetify
    let wrapper
    let state
    let actions
    let store
    let router


    beforeEach(() => {
        state = {
            courses: {},
        }
        actions = {
            fetchCourse: jest.fn(cb => {
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
        vuetify = new Vuetify()

    })

    it('renders', () => {
        const course_id = 'course1'
        wrapper = createWrapper(course_id)
        expect(wrapper.isVueInstance()).toBeTruthy()

    })

    // it('shows a text field for the name of the course', async () => {
    //
    //     wrapper = createWrapper()
    //     expect(select('name-field', wrapper).exists()).toBeTruthy()
    // })


    // function chooseType(type) {
    //     select('select-question-type', wrapper).setValue(type)
    // }
    //
    // function addBody(text) {
    //     select('question-body', wrapper).setValue(text || 'new body')
    // }
    //
    // function addSelectionOptions(options) {
    //
    //     wrapper.find(CreateList).vm.$emit('input', options || ['item1', 'item2', 'item3'])
    // }


    function createWrapper(course_id) {
        return mount(EditCourse, {
            localVue,
            vuetify,
            store,
            router,
            propsData:{ course_id }
        })
    }
})
