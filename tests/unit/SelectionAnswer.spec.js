import Vuetify from 'vuetify'

import {shallowMount, createLocalVue} from '@vue/test-utils'

import SelectionAnswer from "@/components/SelectionAnswer.vue"
import SelectionOptions from "@/components/SelectionOptions.vue"
import Vuex from "vuex";

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('SelectionAnswer.vue', () => {
    let vuetify
    let store
    let actions

    beforeEach(() => {
        actions = {
            fetchRightAnswer: jest.fn(),
        }
        store = new Vuex.Store({
            modules: {
                answers: {
                    namespaced: true,
                    actions
                }
            }
        })

        vuetify = new Vuetify()
    })

    it('renders SelectionOptions component', () => {
        const value = ''
        const uiState = {NOT_ANSWERED: true,};

        const wrapper = createWrapper(value, uiState)

        expect(wrapper.find(SelectionOptions).exists()).toBeTruthy()
    })

    it('can validate answer', () => {
        const value = ''
        const uiState = {NOT_ANSWERED: true,};

        actions.fetchRightAnswer.mockReturnValueOnce(Promise.resolve('answer'))

        const wrapper = createWrapper(value, uiState)

        wrapper.find(SelectionOptions).vm.$emit('input', 'answer')

        expect(wrapper.vm.validateAnswer('question1')).toBeTruthy()
        expect(actions.fetchRightAnswer).toHaveBeenCalled()
    })


    function createWrapper(value, uiState) {
        return shallowMount(SelectionAnswer, {
            localVue,
            vuetify,
            store,
            propsData: {value, uiState},
        })
    }
})
