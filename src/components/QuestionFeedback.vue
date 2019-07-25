<template>
    <v-alert

            :type="uiState.ANSWERED_CORRECTLY?'success':uiState.ANSWERED_WRONG?'error':'info'"
            v-if="uiState.ANSWER_CHECKED"
    >
        <span>{{feedback}}</span>
    </v-alert>
</template>
<script>
    export default {
        name: 'QuestionFeedback',
        props: {
            uiState: {
                type: Object,
                required: true
            },
            feedback: {
                type: String,
                required: true
            },
        }
    }
</script>
