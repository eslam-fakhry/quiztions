import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import flushPromises from 'flush-promises'

import helpers from '../helpers'
import CreateQuestion from "@/components/create-question/CreateQuestion.vue"
import CreateCompletionQuestion from '@/components/create-question/CreateCompletionQuestion'
import CreateInputQuestion from '@/components/create-question/CreateInputQuestion'
import CreateSelectionQuestion from '@/components/create-question/CreateSelectionQuestion'


const {select} = helpers;

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuelidate)

describe('CreateQuestion.vue', () => {
    let vuetify
    let wrapper
    let actions
    let store

    beforeEach(() => {
        actions = {
            createQuestion: jest.fn(),
        }
        store = new Vuex.Store({
            modules: {
                questions: {
                    namespaced: true,
                    actions,
                },
            },
        })
        store.dispatch = jest.fn()
        vuetify = new Vuetify()

    })

    it('shows "v-select" to choose type of question', async () => {
        const lesson_id = 'lesson1'

        wrapper = createWrapper(lesson_id)
        expect(select('select-question-type', wrapper).exists()).toBeTruthy()
    })

    /*
        Create----Question component can be:
        - CreateInputQuestion
        - CreateSelectionQuestion
        - CreateCompletionQuestion
     */
    it('dynamically renders the Create----Question component', async () => {
        const lesson_id = 'lesson1'

        wrapper = createWrapper(lesson_id)
        chooseType('Selection')
        await flushPromises()
        expect(wrapper.find(CreateSelectionQuestion).exists()).toBeTruthy()

        chooseType('Completion')
        await flushPromises()
        expect(wrapper.find(CreateCompletionQuestion).exists()).toBeTruthy()

        chooseType('Input')
        await flushPromises()
        expect(wrapper.find(CreateInputQuestion).exists()).toBeTruthy()
    })

    it('can create Selection question', async () => {
        const lesson_id = 'lesson1'

        wrapper = createWrapper(lesson_id)
        chooseType('Selection')
        addBody('question body')
        await flushPromises()
        expect(wrapper.vm.$v.$invalid).toBeTruthy()
        wrapper.find(CreateSelectionQuestion).vm.$emit('update:questionPart', {
            type: 'selection',
            options: ['option-one', 'option-one']
        })
        wrapper.find(CreateSelectionQuestion).vm.$emit('update:rightAnswer', ['option-one'])
        await flushPromises()
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
        select('save-btn', wrapper).trigger('click')
        expect(store.dispatch).toHaveBeenCalledWith(
            'questions/createQuestion',
            {
                lessonId: "lesson1",
                question: {
                    body: "question body",
                    options: ["option-one", "option-one"],
                    renderedLocally: false,
                    timed: false,
                    type: "selection"
                },
                rightAnswer: ["option-one"]
            }
        )
    })

    it('can create Input question', async () => {
        const lesson_id = 'lesson1'

        wrapper = createWrapper(lesson_id)
        chooseType('Input')
        addBody('question body')
        await flushPromises()
        expect(wrapper.vm.$v.$invalid).toBeTruthy()

        wrapper.find(CreateInputQuestion).vm.$emit('update:questionPart', {
            type: 'input',
        })
        wrapper.find(CreateInputQuestion).vm.$emit('update:rightAnswer', [ 'rightAnswer' ])

        await flushPromises()
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
        select('save-btn', wrapper).trigger('click')
        expect(store.dispatch).toHaveBeenCalledWith(
            'questions/createQuestion',
            {
                lessonId: "lesson1",
                question: {
                    body: "question body",
                    renderedLocally: false,
                    timed: false,
                    type: "input"
                },
                rightAnswer: [ 'rightAnswer' ]
            }
        )
    })

    it('can create completion question', async () => {
        const lesson_id = 'lesson1'
        const template = 'This  is a --blank-- question'
        wrapper = createWrapper(lesson_id)
        chooseType('Completion')
        addBody('question body')
        await flushPromises()
        expect(wrapper.vm.$v.$invalid).toBeTruthy()

        wrapper.find(CreateCompletionQuestion).vm.$emit('update:questionPart', {
            type: 'completion',
            template,
        })
        wrapper.find(CreateCompletionQuestion).vm.$emit('update:rightAnswer', ['completion'])

        await flushPromises()
        expect(wrapper.vm.$v.$invalid).toBeFalsy()
        select('save-btn', wrapper).trigger('click')
        expect(store.dispatch).toHaveBeenCalledWith(
            'questions/createQuestion',
            {
                lessonId: "lesson1",
                question: {
                    body: "question body",
                    template,
                    renderedLocally: false,
                    timed: false,
                    type: "completion"
                },
                rightAnswer: ['completion']
            }
        )
    })

    function chooseType(type) {
        select('select-question-type', wrapper).setValue(type)
    }

    function addBody(text) {
        select('question-body', wrapper).setValue(text || 'new body')
    }

    function createWrapper(lesson_id) {
        return mount(CreateQuestion, {
            localVue,
            vuetify,
            store,
            propsData: {lesson_id},
            stubs: [
                'CreateInputQuestion',
                'CreateSelectionQuestion',
                'CreateCompletionQuestion'
            ]

        })
    }
})
