<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="page">
        <Loading v-if="loading"/>
        <SlideUpTransition
                v-else
                appear
                class="d-flex mt-3 flex-wrap"
        >
            <v-flex
                    xs12 sm6 md4
                    v-for="(course, id, index) in courses"
                    :key="`course--${id}`"
                    :data-index="index"
            >
                <v-card
                        class="mx-4 my-4 pt-6 pb-10 px-4"
                >
                    <span
                            class="headline"
                            v-text="course.name"
                    />
                    <v-card-actions>
                        <ConfirmModal v-if="isEnrolled(id)" @confirmed="leave(id)">
                            <template v-slot:activator="{on}">
                                <v-btn
                                        small
                                        v-on="on"
                                >
                                    Leave
                                </v-btn>
                            </template>
                            <template v-slot:title>
                                Confirm Leaving
                            </template>
                            <template v-slot:action-text>
                                Leave
                            </template>
                            Are you sure you want to leave this course?<br>
                            You will lose your progress!
                        </ConfirmModal>
                        <v-btn v-else @click="enroll(id,course.name)">Enroll</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </SlideUpTransition>
    </div>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    import ConfirmModal from "@/components/ConfirmModal";
    import SlideUpTransition from "@/components/transitions/SlideUpTransition";

    const {mapActions: mapUserActions, mapGetters: mapUserGetters} = createNamespacedHelpers('user')
    const {mapActions: mapCoursesActions, mapState} = createNamespacedHelpers('courses')

    export default {
        name: "Enrollment",

        components: {
            Loading,
            ConfirmModal,
            SlideUpTransition,
        },

        data: () => ({
            loading: false
        }),

        computed: {
            ...mapState(['courses']),
            ...mapUserGetters(['isEnrolled'])
        },

        async created() {
            this.loading = true
            await this.fetchCourses()
            await this.fetchUserCourses()
            this.loading = false
        },

        methods: {
            ...mapUserActions(['enrollInCourse', 'leaveCourse', 'fetchUserCourses']),
            ...mapCoursesActions(['fetchCourses']),
            enroll(id, name) {
                this.enrollInCourse({id, name})
            },
            leave(id) {
                this.leaveCourse({id})
            },
        },
    }
</script>

