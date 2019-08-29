<!--suppress ALL -->
<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container class="">


        <h1 class="text-center">{{ lesson.name}}</h1>


        <v-data-table
                :headers="headers"
                :items="questions"
                class="elevation-1"
                @click:row="onRowClick"
                :loading="loading"
                loading-text="Loading... Please wait"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>{{ lesson.name}}</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="primary"
                            dark
                            class="mb-2"
                            :to="{name:'create-question',params:{lesson_id}}"
                    >New Question
                    </v-btn>

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
                            @click.stop="removeQuestion(item)"
                    >
                        delete
                    </v-icon>
                </div>

            </template>
            <template v-slot:no-data>
                This Lesson has no questions yet.
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'

    const {mapState, mapActions} = createNamespacedHelpers('lessons')
    const {mapActions: mapQuestionsActions} = createNamespacedHelpers('questions')

    export default {
        name: "EditLesson",
        props: {
            lesson_id: {
                required: true
            }
        },

        components: {
            Loading
        },

        data() {
            return {
                loading: false,
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
                // courses: [],
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
            }
        },
        computed: {
            lesson() {
                return this.$store.state.lessons.lessons[this.lesson_id]
            },
            questions() {
                const questions = this.lesson.questions
                if (questions) {
                    return Object.values(questions).map((key, index) => {
                        return {
                            id: key,
                            name: index,
                        }
                    })
                }
                return []
            },
        },


        watch: {
            lesson_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true;
                    await this.fetchLesson({id});
                    this.loading = false;
                }
            },
            dialog(val) {
                val || this.close()
            },
        },

        methods: {
            ...mapActions(['fetchLesson']),
            ...mapQuestionsActions(['deleteQuestion']),

            onRowClick(ev) {
                console.log(ev);
            },
            editItem(item) {
                console.log('edit question');
                // this.$router.push({name:'edit-question',params:{question_id:item.id}})

                // this.editedIndex = this.courses.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialog = true
            },

            removeQuestion(question) {
                if (confirm('Are you sure you want to delete this question?')) {
                    console.log('deleting ');
                    this.deleteQuestion({
                        questionId: question.id,
                        lessonId: this.lesson_id
                    })
                }
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
                    console.log('editing a question');
                    // Object.assign(this.courses[this.editedIndex], this.editedItem)
                } else {
                    console.log('creating  a new question');
                    // this.courses.push(this.editedItem)
                }
                this.close()
            },
        },

    }
</script>
