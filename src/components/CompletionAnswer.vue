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
    export default {
        name: 'CompletionAnswer',
        inject:['question'],

        props: {
            value: {},
            uiState:{},
        },

        components: {
            QuestionTemplate,
        },

        methods: {
            validateAnswer(userAnswer, questionId) {
                return this.$store.dispatch('answers/fetchRightAnswer', {id: questionId})
                    .then((rightAnswer) =>{
                        return JSON.stringify(userAnswer) === JSON.stringify(rightAnswer);
                    })
            }
        },
    }
</script>
