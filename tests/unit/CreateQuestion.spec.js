import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import flushPromises from 'flush-promises'

import helpers from '../helpers'
import CreateQuestion from "@/components/create-question/CreateQuestion.vue"
import CreateList from "@/components/CreateList.vue"

const {select} = helpers;

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuelidate)

describe('CreateQuestion.vue', () => {
    let vuetify
    let wrapper


    beforeEach(() => {

        vuetify = new Vuetify()

    })

    it('renders', () => {
        const lesson_id = 'lesson1'

        wrapper = createWrapper(lesson_id)

        expect(wrapper.isVueInstance()).toBeTruthy()

    })

    it('shows "v-select" to choose type of question', async () => {

        const lesson_id = 'lesson1'

        wrapper = createWrapper(lesson_id)
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


    function createWrapper(lesson_id) {
        return mount(CreateQuestion, {
            localVue,
            vuetify,
            propsData: {lesson_id}

        })
    }
})
