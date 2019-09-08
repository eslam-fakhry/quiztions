<template>
    <SelectionOptions
            :value="userAnswer"
            @input="answer"
            :ui-state="uiState"
            :disabled="uiState.ANSWER_CHECKED"
    />
</template>
<script>

    import SelectionOptions from "./SelectionOptions"
    import AnswerMixin from "./mixins/Answer"

    export default {
        name: 'SelectionAnswer',

        components: {SelectionOptions},

        mixins: [AnswerMixin],

        props: {
            uiState: {type:Object,},
        },
    }
</script>
