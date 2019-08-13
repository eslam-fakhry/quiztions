
import {createNamespacedHelpers } from 'vuex'
const { mapMutations:mapLessonMutations} = createNamespacedHelpers('layouts')

const defaultLayout = 'Dashboard'

export default {

    data() {
        return {
            layout: defaultLayout,
        }
    },

    methods: {
        ...mapLessonMutations(['SET_LAYOUT']),
    },

    created(){
        this['SET_LAYOUT'](this.layout)
    },

    // destroyed(){
    //     console.log('destroyed in mixin');
    //     this['SET_LAYOUT'](defaultLayout)
    // },

    // beforeRouteLeave (to, from, next) {
    //         this['SET_LAYOUT'](defaultLayout)
    // },
}
