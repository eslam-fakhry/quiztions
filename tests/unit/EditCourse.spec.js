import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

import helpers from '../helpers'
const {select} = helpers;

import EditCourse from "@/views/EditCourse.vue"

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('EditCourse.vue', () => {
    let vuetify
    let wrapper
    let actions
    let store

    beforeEach(() => {
        actions = {
            createCourse: jest.fn(),
        }
        store = new Vuex.Store({
            modules:{
                courses:{
                    namespaced:true,
                    actions
                }
            }
        })
        vuetify = new Vuetify()

    })

    it('renders', () => {
        wrapper = createWrapper()
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


    function createWrapper() {
        return mount(EditCourse, {
            localVue,
            vuetify,
            store,


        })
    }
})
