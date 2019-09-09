<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="page">
        <Loading v-if="loading"/>
        <div v-else class="fill-height ma-3">
            <v-data-table
                    :headers="headers"
                    :items="lessons"
                    class="elevation-1"
                    @click:row="onRowClick"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>{{course.name}}</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        />
                        <v-spacer/>
                       <NewLesson :course_id="course_id"/>
                    </v-toolbar>
                </template>
                <template v-slot:item.action="{ item }">
                    <div @click.stop class="d-flex items-center">
                        <v-btn
                                :to="{name: 'edit-lesson', params: {lesson_id: item.id}}"
                                class="mr-2"
                                icon
                        >
                            <v-icon small>
                                edit
                            </v-icon>
                        </v-btn>
                        <ConfirmModal @confirmed="removeLesson(item)">
                            <template v-slot:activator="{on}">
                                <v-btn
                                        v-on="on"
                                        icon
                                >
                                    <v-icon small>
                                        delete
                                    </v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:title>
                                Confirm Deletion
                            </template>
                            Are you sure you want to delete this lesson?<br>
                            All it's questions will be deleted!
                        </ConfirmModal>
                    </div>
                </template>
                <template v-slot:no-data>
                    This course has no lessons yet.
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    import ConfirmModal from "@/components/ConfirmModal";
    import NewLesson from "@/components/NewLesson";

    const {mapActions} = createNamespacedHelpers('courses')
    const {mapActions: mapLessonsActions} = createNamespacedHelpers('lessons')

    export default {
        name: "EditCourse",

        props: {
            course_id: {type: String, required: true}
        },

        components: {
            NewLesson,
            ConfirmModal,
            Loading,
        },

        data() {
            return {
                loading: false,
                headers: [
                    {text: 'Name', align: 'left', sortable: false, value: 'name',},
                    {text: 'Actions', align: 'end', sortable: false, value: 'action', width: 100},
                ],
            }
        },

        computed: {
            course() {
                return this.$store.state.courses.courses[this.course_id]
            },
            lessons() {
                const lessons = this.course.lessons
                if (lessons) {
                    return Object.keys(lessons).map(key => {
                        return {...lessons[key], id: key,}
                    })
                } else {
                    return []
                }
            }
        },

        methods: {
            ...mapActions(['fetchCourse']),
            ...mapLessonsActions(['createLesson', 'deleteLesson']),
            // eslint-disable-next-line
            onRowClick(ev) {
                // TODO: goto lesson stats
                // console.log(ev)
            },
            async removeLesson(lesson) {
                await this.deleteLesson({lessonId: lesson.id})
            },
        },

        watch: {
            course_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true
                    await this.fetchCourse({id})
                    if (this.course) this.loading = false
                }
            },
        },
    }
</script>
