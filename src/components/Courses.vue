<template>
    <v-container>
        <h1 class="text-center">Courses</h1>
        <v-layout wrap>

            <v-flex xs12 sm6 md4 lg3 v-for="course in courses" :key="`course--${course.id}`">
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
                        <v-btn text color="orange" :to="{name:'course',params:{course_id:course.id}}">Enter</v-btn>
                    </v-card-actions>
                </v-card>
                <!--<router-link  :to="{name:'course',params:{course_id:course.id}}"-->
                <!--class=""-->
                <!--&gt;-->
                <!--<v-card height="150">{{course.name}}</v-card>-->
                <!--</router-link>-->

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Courses",
        computed: {
            // todo add loading state
            ...mapGetters(['courses']),
        }
    }
</script>
