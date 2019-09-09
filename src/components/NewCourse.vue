<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog
            v-model="dialog"
            max-width="500px"
    >
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
                        <v-flex xs12 sm6>
                            <TheTextField
                                    v-model="course.name"
                                    label="Course Name"
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
</template>

<script>
    import {createNamespacedHelpers} from "vuex";
    import {showSnackbar} from "@/utils";
    import TheTextField from "@/components/TheTextField";

    const {mapActions} = createNamespacedHelpers('courses')
    export default {
        name: "NewCourse",
        components: {TheTextField},
        props: {
            value: {type: Boolean, default: false}
        },

        data() {
            return {
                dialog:false,
                course: {
                    name: '',
                },
                defaultCourse:{
                    name: '',
                },
            }
        },

        watch: {
            dialog(val) {
                val || this.close()
            },
        },

        created(){
            const enterPressHandler = (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault()
                    this.save();
                }
            };
            document.addEventListener('keypress', enterPressHandler);
            this.$once('hook:destroyed', () => {
                document.removeEventListener('keypress', enterPressHandler)
            })
        },

        methods: {
            ...mapActions(['createCourse']),
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.course = Object.assign({}, this.defaultCourse)
                }, 300)
            },
            save() {
                this.createCourse({name: this.course.name}).then((id) => {
                    showSnackbar('Course is successfully created', 'success')
                    this.$router.push({name: 'edit-course', params: {course_id: id}})
                })
                this.close()
            },
        },
    }
</script>

