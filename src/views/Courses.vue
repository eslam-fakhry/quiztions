<template>
    <div class="page">
        <div class="fill-height pa-2">
            <v-subheader>My Courses</v-subheader>
            <Loading
                    v-if="loading"
            />
            <SlideUpTransition
                    v-else
                    appear
                    class="d-flex mt-3 flex-wrap"
            >
                <v-flex xs12 sm6 md4
                        v-for="(course, id,index) in courses"
                        :key="`course--${id}`"
                        :data-index="index"
                >
                    <v-card
                            class="mx-4 my-2 py-6 px-4"
                            :to="{name:'course',params:{course_id:id}}"
                    >
                        <v-layout
                                items-center
                        >
                            <v-flex
                                    class="shrink"
                            >
                                <v-avatar
                                        size="55"
                                        class="primary lighten-3"
                                >
                                    <v-icon large>school</v-icon>
                                </v-avatar>
                            </v-flex>
                            <v-flex class="d-flex">
                                <span
                                        class="ml-5 headline text-center my-auto"
                                        v-text="course.name"
                                />
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>

            </SlideUpTransition>
        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    import SlideUpTransition from '@/components/transitions/SlideUpTransition'
    import CoursesMixin from '@/components/mixins/Courses'

    const {mapState} = createNamespacedHelpers('user')

    export default {
        name: "Courses",

        components: {
            Loading,
            SlideUpTransition,
        },

        mixins: [CoursesMixin],

        data: () => ({
            loading: true
        }),

        computed: {
            ...mapState(['courses']),
        },

    }
</script>

