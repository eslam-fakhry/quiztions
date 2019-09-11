import Vuetify from 'vuetify'

import {shallowMount, createLocalVue} from '@vue/test-utils'

import SelectionOptions from "@/components/SelectionOptions.vue"
import SingleSelectionOption from "@/components/SingleSelectionOption.vue"

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('SelectionOptions.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders question options', () => {
        const value = ''
        const uiState = {NOT_ANSWERED: true,};
        const disabled = false

        const question = {
            body:"what is the longest river in Africa",
            id : 'question1',
            type:'selection',
            options:['Nile','Rhine','Amazon']
        }

        const wrapper = createWrapper(value, uiState,disabled,question)

        expect(wrapper.findAll(SingleSelectionOption).length).toBe(3)
    })

    it('emits the chosen option', () => {

        const value = 'Nile'
        const uiState = {NOT_ANSWERED: true,};
        const disabled = false

        const question = {
            body:"what is the longest river in Africa",
            id : 'question1',
            type:'selection',
            options:['Nile','Rhine','Amazon']
        }

        const wrapper = createWrapper(value, uiState,disabled,question)

        wrapper.findAll(SingleSelectionOption).at(0).vm.$emit('click')

        expect(wrapper.emitted().input[0][0]).toEqual('Nile')

        wrapper.findAll(SingleSelectionOption).at(1).vm.$emit('click')
        expect(wrapper.emitted().input[1][0]).toEqual('Rhine')

    })

    it('does not emit if disabled', () => {

        const value = 'Nile'
        const uiState = {NOT_ANSWERED: true,};
        const disabled = true

        const question = {
            body:"what is the longest river in Africa",
            id : 'question1',
            type:'selection',
            options:['Nile','Rhine','Amazon']
        }

        const wrapper = createWrapper(value, uiState,disabled,question)

        wrapper.findAll(SingleSelectionOption).at(0).vm.$emit('click')
        wrapper.findAll(SingleSelectionOption).at(1).vm.$emit('click')
        wrapper.findAll(SingleSelectionOption).at(2).vm.$emit('click')
        expect(wrapper.emitted().input).toBeFalsy()



    })

    function createWrapper(value, uiState,disabled,question) {
        return shallowMount(SelectionOptions, {
            localVue,
            vuetify,
            propsData: {value, uiState,disabled},
            provide:{
                question
            },
        })
    }
})
