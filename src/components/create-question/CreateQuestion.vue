<template>

    <v-stepper v-model="currentStep" vertical>
        <v-stepper-step :complete="currentStep > 1" step="1">
            Question body
        </v-stepper-step>

        <v-stepper-content step="1">
            <v-card  class="mb-12" height1="200px">
                <v-text-field v-model="body[0]" outlined hide-details></v-text-field>
            </v-card>
            <v-btn color="primary" @click="currentStep = 2">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 2" step="2">Configure analytics for this app</v-stepper-step>

        <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height1="200px">
                <v-select
                        :items="answerTypes"
                        label="Answer type"
                        solo
                        hide-details
                        v-model="selectedAnswerType"
                ></v-select>
            </v-card>
            <v-btn color="primary" @click="currentStep = 3">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="currentStep > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

        <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-12" height1="200px">
                <CreateOptions
                        v-if="selectedAnswerType === 'Selection'"
                        :value="[...options]"
                        @input="options=$event"
                />
                <CreateCompletionTemplate
                        v-else-if="selectedAnswerType === 'Completion'"
                        v-model="questionTemplate"
                />
            </v-card>
            <v-btn color="primary" @click="currentStep = 4">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-step step="4">View setup instructions</v-stepper-step>
        <v-stepper-content step="4">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
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
        <CreateOptions
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

    import CreateOptions from './CreateOptions'
    import CreateCompletionTemplate from './CreateCompletionTemplate'

    export default {
        name: "CreateQuestion",

        components: {CreateOptions, CreateCompletionTemplate},

        data() {
            return {
                currentStep:1,
                body: [],
                answerTypes: ['Selection', 'Input', 'Completion'],
                selectedAnswerType: '',
                options: ['', ''],
                questionTemplate: '',

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
