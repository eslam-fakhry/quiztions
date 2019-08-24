<template>
    <v-container>
        <v-stepper v-model="currentStep" vertical >


            <v-stepper-step :editable="previousStepsValid(1)" :complete="currentStep > 1" step="1">Configure analytics for this app
            </v-stepper-step>

            <v-stepper-content step="1">
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
                <v-btn color="primary" @click="currentStep = 2">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step :rules="[disable]" :editable="previousStepsValid(2)" disabled :complete="currentStep > 2" step="2">
                Question body
            </v-stepper-step>

            <v-stepper-content step="2">
                <v-card flat>
                    <v-text-field
                            :value="body[0]"
                            @input="body =[$event]"
                            outlined
                            hide-details
                            data-jest="question-body"
                    />
                </v-card>
                <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step :editable="previousStepsValid(3)" :complete="currentStep > 3" step="3">More Information</v-stepper-step>

            <v-stepper-content step="3">
                <v-card flat>
                    <CreateList
                            v-if="selectedAnswerType === 'Selection'"
                            :value="[...options]"
                            :min="2"
                            :max="5"
                            @input="options=[...$event]"
                    />
                    <CreateCompletionTemplate
                            v-else-if="selectedAnswerType === 'Completion'"
                            v-model="questionTemplate"
                    />
                    <v-alert
                            v-else-if="selectedAnswerType === 'Input'"
                            type="success"

                    >No more information is needed for this type of question. you can continue.
                    </v-alert>
                </v-card>
                <v-btn color="primary" @click="currentStep = 4">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step :editable="previousStepsValid(4)" :complete="currentStep > 4" step="4">Right Answers</v-stepper-step>
            <v-stepper-content step="4">
                <v-card flat>
                    <v-select
                            v-if="selectedAnswerType === 'Selection'"
                            :items="[...options]"
                            @input="rightAnswer = [$event]"
                            label="select the right answer"
                            solo
                    />
                    <CompletionRightAnswers
                            v-else-if="selectedAnswerType === 'Completion'"
                            :template="questionTemplate"
                            :value="[...rightAnswer]"
                            @input="rightAnswer = $event"
                    />
                    <v-text-field
                            v-else-if="selectedAnswerType === 'Input'"
                            :value="rightAnswer[0]"
                            @input="rightAnswer = [$event]"
                    />
                </v-card>
                <v-btn color="primary" @click="currentStep = 5">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>

            <v-stepper-step :editable="previousStepsValid(5)" step="5">Extra options</v-stepper-step>
            <v-stepper-content step="5">
                <v-card flat>
                    <v-switch
                            v-model="renderedLocally"
                            :label="`Is ${renderedLocally?'':'not'} rendered locally`"
                    ></v-switch>
                    <v-switch
                            v-model="timed"
                            :label="`Is ${timed?'':'not'} timed`"
                    ></v-switch>

                </v-card>
                <v-btn color="primary" @click="save">Save</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>
        </v-stepper>

        <div v-for="(step, i) in stepsValidation" :key="i">
            {{step}}

        </div>
    </v-container>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    import {required, minLength, maxLength} from 'vuelidate/lib/validators'

    import CreateList from '@/components/CreateList'
    import CreateCompletionTemplate from '@/components/create-question/CreateCompletionTemplate'
    import CompletionRightAnswers from '@/components/create-question/CompletionRightAnswers'

    const {mapActions} = createNamespacedHelpers('questions')

    // todo: add validation to check the rules up to the next step
    export default {
        name: "CreateQuestion",

        components: {
            CreateList,
            CreateCompletionTemplate,
            CompletionRightAnswers,
        },

        props: {
            lesson_id: {
                type: String,
                required: true,
            }
        },

        data() {
            return {
                currentStep: 1,
                lastStep: 5,
                body: [],
                answerTypes: ['Selection', 'Input', 'Completion'],
                selectedAnswerType: '',
                options: [],
                questionTemplate: '',
                rightAnswer: [],
                renderedLocally: false,
                timed: false,

            }
        },

        computed: {
            savaDisabled() {
                return this.$v.$invalid;
            },
            selectionQuestion() {
                const {body, options, renderedLocally, timed} = this.$data
                return {
                    body: body[0],
                    options,
                    renderedLocally,
                    timed,
                    type: 'selection',
                }
            },
            completionQuestion() {
                const {body, questionTemplate, renderedLocally, timed} = this.$data
                return {
                    body: body[0],
                    template:questionTemplate,
                    renderedLocally,
                    timed,
                    type: 'completion',
                }
            },
            inputQuestion() {
                const {body, renderedLocally, timed} = this.$data
                return {
                    body: body[0],
                    renderedLocally,
                    timed,
                    type: 'input',
                }
            },
            blankNum() {
                // noinspection JSCheckFunctionSignatures
                const re = new RegExp("--blank--", "g");
                return (this.questionTemplate.match(re) || []).length
            },
            stepsValidation(){

                let step3validation =false;
                switch (this.selectedAnswerType) {
                    case 'Selection':
                        step3validation = !this.$v.options.$invalid
                        break;
                    case 'Completion':
                        step3validation = !this.$v.questionTemplate.$invalid
                        break;
                    case 'Input':
                        step3validation = true
                        break;
                }


                return [
                    true,
                    !this.$v.selectedAnswerType.$invalid,
                    !this.$v.body.$invalid,
                    step3validation,
                    !this.$v.rightAnswer.$invalid,

                ]
            }
        },

        methods: {
            ...mapActions(['createQuestion']),
            async save() {
                let question;
                switch (this.selectedAnswerType) {
                    case 'Selection':
                        question = this.selectionQuestion;
                        break;
                    case 'Input':
                        question = this.inputQuestion;
                        break;
                    case 'Completion':
                        question = this.completionQuestion;
                        break;
                    default:
                        return;

                }

                await this.createQuestion({
                    question,
                    rightAnswer: this.rightAnswer,
                    lessonId: this.lesson_id,
                })
                console.log('created');

            },

            disable(input){
                // console.log('input ',input);
                return true
            },
            previousStepsValid(step){
                return this.stepsValidation.slice(0,step).every(item=>item)

            },

        },

        watch:{
            currentStep(newValue,oldValue){
                if( !this.previousStepsValid(newValue)){
                    this.currentStep = oldValue
                }
            },
            stepsValidation(newValue,oldValue) {
                const firstErrorIndex = newValue.indexOf(false)
                if (firstErrorIndex < this.currentStep && firstErrorIndex > 0){
                console.log('this.currentStep',this.currentStep);
                console.log('firstErrorIndex',firstErrorIndex);

                    this.currentStep = firstErrorIndex
                }
                // console.log('old',oldValue,'\nnew',newValue);
            }

        },


        validations() {

            let validatorsObj = {
                selectedAnswerType: {
                    required,
                    validChoice(value) {
                        if (value === '') return true

                        return this.answerTypes.includes(value)
                    },
                },
                body: {
                    required,
                    $each:{
                        required,
                        minLength:minLength(3)
                    },

                    // min(value) {
                    //     return value.every((item) => {
                    //         return item.length > 3
                    //     })
                    // },
                },
                rightAnswer: {
                    required,
                    // validAnswer(value) {
                    //     this.options.includes(value[0])
                    // }
                    $each: {
                        required,
                    }
                }


            };


            if (this.selectedAnswerType === 'Selection') {
                return {
                    ...validatorsObj,
                    options: {
                        required,
                        minLength:minLength(2),
                        maxLength:maxLength(6),

                        $each: {
                            required,
                        },
                    },

                    rightAnswer: {
                        required,
                        maxLength:maxLength(1),
                        validAnswer(value) {
                            return this.options.includes(value[0])
                        },
                        $each: {
                            required,
                        }
                    }
                }

            }else if (this.selectedAnswerType === 'Input') {
                return {
                    ...validatorsObj,
                    rightAnswer: {
                        required,
                        maxLength:maxLength(1),
                        $each: {
                            required,
                        }
                    }
                }

            }else if (this.selectedAnswerType === 'Completion') {
                return {
                    ...validatorsObj,
                    questionTemplate: {
                        required,
                        containBlanks(){
                            return !! this.blankNum
                        },
                    },
                    rightAnswer: {
                        required,
                        exactLength(value) {
                            return value.length === this.blankNum
                        },
                        $each: {
                            required,
                        }
                    }
                }

            }

            return validatorsObj
        }
    }
</script>

<style scoped>

</style>
