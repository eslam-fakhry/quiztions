<template>
            <QuestionTemplate
                    :value="[...value]"
                    @input="$emit('input',$event)"
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
            value: {},
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
