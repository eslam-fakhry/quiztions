<!--suppress ALL -->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <Loading v-if="loading"></Loading>
        <v-container>
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
                    You have no course yet. why not making a new one
                </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from './Loading'

    const {mapState, mapActions} = createNamespacedHelpers('user')
    const {mapActions: mapCoursesActions} = createNamespacedHelpers('courses')

    export default {
        name: "Courses",

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
            // todo add loading state
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

        async created() {
            this.loading = true
            await this.fetchUserCourses()
            this.loading = false
        },

        methods: {
            ...mapActions(['fetchUserCourses']),
            ...mapCoursesActions(['createCourse']),
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
            deleteItem(item) {
                const index = this.courses.indexOf(item)
                if (confirm('Are you sure you want to delete this item?')) {

                    console.log('deleting ', this.courses[index]);
                }
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
