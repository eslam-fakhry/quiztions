// import Vue from 'vue'
import Vuetify from 'vuetify'

import {shallowMount, createLocalVue} from '@vue/test-utils'

import InputAnswer from "@/components/InputAnswer.vue"



const localVue = createLocalVue()
localVue.use(Vuetify)

describe('InputAnswer.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })


    it('renders v-textarea', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};

        const wrapper = createWrapper(value, uiState)
        expect(wrapper.find({name:'v-textarea'}).exists()).toBeTruthy()

    })




    function createWrapper(value, uiState) {
        return shallowMount(InputAnswer, {
            localVue,
            vuetify,
            propsData: {value, uiState},

        })
    }
})
