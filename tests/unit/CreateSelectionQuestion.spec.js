import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import flushPromises from 'flush-promises'
import helpers from '../helpers'
import CreateSelectionQuestion from "@/components/create-question/CreateSelectionQuestion.vue"

const {select} = helpers;

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuelidate)

describe('CreateSelectionQuestion.vue', () => {
    let vuetify
    let wrapper


    beforeEach(() => {
        vuetify = new Vuetify()
    })
    afterEach(()=>{
        wrapper.vm.$destroy()
    })

    it('renders', () => {

        wrapper = createWrapper()

        expect(wrapper.isVueInstance()).toBeTruthy()

    })

    it('shows "CreateList" for options and a "v-select" for the right answer', () => {
        wrapper = createWrapper()

        expect(select('right-answer',wrapper).exists()).toBeTruthy()
        expect(wrapper.find({ name:'CreateList' }).exists()).toBeTruthy()

    })


    it('emits the question part and the right answer',async () => {
        wrapper = createWrapper()

        wrapper.find({ name:'CreateList' }).vm.$emit('input',['option-one','option-two'])
        await flushPromises()
        expect(wrapper.emitted()['update:questionPart'][0][0]).toEqual({
            type:'selection',
            options:['option-one','option-two']
        })
        wrapper.find({name:'v-select'}).vm.$emit('input','option-one')
        await flushPromises()
        expect(wrapper.emitted()[ 'update:rightAnswer' ][1][0]).toEqual( 'option-one' )

    })
    it('emits validation state', async() => {
        wrapper = createWrapper()
        expect(wrapper.emitted()[ 'update:valid' ][0][0]).toBeFalsy()
        wrapper.find({ name:'CreateList' }).vm.$emit('input',['option-one','option-two'])
        wrapper.find({name:'v-select'}).vm.$emit('input','option-one')
        await flushPromises()
        expect(wrapper.emitted()[ 'update:valid' ][2][0]).toBeTruthy()

    })
    it('emits invalid if right answer is not in options', async() => {
        wrapper = createWrapper()
        expect(wrapper.emitted()[ 'update:valid' ][0][0]).toBeFalsy()
        wrapper.find({ name:'CreateList' }).vm.$emit('input',['option-one','option-two'])
        wrapper.find({name:'v-select'}).vm.$emit('input','option-three')
        await flushPromises()
        expect(wrapper.emitted()[ 'update:valid' ][2][0]).toBeFalsy()

    })
    function createWrapper() {
        return mount(CreateSelectionQuestion, {
            localVue,
            vuetify,
            sync:true,
            stubs:['CreateList']
        })
    }
})

