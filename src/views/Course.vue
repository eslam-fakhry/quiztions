<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="page">
        <v-subheader>Lesson</v-subheader>
        <Loading
                v-if="loading"
        />
        <SlideUpTransition
                v-else
                appear
                class="d-flex flex-wrap"
        >
            <v-flex
                    xs12 sm6 md4
                    v-for="(lesson, id, index) in course.lessons"
                    :key="id"
                    :data-index="index"
            >
                <v-card
                        class="mx-4 my-2 py-6 px-4"
                        :to="{name:'lesson',params:{lesson_id:id}}"
                >
                    <v-layout
                            items-center
                    >
                        <v-flex
                                class="shrink"
                        >
                            <v-avatar
                                    size="55"
                                    class="orange
                                     lighten-3"
                            >
                                <v-icon large>school</v-icon>
                            </v-avatar>
                        </v-flex>
                        <v-flex class="d-flex">
                            <span
                                    class="ml-5 headline text-center my-auto"
                                    v-text="lesson.name"
                            />
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </SlideUpTransition>
    </v-container>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    import SlideUpTransition from '@/components/transitions/SlideUpTransition'

    const {mapActions} = createNamespacedHelpers('courses')

    // todo test fetchCourse
    export default {
        name: "Course",

        components: {
            Loading,
            SlideUpTransition,
        },

        props: {
            course_id: {
                required: true
            }
        },

        data() {
            return {
                loading: false,
            }
        },

        computed: {
            course() {
                return this.$store.state.courses.courses[this.course_id]
            }
        },

        watch: {
            course_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true
                    await this.fetchCourse({id})
                    if (this.course) this.loading = false
                }
            }
        },

        methods: mapActions(['fetchCourse']),
    }
</script>

