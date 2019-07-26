<template>
    <v-alert
            prominent
            :type="uiState.ANSWERED_CORRECTLY?'success':uiState.ANSWERED_WRONG?'error':'info'"
            v-if="uiState.ANSWER_CHECKED"
            :icon="false"
    >
        <div
                class="text-wrap"
                style="max-width: 300px"
        >{{feedback}}</div>
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
