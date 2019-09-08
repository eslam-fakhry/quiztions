<template>
    <v-container>
        <v-card>
            <v-layout wrap class="pt-4 pb-8">
                <v-flex xs12 lg3>
                    <v-subheader>
                        Question Type
                    </v-subheader>
                </v-flex>
                <v-flex xs12 lg9>
                    <TheSelectField
                            :items="answerTypes"
                            label="Type"
                            v-model="selectedAnswerType"
                            data-jest="select-question-type"
                    />
                </v-flex>
            </v-layout>

            <v-divider/>

            <v-layout wrap class="pt-4 pb-8 ">
                <v-flex xs12 lg3>
                    <v-subheader>
                        Question Body
                    </v-subheader>
                </v-flex>
                <v-flex xs12 lg9>
                    <TheTextField
                            :value="body[0]"
                            @input="body =[$event]"
                            label="Body"
                            data-jest="question-body"
                    />
                </v-flex>
            </v-layout>

            <v-divider/>

            <v-layout wrap class="pt-4 pb-8">
                <v-flex xs12 lg3>
                    <v-subheader>
                        Question Information
                    </v-subheader>
                </v-flex>
                <v-flex xs12 lg9>
                    <component
                            :is="answerComponentName"
                            :right-answer="rightAnswer"
                            @update:questionPart="questionPart = $event"
                            @update:valid="questionTypeValid = $event"
                            @update:rightAnswer="rightAnswer = $event"
                    />
                </v-flex>
            </v-layout>

            <v-divider/>

            <v-layout wrap class="pt-4 pb-8" v-if="false">
                <v-flex xs12 lg3>
                    <v-subheader>
                        Extra Information
                    </v-subheader>
                </v-flex>
                <v-flex xs12 lg9>
                    <v-switch
                            v-model="extra.renderedLocally"
                            :label="`Is ${extra.renderedLocally?'':'not'} rendered locally`"
                            hide-details
                    />
                    <v-switch
                            v-model="extra.timed"
                            :label="`Is ${extra.timed?'':'not'} timed`"
                            hide-details
                    />
                </v-flex>
            </v-layout>

            <v-divider/>

            <v-layout wrap class="pt-4 pb-8">
                <v-spacer/>
                <v-flex xs12 lg9>
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
                </v-flex>
            </v-layout>
        </v-card>
    </v-container>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import {required, minLength} from 'vuelidate/lib/validators'
    import {showSnackbar} from "@/utils";

    import CreateCompletionQuestion from '@/components/create-question/CreateCompletionQuestion'
    import CreateInputQuestion from '@/components/create-question/CreateInputQuestion'
    import CreateSelectionQuestion from '@/components/create-question/CreateSelectionQuestion'
    import TheTextField from "@/components/TheTextField";
    import TheSelectField from "@/components/TheSelectField";


    const {mapActions} = createNamespacedHelpers('questions')

    const answerComponents = {
        'Selection': CreateSelectionQuestion,
        'Completion': CreateCompletionQuestion,
        'Input': CreateInputQuestion,
    }

    export default {
        name: "CreateQuestion",

        components: {
            TheSelectField,
            TheTextField,
            CreateCompletionQuestion,
            CreateInputQuestion,
            CreateSelectionQuestion,
        },

        props: {
            lesson_id: { type: String, required: true, }
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
                    this.$router.replace({name: 'edit-lesson', params: {lesson_id: this.lesson_id}})
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
                confirm('Discard changes?') && this.$router.replace({
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
