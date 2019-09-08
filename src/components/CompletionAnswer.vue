<template>
    <QuestionTemplate
            :value="[...userAnswer]"
            @input="answer"
            :key="question.id"
            :ui-state="uiState"
    />
</template>
<script>
    import QuestionTemplate from "./QuestionTemplate"
    import AnswerMixin from "./mixins/Answer"

    export default {
        name: 'CompletionAnswer',

        components: {
            QuestionTemplate,
        },

        mixins: [AnswerMixin],

        inject: ['question'],

        props: {
            uiState: {type:Object,},
        },

        data: () => ({
            // replace the default type with array type.
            userAnswer: [],
        }),
    }
</script>
