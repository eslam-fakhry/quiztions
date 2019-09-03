<template>
    <v-alert
            prominent
            :type="alertType"
            v-if="uiState.ANSWER_CHECKED"
            :icon="false"
    >
        <div
                class="text-wrap feedback-text"
                style="max-width: 300px"
                v-text="feedback"
                data-jest="feedback-text"
        />
    </v-alert>
</template>

<script>
    export default {
        name: 'QuestionFeedback',

        props: {
            uiState: { type: Object, required: true },
            feedback: { type: String, required: true },
        },

        computed: {
            alertType() {
                return this.uiState.ANSWERED_CORRECTLY ? 'success' : this.uiState.ANSWERED_WRONG ? 'error' : 'info';
            }
        },
    }
</script>
