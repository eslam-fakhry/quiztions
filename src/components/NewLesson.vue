<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-dialog
            v-model="dialog"
            max-width="500px"
    >
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
                        <v-flex xs12 sm6>
                            <TheTextField
                                    v-model="lesson.name"
                                    label="Lesson name"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <TheTextField
                                    v-model="lesson.tolerance"
                                    label="Tolerance"
                            />
                        </v-flex>
                        <v-flex xs12 sm6 md4>
                            <v-switch
                                    v-model="lesson.canNavigate"
                                    :label="`can ${lesson.canNavigate?'':'not'} navigate`"
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

    const {mapActions} = createNamespacedHelpers('lessons')
    export default {
        name: "NewLesson",

        components: {TheTextField},

        props: {
            course_id: {type: String, required: true},
        },

        data() {
            return {
                dialog: false,
                lesson: {
                    name: '',
                    canNavigate: true,
                    tolerance: 3
                },
                defaultLesson: {
                    name: '',
                    canNavigate: true,
                    tolerance: 3
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
                if (this.dialog && event.key === 'Enter') {
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
            ...mapActions(['createLesson']),
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.lesson = Object.assign({}, this.defaultLesson)
                }, 300)
            },
            save() {
                this.createLesson({
                    ...this.lesson,
                    courseId: this.course_id
                })
                    .then(id => {
                        showSnackbar('Lesson is successfully created', 'success')
                        this.$router.push({name: 'edit-lesson', params: {lesson_id: id}})
                    })
                this.close()
            },
        }
    }
</script>

