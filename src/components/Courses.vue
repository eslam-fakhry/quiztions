<template>
    <v-container>
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
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('user')

    export default {
        name: "Courses",

        computed: {
            // todo add loading state
            ...mapState(['courses']),
        },

        created() {
            this.fetchUserCourses()
        },

        methods: {
            ...mapActions(['fetchUserCourses']),

        },
    }
</script>
