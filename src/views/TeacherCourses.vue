<!--suppress ALL -->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="page">
        <Loading v-if="loading"></Loading>
        <v-container v-else class="fill-height">
            <h1 class="text-center">Teacher Courses</h1>

            <v-data-table
                    :headers="headers"
                    :items="courses"
                    sort-by="calories"
                    class="elevation-1"
                    @click:row="onRowClick"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>My courses</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="primary" dark class="mb-2" v-on="on">New Course</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">New Course</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container grid-list-md>
                                        <v-layout wrap>
                                            <v-flex xs12 sm6 md4>
                                                <v-text-field v-model="editedItem.name"
                                                              label="Course name"></v-text-field>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-card-text>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
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
                                icon
                                class="mr-2"
                                :to="{name: 'edit-course', params: {course_id: item.id}}"
                        >
                            <v-icon small>
                                edit
                            </v-icon>
                        </v-btn>

                        <ConfirmModal @confirmed="removeCourse(item)">
                            <template v-slot:activator="{on}">
                                <v-btn
                                        icon
                                        class="mr-2"
                                        v-on="on"
                                >
                                    <v-icon small>
                                        delete
                                    </v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:title>
                                Confirm Deletion
                            </template>
                            Are you sure you want to delete this course?<br>
                            All it's lessons and questions will be deleted!
                        </ConfirmModal>
                    </div>
                </template>
                <template v-slot:no-data>
                    You have no course yet. why not making a new one
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    import CoursesMixin from '@/components/mixins/Courses'
    import ConfirmModal from "@/components/ConfirmModal";

    const {mapState} = createNamespacedHelpers('user')
    const {mapActions: mapCoursesActions} = createNamespacedHelpers('courses')

    export default {
        name: "TeacherCourses",

        components: {
            ConfirmModal,
            Loading,
        },

        mixins: [CoursesMixin],

        data: () => ({
            loading: true,
            dialog: false,
            headers: [
                {
                    text: 'Name)',
                    align: 'left',
                    sortable: false,
                    value: 'name',
                },
                {text: 'Actions', value: 'action', sortable: false},
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            ...mapState({
                courses: state => {
                    return Object.keys(state.courses).map((key) => {
                        // console.log(index,key);

                        return {
                            id: key,
                            ...state.courses[key]
                        }
                    })
                }
            }),
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },


        methods: {
            ...mapCoursesActions(['createCourse','deleteCourse']),
            onRowClick(ev) {
                console.log(ev);
            },
            initialize() {
            },
            editItem(item) {
                this.$router.push({name: 'edit-course', params: {course_id: item.id}})
                // this.editedIndex = this.courses.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialog = true
            },
            async removeCourse(course) {
                await this.deleteCourse({courseId: course.id})
            },
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                if (this.editedIndex > -1) {
                    console.log('editing a course');
                    // Object.assign(this.courses[this.editedIndex], this.editedItem)
                } else {
                    console.log('creating  a new course');
                    // this.courses.push(this.editedItem)
                    this.createCourse({name: this.editedItem.name}).then((id) => {
                        this.$router.push({name: 'edit-course', params: {course_id: id}})
                    })
                }
                this.close()
            },
        },
    }
</script>
