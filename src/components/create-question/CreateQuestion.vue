<template>
    <v-container>

        <h2>Question Type</h2>
        <v-card flat>
            <v-select
                    :items="answerTypes"
                    label="Answer type"
                    solo
                    hide-details
                    v-model="selectedAnswerType"
                    data-jest="select-question-type"
            ></v-select>
        </v-card>

        <h2>Question Body</h2>
        <v-card flat>
            <v-text-field
                    :value="body[0]"
                    @input="body =[$event]"
                    outlined
                    hide-details
                    data-jest="question-body"
            />
        </v-card>

        <h2>Question Information</h2>
        <component
                :is="answerComponentName"
                @update:questionPart="questionPart = $event"
                @update:valid="questionTypeValid = $event"
                @update:rightAnswer="rightAnswer = $event"
        ></component>

        <h2>Extra Information</h2>
        <v-card flat>
            <v-switch
                    v-model="extra.renderedLocally"
                    :label="`Is ${extra.renderedLocally?'':'not'} rendered locally`"
            ></v-switch>
            <v-switch
                    v-model="extra.timed"
                    :label="`Is ${extra.timed?'':'not'} timed`"
            ></v-switch>

        </v-card>

        <div>
            <v-btn
                    color="primary"
                    @click="save"
                    data-jest="save-btn"
            >
                Save
            </v-btn>
            <v-btn
                    text
                    @click="cancel"
            >
                cancel
            </v-btn>
        </div>

    </v-container>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import {required, minLength} from 'vuelidate/lib/validators'
    import {showSnackbar} from "@/utils";

    import CreateCompletionQuestion from '@/components/create-question/CreateCompletionQuestion'
    import CreateInputQuestion from '@/components/create-question/CreateInputQuestion'
    import CreateSelectionQuestion from '@/components/create-question/CreateSelectionQuestion'


    const {mapActions} = createNamespacedHelpers('questions')

    const answerComponents = {
        'Selection': CreateSelectionQuestion,
        'Completion': CreateCompletionQuestion,
        'Input': CreateInputQuestion,
    }

    export default {
        name: "CreateQuestion",

        components: {
            CreateCompletionQuestion,
            CreateInputQuestion,
            CreateSelectionQuestion,
        },

        props: {
            lesson_id: {
                type: String,
                required: true,
            }
        },

        data() {
            return {
                body: [],
                answerTypes: ['Selection', 'Input', 'Completion'],
                selectedAnswerType: '',
                rightAnswer: [],
                questionPart: {},
                questionTypeValid: false,
                extra: {
                    renderedLocally: false,
                    timed: false,
                }
            }
        },

        computed: {
            answerComponentName() {
                return answerComponents[this.selectedAnswerType];
            },
            questionObj() {
                return Object.assign(
                    {},
                    this.questionPart,
                    this.extra,
                    {
                        body: this.body[0],
                    }
                )
            },
        },

        methods: {
            ...mapActions(['createQuestion']),
            async save() {
                try {

                    await this.createQuestion({
                        question: this.questionObj,
                        rightAnswer: this.rightAnswer,
                        lessonId: this.lesson_id,
                    })
                    showSnackbar('Question is successfully created', 'success')
                    // noinspection JSCheckFunctionSignatures
                    this.$router.push({name: 'edit-lesson', params: {lesson_id: this.lesson_id}})
                } catch (e) {
                    if (e.code === "PERMISSION_DENIED") {
                        showSnackbar('You have no authentication to complete this process', 'error')
                        return
                    }
                    showSnackbar('Something went wrong', 'error')

                }
            },
            cancel() {
                // noinspection JSCheckFunctionSignatures
                confirm('Discard changes?') && this.$router.push({
                    name: 'edit-lesson',
                    params: {lesson_id: this.lesson_id}
                })
            },
        },

        validations() {
            return {
                selectedAnswerType: {
                    required,
                    validChoice(value) {
                        if (value === '') return true
                        return this.answerTypes.includes(value)
                    },
                },
                body: {
                    required,
                    $each: {
                        required,
                        minLength: minLength(3)
                    },
                },
                rightAnswer: {
                    required,
                    $each: {
                        required,
                    }
                },
            }
        }
    }
</script>
