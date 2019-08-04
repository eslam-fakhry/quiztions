// import Vue from 'vue'
import Vuetify from 'vuetify'

import {shallowMount, createLocalVue} from '@vue/test-utils'

import Answer from "@/components/Answer.vue"



const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Answer.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders InputAnswer component if question type is input', () => {
        const question={ id:'1',type:'input'}

        const wrapper = createWrapper(question)

        expect(wrapper.find({name:'InputAnswer'}).exists()).toBeTruthy()

    })
    it('renders SelectionAnswer component if question type is selection', () => {
        const question={ id:'1',type:'selection'}

        const wrapper = createWrapper(question)

        expect(wrapper.find({name:'SelectionAnswer'}).exists()).toBeTruthy()

    })
    it('renders CompletionAnswer component if question type is completion', () => {
        const question={ id:'1',type:'completion'}

        const wrapper = createWrapper(question)

        expect(wrapper.find({name:'CompletionAnswer'}).exists()).toBeTruthy()

    })




    function createWrapper(question) {
        return shallowMount(Answer, {
            localVue,
            vuetify,
            provide:{
                question
            },
        })
    }
})
