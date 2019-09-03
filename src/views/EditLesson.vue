<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="page">
        <Loading v-if="loading"/>
        <div v-else class="fill-height ma-3">
            <v-data-table
                    :headers="headers"
                    :items="questions"
                    class="elevation-1"
                    @click:row="onRowClick"
            >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>{{ lesson.name}}</v-toolbar-title>
                        <v-divider
                                class="mx-4"
                                inset
                                vertical
                        />
                        <v-spacer/>
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
                    <div @click.stop class="d-flex items-center">
                        <v-btn
                                @click.stop="editItem(item)"
                                class="mr-2"
                                icon
                        >
                            <v-icon small >
                                edit
                            </v-icon>
                        </v-btn>
                        <ConfirmModal @confirmed="removeQuestion(item)">
                            <template v-slot:activator="{on}">
                                <v-btn
                                        icon
                                        v-on="on"
                                >
                                    <v-icon small >
                                        delete
                                    </v-icon>
                                </v-btn>
                            </template>
                            <template v-slot:title>
                                Confirm Deletion
                            </template>
                            Are you sure you want to delete this question?
                        </ConfirmModal>
                    </div>
                </template>

                <template v-slot:no-data>
                    This Lesson has no questions yet.
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import Loading from '@/components/Loading'
    import ConfirmModal from "@/components/ConfirmModal";

    const {mapActions} = createNamespacedHelpers('lessons')
    const {mapActions: mapQuestionsActions} = createNamespacedHelpers('questions')

    export default {
        name: "EditLesson",

        props: {
            lesson_id: {
                required: true
            }
        },

        components: {
            ConfirmModal,
            Loading,
        },

        data() {
            return {
                loading: false,
                headers: [
                    {text: 'Name', value: 'name', align: 'left', sortable: false,},
                    {text: 'Actions', align:'end',sortable: false, value: 'action', width:100},
                ],
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
                        return {id: key, name: index,}
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
        },

        methods: {
            ...mapActions(['fetchLesson']),
            ...mapQuestionsActions(['deleteQuestion']),
            onRowClick(ev) {
                // TODO: show question stats
            },
            editItem(item) {
                // TODO: add edit question functionality
            },
            removeQuestion(question) {
                this.deleteQuestion({ questionId: question.id, lessonId: this.lesson_id })
            },
        },
    }
</script>
