// import Vue from 'vue'
import Vuetify from 'vuetify'

import {mount, createLocalVue} from '@vue/test-utils'

import helpers from '../helpers'
import CreateList from "@/components/CreateList.vue"


const localVue = createLocalVue()
localVue.use(Vuetify)

describe('CreateList.vue', () => {
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })


    it('renders items', () => {
        const value = ["item1","item2","item3","item4"];
        const min = 3
        const max = 5

        const wrapper = createWrapper(value,min,max)
        expect(helpers.selectAll('item',wrapper).length).toBe(4)
    })

    it('fills items up to provided minimum length', () => {
        const value = [];
        const min = 3
        const max = 5

        const wrapper = createWrapper(value,min,max)
        expect(helpers.selectAll('item',wrapper).length).toBe(3)
    })

    it('adds new item when pressing add', () => {
        const value = ["item1","item2","item3"];
        const min = 3
        const max = 5

        const wrapper = createWrapper(value,min,max)
        helpers.select('add-item',wrapper).trigger('click')

        expect(wrapper.emitted().input[0][0].length).toBe(4)
    })

    it('can not add new item if items is maxed', () => {
        const value = ["item1","item2","item3","item4","item5"];
        const min = 3
        const max = 5

        const wrapper = createWrapper(value,min,max)
        helpers.select('add-item',wrapper).trigger('click')

        expect(wrapper.emitted().input).toBeFalsy()
    })

    it('emits the items when modified ', () => {
        const value = ["item1","item2","item3"];
        const min = 3
        const max = 5

        const wrapper = createWrapper(value,min,max)

        helpers.select('item',wrapper).find({name:'v-text-field'}).vm.$emit('change','modified item')

        expect(wrapper.emitted().input[0][0][0]).toBe('modified item')
    })



    function createWrapper(value,min,max) {
        return mount(CreateList, {
            localVue,
            vuetify,
            propsData: {value, min,max},
        })
    }
})
