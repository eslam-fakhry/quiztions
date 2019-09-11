import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import flushPromises from 'flush-promises'
import helpers from '../helpers'
import CreateCompletionQuestion from "@/components/create-question/CreateCompletionQuestion.vue"

const {select} = helpers;

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuelidate)

describe('CreateCompletionQuestion.vue', () => {
    let vuetify
    let wrapper


    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders', () => {

        wrapper = createWrapper()

        expect(wrapper.isVueInstance()).toBeTruthy()
        wrapper.destroy()


    })

    it('shows "CreateCompleteTemplate" component for question template and a "CompletionRightAnswers" for the right answer', () => {

        wrapper = createWrapper()

        expect(select('right-answer',wrapper).exists()).toBeTruthy()
        expect(wrapper.find({ name:'CreateCompletionTemplate' }).exists()).toBeTruthy()

    })



        it('emits the question part and the right answer',async () => {
            const template = 'Full --blank-- web developer'
            wrapper = createWrapper()

            wrapper.find({ name:'CreateCompletionTemplate' }).vm.$emit('input',template)
            await flushPromises()
            wrapper.find({name:'CompletionRightAnswers'}).vm.$emit('input',[ 'stack' ])
            await flushPromises()
            expect(wrapper.emitted()[ 'update:rightAnswer' ][1][0]).toEqual([ 'stack' ])
            expect(wrapper.emitted()['update:questionPart'][1][0]).toEqual({
                type:'completion',
                template,
            })

        })

        it('emits validation state', async() => {
            const template = 'Full --blank-- web developer'
            wrapper = createWrapper()
            expect(wrapper.emitted()[ 'update:valid' ][0][0]).toBeFalsy()
            wrapper.find({ name:'CreateCompletionTemplate' }).vm.$emit('input',template)
            wrapper.find({name:'CompletionRightAnswers'}).vm.$emit('input',[ 'stack' ])
            await flushPromises()
            expect(wrapper.emitted()[ 'update:valid' ][2][0]).toBeTruthy()

        })

    it('emits invalid if template not having blank', async() => {
        const template = 'Full full web developer'
        wrapper = createWrapper()
        expect(wrapper.emitted()[ 'update:valid' ][0][0]).toBeFalsy()
        wrapper.find({ name:'CreateCompletionTemplate' }).vm.$emit('input',template)
        await flushPromises()
        expect(wrapper.emitted()[ 'update:valid' ][1][0]).toBeFalsy()
        wrapper.find({name:'CompletionRightAnswers'}).vm.$emit('input',[ 'stack' ])
        await flushPromises()
        expect(wrapper.emitted()[ 'update:valid' ][2][0]).toBeFalsy()

    })
    it('emits invalid if length of answers array and number of blanks not matching', async() => {
        const template = 'Full --blank-- web developer'
        wrapper = createWrapper()
        expect(wrapper.emitted()[ 'update:valid' ][0][0]).toBeFalsy()
        wrapper.find({ name:'CreateCompletionTemplate' }).vm.$emit('input',template)
        wrapper.find({name:'CompletionRightAnswers'}).vm.$emit('input',[ 'stack','black' ])
        await flushPromises()
        expect(wrapper.emitted()[ 'update:valid' ][2][0]).toBeFalsy()

    })
    function createWrapper() {
        return mount(CreateCompletionQuestion, {
            localVue,
            vuetify,
            stubs:['CreateCompletionTemplate','CompletionRightAnswers']
        })
    }
})
