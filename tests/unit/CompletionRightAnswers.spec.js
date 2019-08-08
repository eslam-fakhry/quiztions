import Vuetify from 'vuetify'
import {mount, createLocalVue} from '@vue/test-utils'
import flushPromises from 'flush-promises'

import CompletionRightAnswers from "@/components/create-question/CompletionRightAnswers.vue"
import helpers from '../helpers'

const {selectAll} = helpers;

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('CompletionRightAnswers.vue', () => {
    let vuetify
    let wrapper

    beforeEach(() => {
        vuetify = new Vuetify()

    })
    afterEach(()=>{
        wrapper.destroy()
    })

    it('renders a simple template', () => {
        const template = '--blank-- is a good --blank--'
        const value = []

        wrapper = createWrapper(template, value)

        expect(selectAll('blank', wrapper).length).toBe(2)
        expect(selectAll('text-part', wrapper).length).toBe(1)

        // expect(wrapper.contains('.v-text-field input')).toBeTruthy()
        // expect(wrapper.html()).toContain('is good')
    })

    it('shows a text field per blank', () => {
        const template = '--blank-- is a good --blank--'
        const value = []

        wrapper = createWrapper(template, value)

        expect(selectAll('blank-text-field', wrapper).length).toBe(2)
    })

    it('focuses the corresponding text field when a blank chip clicked', async () => {
        const template = '--blank-- is a good --blank--'
        const value = []

        wrapper = createWrapper(template, value)
        const blanks = selectAll('blank', wrapper)
        const textFields = selectAll('blank-text-field', wrapper)


        expect(textFields.at(0).element).toBe(document.activeElement)
        blanks.at(1).vm.$emit('click')
        await flushPromises()
        expect(textFields.at(1).element).toBe(document.activeElement)
    })

    it('emits the array of strings when updated', async () => {
        const template = '--blank-- is a good --blank--'
        const value = []

        wrapper = createWrapper(template, value)
        selectAll('blank-text-field', wrapper).at(0).setValue( 'modified item')

        expect(wrapper.emitted().input[0][0][0]).toBe('modified item')
    })

    it('increases the length of value array to fit the blanks number', async () => {
        const template = '--blank-- is a good --blank--'
        const value = []

        wrapper = createWrapper(template, value)
        expect(wrapper.emitted().input[0][0].length).toBe(2)
    })
    it('decreases the length of value array to fit the blanks number', async () => {
        const template = '--blank-- is a good --blank--'
        const value = ['item1','item2','item3']

        wrapper = createWrapper(template, value)
        expect(wrapper.emitted().input[0][0].length).toBe(2)
    })



    function createWrapper(template, value) {
        return mount(CompletionRightAnswers, {
            localVue,
            vuetify,
            attachToDocument: true,
            propsData: {template, value},
        })
    }

})
