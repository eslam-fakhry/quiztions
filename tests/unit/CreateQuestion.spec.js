import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

import helpers from '../helpers'
const {select} = helpers;

import CreateQuestion from "@/components/create-question/CreateQuestion.vue"
import CreateList from "@/components/CreateList.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('CreateQuestion.vue', () => {
    let vuetify
    let wrapper


    beforeEach(() => {

        vuetify = new Vuetify()

    })

    it('renders', () => {

        wrapper = createWrapper()

        expect(wrapper.isVueInstance()).toBeTruthy()

    })

    it('shows "v-select" to choose type of question', async () => {

        wrapper = createWrapper()
        //todo: remove internal functionality tests
        expect(select('select-question-type', wrapper).exists()).toBeTruthy()
        chooseType('Selection')
        expect(wrapper.vm.selectedAnswerType).toBe('Selection')
        addBody()
        expect(wrapper.vm.body[0]).toBe('new body')
        await flushPromises()
        addSelectionOptions()
        expect(wrapper.vm.options).toEqual(['item1', 'item2', 'item3'])

    })


    function chooseType(type) {
        select('select-question-type', wrapper).setValue(type)
    }

    function addBody(text) {
        select('question-body', wrapper).setValue(text || 'new body')
    }

    function addSelectionOptions(options) {

        wrapper.find(CreateList).vm.$emit('input', options || ['item1', 'item2', 'item3'])
    }


    function createWrapper() {
        return mount(CreateQuestion, {
            localVue,
            vuetify,

        })
    }
})