<template>
    <v-layout column style="height: 100%">
        <v-flex shrink>


        <QuestionTemplate :value="[...userAnswer]"
                          @input="userAnswer = $event"
                          :template="question.template"
                          :key="question.id"
                          :ui-state="uiState"
        />
        </v-flex>

        <v-flex grow class="d-flex justify-center align-center">
            <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
        </v-flex>
        <v-flex shrink class="text-xs-center">
            <v-btn
                    outline
                    @click="answer"
                    :disabled="uiState.NOT_ANSWERED"
                    :loading="loading"
                    v-text="submitBtnText"
            />
        </v-flex>
    </v-layout>
</template>
<script>
    import QuestionMixin from "./mixins/Question"

    import QuestionTemplate from "./QuestionTemplate"
    import QuestionFeedback from "./QuestionFeedback";

    export default {
        name: 'CompletionAnswer',
        props: {
            question: {type: Object, required: true},
        },
        mixins: [QuestionMixin,],
        components: {QuestionTemplate, QuestionFeedback,},
        methods: {
            // override setFeedback from question mixin
            setFeedback() {
                this.feedback = this.correct ? `you were right, "${this.userAnswer}" is the answer` : `sorry
            but "${this.question.rightAnswer}" is the right answer`

            }
        },
        computed: {
            // todo: customize submitDisabled computed property
            // submitDisabled() {
            //     return !this.userAnswer.length
            // }
        },
    }
</script>
<style scoped>

</style>
