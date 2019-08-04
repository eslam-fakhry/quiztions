// import Vue from 'vue'
import Vuetify from 'vuetify'

import {mount, createLocalVue} from '@vue/test-utils'
import QuestionTemplate from "@/components/QuestionTemplate.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)

describe('QuestionTemplate.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()

    })

    it('renders a simple template', () => {
        // const template = '--blank-- is good'
        const value=['']
        const uiState={
            NOT_ANSWERED: true,
        };
        const question = {template : '--blank-- is good'}

        const wrapper = createWrapper(value,uiState,question)

        expect(wrapper.contains('.v-text-field input')).toBeTruthy()
        expect(wrapper.html()).toContain('is good')
    })

    it('emits the answer on input', () => {
        // const template = '--blank-- is good'
        const value=['']
        const uiState={
            NOT_ANSWERED: true,
        };
        const question = {template : '--blank-- is good'}

        const wrapper = createWrapper(value,uiState,question)
        wrapper.find('.v-text-field input').setValue('ba')
        expect(wrapper.emitted().input.length).toBeTruthy()
    })



    function createWrapper(value,uiState,question) {
        return mount(QuestionTemplate, {
            localVue,
            vuetify,
            propsData: {value,uiState,},
            provide:{
                question
            }
        })
    }

})
