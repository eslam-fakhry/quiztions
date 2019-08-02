// import Vue from 'vue'
import Vuetify from 'vuetify'

import {mount, createLocalVue} from '@vue/test-utils'

import SingleSelectionOption from "@/components/SingleSelectionOption.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)

describe('SingleSelectionOption.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify({
            icons: {
                iconfont: 'mdi',
            },
        })
    })

    it('renders option when passed', () => {
        const option = 'new option'
        const uiState = {NOT_ANSWERED: true,};
        const selected = false

        const wrapper = createWrapper(option, uiState, selected)

        expect(wrapper.find('.option').html()).toMatch(option)
    })

    it('renders as neutral when not selected ', () => {
        const option = 'new option'
        const uiState = {NOT_ANSWERED: true, ANSWER_NOT_CHECKED: true,};
        const selected = false

        const wrapper = createWrapper(option, uiState, selected)

        expect(wrapper.find('.option').classes()).not.toContain('blue')
        expect(wrapper.find('.option').classes()).not.toContain('green')
        expect(wrapper.find('.option').classes()).not.toContain('red')
    })

    it('renders as marked when selected and not checked', () => {
        const option = 'new option'
        const uiState = {ANSWER_NOT_CHECKED: true,};
        const selected = true

        const wrapper = createWrapper(option, uiState, selected)
        expect(wrapper.find('.option').classes()).toContain('blue')
    })

    it('renders as correct when selected and answer is correct', () => {
        const option = 'new option'
        const uiState = {ANSWER_CHECKED: true, ANSWERED_CORRECTLY: true,};
        const selected = true

        const wrapper = createWrapper(option, uiState, selected)
        expect(wrapper.find('.option').classes()).toContain('green')
    })

    it('renders as wrong when selected and answer is wrong', () => {
        const option = 'new option'
        const uiState = {ANSWER_CHECKED: true, ANSWERED_WRONG: true,};
        const selected = true

        const wrapper = createWrapper(option, uiState, selected)

        expect(wrapper.find('.option').classes()).toContain('red')
    })

    function createWrapper(option, uiState, selected) {
        return mount(SingleSelectionOption, {
            localVue,
            vuetify,
            propsData: {option, uiState, selected},
        })
    }
})
