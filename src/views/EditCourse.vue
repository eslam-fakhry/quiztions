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
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">New Lesson</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">New Lesson</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md4>
                                                <v-text-field
                                                        v-model="editedItem.name"
                                                        label="Lesson name"
                                                />
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <v-text-field
                                                        v-model="editedItem.tolerance"
                                                        label="Tolerance"
                                                />
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <v-switch
                                                        v-model="editedItem.canNavigate"
                                                        :label="`can ${editedItem.canNavigate?'':'not'} navigate`"
                                                />
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
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
    import {showSnackbar} from "@/utils";

    const {mapActions} = createNamespacedHelpers('courses')
    const {mapActions: mapLessonsActions} = createNamespacedHelpers('lessons')

    export default {
        name: "EditCourse",

        props: {
            course_id: {type: String, required: true}
        },

        components: {
            ConfirmModal,
            Loading,
        },

        data() {
            return {
                loading: false,
                dialog: false,
                headers: [
                    {text: 'Name', align: 'left', sortable: false, value: 'name',},
                    {text: 'Actions', align: 'end', sortable: false, value: 'action', width: 100},
                ],
                editedItem: {name: '', canNavigate: true, tolerance:3},
                defaultItem: {name: '', canNavigate: true, tolerance:3},
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

            onRowClick(ev) {
                // TODO: goto lesson stats
                // console.log(ev)
            },

            async removeLesson(lesson) {
                await this.deleteLesson({lessonId: lesson.id})
            },

            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                }, 300)
            },

            save() {
                this.createLesson({
                    ...this.editedItem,
                    courseId: this.course_id
                })
                    .then(id => {
                        showSnackbar('Lesson is successfully created', 'success')
                        this.$router.push({name: 'edit-lesson', params: {lesson_id: id}})
                    })
                this.close()
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
            dialog(val) {
                val || this.close()
            },
        },

    }
</script>
