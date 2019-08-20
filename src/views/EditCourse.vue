<!--suppress ALL -->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <Loading v-if="loading"/>
        <v-container v-else class="">


            <h1 class="text-center">{{course.name}}</h1>


            <v-data-table
                    :headers="headers"
                    :items="lessons"
                    sort-by="calories"
                    class="elevation-1"
                    @click:row="onRowClick"
                    :loading="loading"
                    loading-text="Loading... Please wait"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>{{course.name}}</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        ></v-divider>
                        <v-spacer></v-spacer>
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
                                                <v-text-field v-model="editedItem.name"
                                                              label="lesson name"></v-text-field>
                                            </v-flex>
                                            <v-flex xs12 sm6 md4>
                                                <v-switch
                                                        v-model="editedItem.canNavigate"
                                                        :label="`can ${editedItem.canNavigate?'':'not'} navigate`"
                                                ></v-switch>
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
                    <div @click.stop>
                        <v-icon
                                small
                                class="mr-2"
                                @click.stop="editItem(item)"
                        >
                            edit
                        </v-icon>
                        <v-icon
                                small
                                @click.stop="deleteItem(item)"
                        >
                            delete
                        </v-icon>
                    </div>

                </template>
                <template v-slot:no-data>
                    This course has no lessons yet.
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import layoutMixin from "@/layouts/layoutMixin"
    import Loading from '@/components/Loading'

    const {mapState, mapActions} = createNamespacedHelpers('courses')
    const {mapActions: mapLessonsActions} = createNamespacedHelpers('lessons')

    export default {
        name: "EditCourse",
        props: {
            course_id: {
                required: true
            }
        },

        mixins: [layoutMixin,],

        components: {
            Loading
        },

        data() {
            return {
                course: {},
                lessons: [],
                loading: false,
                dialog: false,
                headers: [
                    {
                        text: 'Name)',
                        align: 'left',
                        sortable: false,
                        value: 'name',
                    },
                    // { text: 'Calories', value: 'calories' },
                    // { text: 'Fat (g)', value: 'fat' },
                    // { text: 'Carbs (g)', value: 'carbs' },
                    // { text: 'Protein (g)', value: 'protein' },
                    {text: 'Actions', value: 'action', sortable: false},
                ],
                // courses: [],
                editedIndex: -1,
                editedItem: {
                    name: '',
                    canNavigate: true,
                },
                defaultItem: {
                    name: '',
                    canNavigate: true,
                },
            }
        },

        methods: {
            ...mapActions(['fetchCourse']),
            ...mapLessonsActions(['createLesson']),

            onRowClick(ev) {
                console.log(ev);
            },
            initialize() {
            },

            editItem(item) {
                this.$router.push({name: 'edit-lesson', params: {lesson_id: item.id}})
                // this.editedIndex = this.courses.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialog = true
            },

            deleteItem(item) {
                const index = this.lessons.indexOf(item)
                confirm('Are you sure you want to delete this item?') && console.log('deleting ', this.lessons[index]);
                // confirm('Are you sure you want to delete this item?') && this.courses.splice(index, 1)
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
                    console.log('editing a lesson');
                    // Object.assign(this.courses[this.editedIndex], this.editedItem)
                } else {
                    console.log('creating  a new lesson');
                    // this.courses.push(this.editedItem)
                    this.createLesson({
                        name: this.editedItem.name,
                        courseId: this.course_id

                    })
                        .then((id) => {
                            this.$router.push({name: 'edit-lesson', params: {lesson_id: id}})
                        })
                }
                this.close()
            },
        },

        watch: {
            course_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true;
                    this.course = await this.fetchCourse({id});
                    if (this.course) {
                        if (this.course.lessons) {
                            this.lessons = Object.keys(this.course.lessons).map(key => {
                                return {
                                    ...this.course.lessons[key],
                                    id: key,
                                }
                            })
                        } else {
                            this.lessons = []
                        }

                        this.loading = false;
                    }
                }
            },
            dialog(val) {
                val || this.close()
            },
        },

    }
</script>
