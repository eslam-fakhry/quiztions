<template>

    <v-stepper v-model="currentStep" vertical>


        <v-stepper-step editable :complete="currentStep > 1" step="1">Configure analytics for this app</v-stepper-step>

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

        <v-stepper-step editable :complete="currentStep > 2" step="2">
            Question body
        </v-stepper-step>

        <v-stepper-content step="2">
            <v-card flat>
                <v-text-field
                        v-model="body[0]"
                        outlined
                        hide-details
                        data-jest="question-body"
                />
            </v-card>
            <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step editable :complete="currentStep > 3" step="3">More Information</v-stepper-step>

        <v-stepper-content step="3">
            <v-card flat>
                <CreateList
                        v-if="selectedAnswerType === 'Selection'"
                        :value="[...options]"
                        :min="2"
                        :max="5"
                        @input="options=$event"
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

        <v-stepper-step editable :complete="currentStep > 4" step="4">Right Answers</v-stepper-step>
        <v-stepper-content step="4">
            <v-card flat>
                <v-select
                        v-if="selectedAnswerType === 'Selection'"
                        :items="[...options]"
                        @input="rightAnswers[0] = $event"
                        label="select the right answer"
                        solo
                />
                <CompletionRightAnswers
                        v-else-if="selectedAnswerType === 'Completion'"
                        template="--blank-- is longest river in --blank--."
                        :value="[...rightAnswers]"
                        @input="rightAnswers = $event"
                />
                <v-text-field
                        v-else-if="selectedAnswerType === 'Input'"
                        :value="rightAnswers[0]"
                        @input="rightAnswers = [$event]"
                />
            </v-card>
            <v-btn color="primary" @click="currentStep = 5">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step editable step="5">Extra options</v-stepper-step>
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
            <v-btn color="primary" @click="currentStep = 1">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-stepper-content>
    </v-stepper>
    <!--
        <div>
            <h2>Add body</h2>
            <v-text-field v-model="body[0]"></v-text-field>
            <h2>Add Answer type</h2>

            <v-select
                    :items="answerTypes"
                    label="Answer type"
                    solo
                    v-model="selectedAnswerType"
            ></v-select>
            <CreateList
                    v-if="selectedAnswerType === 'Selection'"
                    :value="[...options]"
                    @input="options=$event"
            />
            <CreateCompletionTemplate
                    v-else-if="selectedAnswerType === 'Completion'"
                    v-model="questionTemplate"
            />

            <v-layout>
                <v-flex>
                    <v-btn :disabled="savaDisabled">Save and go back</v-btn>
                    <v-btn :disabled="savaDisabled">Save and add new</v-btn>
                    <v-btn color="red">discard</v-btn>
                </v-flex>
            </v-layout>

        </div>
        -->
</template>

<script>
    import {required} from 'vuelidate/lib/validators'

    import CreateList from '../CreateList'
    import CreateCompletionTemplate from './CreateCompletionTemplate'
    import CompletionRightAnswers from './CompletionRightAnswers'

    // todo: add validation to check the rules up to the next step
    export default {
        name: "CreateQuestion",

        components: {
            CreateList,
            CreateCompletionTemplate,
            CompletionRightAnswers,
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
                rightAnswers: [],
                renderedLocally: false,
                timed: false,

            }
        },

        computed: {
            savaDisabled() {
                return this.$v.$invalid;
            }
        },

        validations: {
            selectedAnswerType: {
                required,
                validChoice(value) {
                    if (value === '') return true

                    return this.answerTypes.includes(value)
                },
            }

        }
    }
</script>

<style scoped>

</style>
