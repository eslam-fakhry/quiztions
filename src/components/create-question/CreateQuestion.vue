<template>
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
