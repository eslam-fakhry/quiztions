// import Vue from 'vue'
import Vuetify from 'vuetify'

import {shallowMount, createLocalVue} from '@vue/test-utils'

import SelectionAnswer from "@/components/SelectionAnswer.vue"
import SelectionOptions from "@/components/SelectionOptions.vue"



const localVue = createLocalVue()
localVue.use(Vuetify)

describe('SelectionAnswer.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders SelectionOptions component', () => {
        const value = ['']
        const uiState = {NOT_ANSWERED: true,};

        const wrapper = createWrapper(value, uiState)

        expect(wrapper.find(SelectionOptions).exists()).toBeTruthy()

    })



    function createWrapper(value, uiState) {
        return shallowMount(SelectionAnswer, {
            localVue,
            vuetify,
            propsData: {value, uiState},
        })
    }
})
