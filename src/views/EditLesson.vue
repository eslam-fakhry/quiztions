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
                            :to="{name:'create-question',params:{lesson_id:lesson.id}}"
                    >New Question</v-btn>

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
                This Lesson has no questions yet.
            </template>
        </v-data-table>

    </v-container>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import layoutMixin from "@/layouts/layoutMixin"
    import Loading from '@/components/Loading'

    const {mapState, mapActions} = createNamespacedHelpers('lessons')

    export default {
        name: "EditLesson",
        props: {
            lesson_id: {
                required: true
            }
        },

        mixins: [layoutMixin,],

        components: {
            Loading
        },

        data() {
            return {
                lesson: {},
                questions: [],
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

        methods: {
            ...mapActions(['fetchLesson']),

            onRowClick(ev) {
                console.log(ev);
            },
            initialize() {
            },

            editItem(item) {
                console.log('edit question');
                // this.$router.push({name:'edit-question',params:{question_id:item.id}})

                // this.editedIndex = this.courses.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                // this.dialog = true
            },

            deleteItem(item) {
                const index = this.questions.indexOf(item)
                confirm('Are you sure you want to delete this item?') && console.log('deleting ', this.questions[index]);
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
                    console.log('editing a question');
                    // Object.assign(this.courses[this.editedIndex], this.editedItem)
                } else {
                    console.log('creating  a new question');
                    // this.courses.push(this.editedItem)
                }
                this.close()
            },
        },

        watch: {
            lesson_id: {
                immediate: true,
                async handler(id) {
                    this.loading = true;
                    this.lesson = await this.fetchLesson({id});
                    if (this.lesson.questions) {
                        this.questions = Object.values(this.lesson.questions).map((key, index) => {
                            return {
                                id: key,
                                name: index,

                            }
                        })
                    } else {
                        this.questions = []
                    }
                    this.loading = false;
                }
            },
            dialog(val) {
                val || this.close()
            },
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
        },


    }
</script>

<style scoped>

</style>