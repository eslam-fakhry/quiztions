<template>
    <v-layout column style="height: 100%">
        <v-flex  shrink>
            <v-textarea
                    autofocus
                    class="form-text-input"
                    style="width: 100vw;max-width: 300px;"
                    outline
                    v-model="userAnswer[0]"
                    :disabled="uiState.ANSWER_CHECKED"
                    :success="uiState.ANSWERED_CORRECTLY"
                    :error="uiState.ANSWERED_WRONG"
            ></v-textarea>
        </v-flex>

        <v-flex grow class="d-flex justify-center align-center">
            <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
        </v-flex>
        <v-flex  shrink class="text-xs-center" >
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
    import QuestionFeedback from "./QuestionFeedback";

    export default {
        name: 'InputAnswer',
        props: {
            question: {type: Object, required: true},
        },
        mixins: [QuestionMixin,],
        components: {QuestionFeedback,},
        methods: {
            setFeedback() {
                this.feedback = this.correct?`you were right, "${this.userAnswer}" is the answer`:`sorry
            but "${this.question.rightAnswer}" is the right answer`

            }
        },
    }
</script>
<style scoped>
    /*noinspection CssUnusedSymbol*/
    .form-text-input /deep/ .v-input__slot {
        border-width:1px!important;
    }
</style>
