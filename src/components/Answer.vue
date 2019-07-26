<template>
    <v-layout column style="height: 100%">
        <v-flex shrink>
            <slot v-bind="{question,userAnswer,uiState,updateAnswer}"></slot>
        </v-flex>
        <v-flex grow class="d-flex justify-center align-center">
            <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
        </v-flex>
        <v-flex shrink class="text-center pb-4">
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
    import QuestionFeedback from "./QuestionFeedback";

    export default {
        name: 'Answer',

        props: {
            question: {type: Object, required: true},
        },

        mixins: [QuestionMixin,],

        components: {
            QuestionFeedback,
        },

        methods: {
            // override setFeedback from question mixin
            setFeedback() {
                this.feedback = this.correct ? `you were right, "${this.userAnswer}" is the answer` : `sorry
            but "${this.question.rightAnswer}" is the right answer`
            },

        },

        created() {
        },

    }
</script>
