<template>
    <div class="page">
        <Loading v-if="loading"></Loading>
        <v-layout v-else wrap>
            <v-flex xs12 sm6 md4 v-for="(course, id) in courses" :key="`course--${id}`">
                <v-card
                        :elevation="0"
                        outlined
                        flat
                        class="mx-4 my-4 pt-6 pb-10 px-4"
                >
                    <span class="headline">{{course.name}}</span>
                    <v-card-actions>
                        <v-btn v-if="isEnrolled(id)" @click="leave(id)">Leave</v-btn>
                        <v-btn v-else @click="enroll(id,course.name)">Enroll</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    const {mapActions: mapUserActions, mapGetters:mapUserGetters} = createNamespacedHelpers('user')
    const {mapActions: mapCoursesActions, mapState} = createNamespacedHelpers('courses')

    export default {
        name: "Enrollment",

        components:{Loading},

        data() {
            return {
                loading: false
            }
        },

        methods: {
            ...mapUserActions(['enrollInCourse','leaveCourse','fetchUserCourses']),
            ...mapCoursesActions(['fetchCourses']),
            enroll(id,name) {
                this.enrollInCourse({id,name})
            },
            leave(id) {
                confirm('Are you sure you want to leave this course?') && this.leaveCourse({id})
            },
        },

        computed: {
            ...mapState({
                courses:state=>state.courses,
            }),
            ...mapUserGetters(['isEnrolled'])
        },

        async created() {
            this.loading = true
            await this.fetchCourses()
            await this.fetchUserCourses()
            this.loading = false
        },
    }
    // TODO: check the existence of the course before enrollment
</script>
