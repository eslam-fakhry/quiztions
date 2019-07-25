<template>
    <v-layout column style="height: 100%">
        <v-flex shrink>
            <SelectionOptions
                    v-model="userAnswer[0]"
                    :options="question.options"
                    :ui-state="uiState"
                    :disabled="uiState.ANSWER_CHECKED"
            />
        </v-flex>
        <v-flex grow class="d-flex justify-center align-center">
            <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
        </v-flex>
        <v-flex shrink class="text-center">
            <v-btn
                    outlined
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

    import SelectionOptions from "./SelectionOptions"
    import QuestionFeedback from "./QuestionFeedback";

    export default {
        name: 'SelectionAnswer',
        props: {
            question: {type: Object, required: true},
        },
        mixins: [QuestionMixin,],
        components: {QuestionFeedback, SelectionOptions,},
        methods: {
            // override setFeedback from question mixin
            setFeedback() {
                this.feedback = this.correct ? `you were right, "${this.userAnswer}" is the answer` : `sorry
            but "${this.question.rightAnswer}" is the right answer`
            },
        },
    }
</script>
