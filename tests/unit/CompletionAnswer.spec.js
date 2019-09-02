import Vuetify from 'vuetify'
import {shallowMount, createLocalVue} from '@vue/test-utils'

import CompletionAnswer from "@/components/CompletionAnswer.vue"
import QuestionTemplate from "@/components/QuestionTemplate.vue"
import Vuex from "vuex";

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('CompletionAnswer.vue', () => {
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

    it('renders QuestionTemplate component', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};
        const question={ id:'1',template:'--blank-- is --blank--'}

        const wrapper = createWrapper(value, uiState,question)

        expect(wrapper.find(QuestionTemplate).exists()).toBeTruthy()
    })

    it('emits answered', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};
        const question={ id:'1',template:'--blank-- is --blank--'}

        const wrapper = createWrapper(value, uiState,question)
        wrapper.find(QuestionTemplate).vm.$emit('input',['answer'])
        expect(wrapper.emitted().answered).toBeTruthy()
    })

    it('can validate answer', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};

        const question={ id:'1',template:'--blank-- is --blank--'}
        actions.fetchRightAnswer.mockReturnValueOnce(Promise.resolve(['answer']))

        const wrapper = createWrapper(value, uiState, question)

        wrapper.find(QuestionTemplate).vm.$emit('input', [ 'answer' ])

        expect(wrapper.vm.validateAnswer('question1')).toBeTruthy()
        expect(actions.fetchRightAnswer).toHaveBeenCalled()
    })

    function createWrapper(value, uiState,question) {
        return shallowMount(CompletionAnswer, {
            localVue,
            vuetify,
            store,
            propsData: {value, uiState},
            provide:{
                question
            },
        })
    }
})
