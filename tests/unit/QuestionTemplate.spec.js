// import Vue from 'vue'
import Vuetify from 'vuetify'

import {mount, createLocalVue} from '@vue/test-utils'

import QuestionTemplate from "@/components/QuestionTemplate.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)

describe('QuestionTemplate.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify({
            icons: {
                iconfont: 'mdi',
            },
        })
    })

    it('renders a simple template', () => {
        const template = '--blank-- is good'
        const value=['']
        const uiState={
            NOT_ANSWERED: true,
        };

        const wrapper = mount(QuestionTemplate, {
            localVue,
            vuetify,
            propsData: {value,template,uiState,},
        })
        expect(wrapper.contains('.v-text-field input')).toBeTruthy()
        expect(wrapper.html()).toContain('is good')
    })


})
