import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import flushPromises from 'flush-promises'

import Question from "@/components/Question.vue"



const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('Question.vue', () => {
    let vuetify
    let actions
    let store



    beforeEach(() => {
        actions = {
            fetchQuestion: jest.fn(),
        }
        store = new Vuex.Store({
            modules:{
                questions:{
                    namespaced:true,
                    actions
                }
            }
        })
        vuetify = new Vuetify()
    })

    it('dispatches "fetchQuestion" when created', () => {
        const question={
                body:"what is the longest river in Africa",
                id : 'question1',
                type:'selection',
                options:['Nile','Rhine','Amazon']
            }
        const questionId = 'question1'
        actions.fetchQuestion.mockReturnValueOnce(Promise.resolve(question))

        createWrapper(questionId)

        expect(actions.fetchQuestion).toHaveBeenCalled()

    })


    it('renders "Loading" when fetching', () => {
        const question={
                body:"what is the longest river in Africa",
                id : 'question1',
                type:'selection',
                options:['Nile','Rhine','Amazon']
            }
        const questionId = 'question1'
        actions.fetchQuestion.mockReturnValueOnce(Promise.resolve(question))

        const wrapper = createWrapper(questionId)

        expect(wrapper.find({name:"Loading"}).exists()).toBeTruthy()

    })

    it('renders question body', async () => {
        const question={
                body:"what is the longest river in Africa",
                id : 'question1',
                type:'selection',
                options:['Nile','Rhine','Amazon']
            }
        const questionId = 'question1'
        actions.fetchQuestion.mockReturnValueOnce(Promise.resolve(question))

        const wrapper = createWrapper(questionId)
        await flushPromises()
        expect(wrapper.html()).toContain(question.body)
    })

    it('accepts question body of type array', async () => {
        const question={
                body:[
                    {text:"what is the longest river in Africa?"},
                    {text:"what is the longest river in Asia?"},

                ],
                id : 'question1',
                type:'selection',
                options:['Nile','Rhine','Amazon']
            }
            const questionId = 'question1'

        actions.fetchQuestion.mockReturnValueOnce(Promise.resolve(question))

        const wrapper = createWrapper(questionId)
        await flushPromises()
        expect(wrapper.html()).toContain(question.body[0].text)
        expect(wrapper.html()).toContain(question.body[1].text)

    })





    function createWrapper(questionId) {
        return mount(Question, {
            localVue,
            vuetify,
            store,
            propsData:{
                questionId
            },
        })
    }
})
