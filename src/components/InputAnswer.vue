<template>
    <v-textarea
            :value="userAnswer[0]"
            @input="answer([$event])"
            :disabled="uiState.ANSWER_CHECKED"
            :success="uiState.ANSWERED_CORRECTLY"
            :error="uiState.ANSWERED_WRONG"
            style="width: 100vw;max-width: 300px;"
            autofocus
            outlined
    />
</template>
<script>
    // todo fix modifying props.value directly
    import AnswerMixin from "./mixins/Answer"
    export default {
        name: 'InputAnswer',

        mixins:[AnswerMixin],

        props: {
            value: {},
            uiState: {},
        },
    }
</script>
