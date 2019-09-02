import Vuetify from 'vuetify'
import {mount, createLocalVue} from '@vue/test-utils'
import InputAnswer from "@/components/InputAnswer.vue"
import Vuex from "vuex";

const localVue = createLocalVue()
localVue.use(Vuetify)
localVue.use(Vuex)

describe('InputAnswer.vue', () => {
    let vuetify
    let store
    let actions

    beforeEach(() => {
        actions = {
            fetchRightAnswer: jest.fn(),
        }
        store = new Vuex.Store({
            modules: {
                answers: {
                    namespaced: true,
                    actions
                }
            }
        })
        vuetify = new Vuetify()
    })

    it('renders v-textarea', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};

        const wrapper = createWrapper(value, uiState)
        expect(wrapper.find({name: 'v-textarea'}).exists()).toBeTruthy()
    })

    it('emits answered', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};

        const wrapper = createWrapper(value, uiState)

        wrapper.find({name: 'v-textarea'}).vm.$emit('input', 'answer')
        expect(wrapper.emitted().answered).toBeTruthy()
    })

    it('can validate answer', () => {
        const value = []
        const uiState = {NOT_ANSWERED: true,};

        actions.fetchRightAnswer.mockReturnValueOnce(Promise.resolve(['answer']))

        const wrapper = createWrapper(value, uiState)

        wrapper.find({name: 'v-textarea'}).vm.$emit('input', 'answer')

        expect(wrapper.vm.validateAnswer('question1')).toBeTruthy()
        expect(actions.fetchRightAnswer).toHaveBeenCalled()
    })

    function createWrapper(value, uiState) {
        return mount(InputAnswer, {
            localVue,
            vuetify,
            store,
            propsData: {value, uiState},
        })
    }
})

