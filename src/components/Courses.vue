<template>
    <div>
        <Loading v-if="loading"></Loading>
        <v-container v-else>
            <h1 class="text-center">Courses</h1>
            <v-btn @click="$store.dispatch('addCoursesToUser')">addCoursesToUser</v-btn>

            <v-layout wrap>

                <v-flex xs12 sm6 md4 v-for="(course, id) in courses" :key="`course--${id}`">
                    <v-card
                            :elevation="0"
                            outlined
                            flat
                            class="mx-4 my-4 pt-6 pb-10 px-4"
                            :to="{name:'course',params:{course_id:id}}"
                    >
                        <span class="headline">{{course.name}}</span>
                    </v-card>

                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from './Loading'

    const {mapState, mapActions} = createNamespacedHelpers('user')

    export default {
        name: "Courses",

        components: {
            Loading,
        },
        data() {
            return {
                loading: true
            }
        },

        computed: {
            ...mapState(['courses']),
        },

        async created() {
            this.loading = true
            await this.fetchUserCourses()
            this.loading = false
        },

        methods: {
            ...mapActions(['fetchUserCourses']),

        },
    }
</script>
