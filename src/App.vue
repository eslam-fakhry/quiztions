<template>
    <v-app>
        <Snackbar/>
        <router-view name="toolbar"></router-view>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import Snackbar from '@/components/Snackbar'
    export default {
        name: 'App',
        components: {
            Snackbar,
        },
    }
</script>
