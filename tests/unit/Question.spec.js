// import Vue from 'vue'
import Vuetify from 'vuetify'

import {mount, createLocalVue} from '@vue/test-utils'

import Question from "@/components/Question.vue"



const localVue = createLocalVue()
localVue.use(Vuetify)

describe('Question.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders question body', () => {
        const question={
                body:"what is the longest river in Africa",
                id : 'question1',
                type:'selection',
                options:['Nile','Rhine','Amazon']
            }

        const wrapper = createWrapper(question)

        expect(wrapper.html()).toContain(question.body)

    })

    it('accepts question body of type array', () => {
        const question={
                body:[
                    {text:"what is the longest river in Africa?"},
                    {text:"what is the longest river in Asia?"},

                ],
                id : 'question1',
                type:'selection',
                options:['Nile','Rhine','Amazon']
            }

        const wrapper = createWrapper(question)

        expect(wrapper.html()).toContain(question.body[0].text)
        expect(wrapper.html()).toContain(question.body[1].text)

    })





    function createWrapper(question) {
        return mount(Question, {
            localVue,
            vuetify,
            propsData:{
                question
            },
        })
    }
})
