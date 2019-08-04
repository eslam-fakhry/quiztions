// import Vue from 'vue'
import Vuetify from 'vuetify'

import {shallowMount, createLocalVue} from '@vue/test-utils'

import CompletionAnswer from "@/components/CompletionAnswer.vue"
import QuestionTemplate from "@/components/QuestionTemplate.vue"



const localVue = createLocalVue()
localVue.use(Vuetify)

describe('CompletionAnswer.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders QuestionTemplate component', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};
        const question={ id:'1',template:'--blank-- is --blank--'}

        const wrapper = createWrapper(value, uiState,question)

        expect(wrapper.find(QuestionTemplate).exists()).toBeTruthy()

    })

    it('emits the value up', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};
        const question={ id:'1',template:'--blank-- is --blank--'}

        const wrapper = createWrapper(value, uiState,question)
        wrapper.find(QuestionTemplate).vm.$emit('input',['answer'])
        expect(wrapper.emitted().input).toBeTruthy()

    })



    function createWrapper(value, uiState,question) {
        return shallowMount(CompletionAnswer, {
            localVue,
            vuetify,
            propsData: {value, uiState},
            provide:{
                question
            },
        })
    }
})
