// import Vue from 'vue'
import Vuetify from 'vuetify'

import {mount, createLocalVue} from '@vue/test-utils'

import helpers from '../helpers'
import QuestionFeedback from "@/components/QuestionFeedback.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)

describe('QuestionFeedback.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })


    it('renders props.feedback when passed', () => {
        const feedback = 'you are right'
        const uiState = {ANSWER_CHECKED: true, ANSWERED_CORRECTLY: true,};

        const wrapper = createWrapper(feedback, uiState)

        expect(helpers.select('feedback-text',wrapper).html()).toMatch(feedback)
    })

    it('does not render when question not answered', () => {
        const feedback = 'new feedback'
        const uiState = {NOT_ANSWERED: true,};

        const wrapper = createWrapper(feedback, uiState)

        expect(helpers.select('feedback-text',wrapper).exists()).toBeFalsy()

    })

    function createWrapper(feedback, uiState) {
        return mount(QuestionFeedback, {
            localVue,
            vuetify,
            propsData: {feedback, uiState},
        })
    }
})
