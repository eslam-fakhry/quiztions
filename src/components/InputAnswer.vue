<template>
    <v-textarea
            :value="userAnswer"
            @input="answer"
            :disabled="uiState.ANSWER_CHECKED"
            :success="uiState.ANSWERED_CORRECTLY"
            :error="uiState.ANSWERED_WRONG"
            class="input-answer"
            autofocus
            outlined
    />
</template>

<script>
    import AnswerMixin from "./mixins/Answer"

    export default {
        name: 'InputAnswer',

        mixins: [AnswerMixin],

        props: {
            uiState: {type: Object,},
        },
    }
</script>

<style scoped>
    .input-answer {
        width: 100vw;
        max-width: 300px;
    }
</style>
