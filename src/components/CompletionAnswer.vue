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
        mixins:[AnswerMixin],
        inject:['question'],

        props: {
            uiState:{},
        },

        components: {
            QuestionTemplate,
        },

        methods: {
/*
            validateAnswer(userAnswer, questionId) {
                return this.$store.dispatch('answers/fetchRightAnswer', {id: questionId})
                    .then((rightAnswer) =>{
                        return JSON.stringify(userAnswer) === JSON.stringify(rightAnswer);
                    })
            }
*/
        },
    }
</script>
