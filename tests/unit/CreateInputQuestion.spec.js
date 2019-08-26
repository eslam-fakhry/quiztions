import {mount, createLocalVue} from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
// import flushPromises from 'flush-promises'

import helpers from '../helpers'
import CreateInputQuestion from "@/components/create-question/CreateInputQuestion.vue"

const {select} = helpers;

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)
localVue.use(Vuelidate)
describe('CreateInputQuestion.vue', () => {
    let vuetify
    let wrapper

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('renders', () => {
        wrapper = createWrapper()
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('shows a text input for the right answer', () => {

        wrapper = createWrapper()

        expect(wrapper.isVueInstance()).toBeTruthy()
        expect(select('right-answer',wrapper).exists()).toBeTruthy()

    })
    it('emits the question part and the right answer', () => {

        wrapper = createWrapper()
        wrapper.find({name:'v-text-field'}).vm.$emit('input','green')
        expect(wrapper.emitted()[ 'update:rightAnswer' ][0][0]).toEqual([ 'green' ])
        expect(wrapper.emitted()['update:questionPart'][0][0]).toEqual({type:'input'})

    })
    it('emits validation state', async() => {
        wrapper = createWrapper()
        expect(wrapper.emitted()[ 'update:valid' ][0][0]).toBeFalsy()
        wrapper.find({name:'v-text-field'}).vm.$emit('input','green')
        wrapper.find({name:'v-text-field'}).find('input[type="text"]').setValue('green')
        expect(wrapper.emitted()[ 'update:valid' ][1][0]).toBeTruthy()

    })
    function createWrapper() {
        return mount(CreateInputQuestion, {
            localVue,
            vuetify,
        })
    }
})
