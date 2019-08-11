<template>
    <v-container>
        <h1 class="text-center">Courses</h1>
        <LogoutBtn>
            <v-btn>logout</v-btn>
        </LogoutBtn>
        <v-btn @click="showToast">show_toast</v-btn>
        <v-btn @click="$store.dispatch('addCoursesToUser')">addCoursesToUser</v-btn>
        <v-btn @click="fetchUserCourses">fetchUserCourses</v-btn>

        <v-layout wrap>

            <v-flex xs12 sm6 md4 lg3 v-for="(course, id) in courses" :key="`course--${id}`">
                <v-card
                        :elevation="0"
                        outlined
                        flat
                        class="mx-4 my-4"
                >
                    <v-img
                            class="white--text"
                            height="200px"
                            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    >
                        <v-container fill-height fluid>
                            <v-layout fill-height>
                                <v-flex xs12 align-end flexbox>
                                    <span class="headline">{{course.name}}</span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-img>
                    <v-card-title>
                        <div>
                            <span class="grey--text">10 lessons</span><br>
                            <span>How to easily understand such a great topic</span><br>
                            <span class="font-italic font-weight-bold">Dr. John harper</span>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn text color="orange" :to="{name:'course',params:{course_id:id}}">Enter</v-btn>
                    </v-card-actions>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {createNamespacedHelpers } from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('user')

    import LogoutBtn from './auth/LogoutBtn'

    export default {
        name: "Courses",
        components: {LogoutBtn},
        computed: {
            // todo add loading state
            ...mapState(['courses']),
        },
        methods:{
            ...mapActions(['fetchUserCourses']),
            showToast(){
                this.$store.commit('snackbars/SET_TOAST', {message: "you're successfully logged in",})
            },
        },

        created(){

        },
    }
</script>
