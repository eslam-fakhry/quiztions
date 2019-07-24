<template>
    <v-app>

        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        components: {},
        data() {
            return {
                //
            }
        },

        errorCaptured(err,v_el,info){
            console.log('err',err);
            console.log('v_el',v_el);
            console.log('info',info);

        },

    }
</script>
