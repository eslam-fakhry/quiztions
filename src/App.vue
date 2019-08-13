<template>
    <v-app>
        <Snackbar/>

        <component :is="layout"></component>
    </v-app>
</template>

<script>

    import {mapState} from 'vuex'

    import FullScreen from './layouts/FullScreen'
    import Dashboard from './layouts/Dashboard'
import Snackbar from '@/components/Snackbar'
    export default {
        name: 'App',
        components: {
            FullScreen,
            Dashboard,
            Snackbar,

        },
        data() {
            return {
                //
            }
        },

        computed: mapState('layouts', ["layout"]),

        // errorCaptured(err, v_el, info) {
        //     console.log('err', err);
        //     console.log('v_el', v_el);
        //     console.log('info', info);
        // },


    }
</script>
