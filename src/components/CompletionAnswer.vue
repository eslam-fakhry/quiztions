<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <Answer :question="question" v-on="$listeners">
        <template v-slot:default="{userAnswer,question,uiState,updateAnswer}">
            <QuestionTemplate
                    :value="[...userAnswer]"
                    @input="updateAnswer"

                    :template="question.template"
                    :key="question.id"
                    :ui-state="uiState"
            />
        </template>
    </Answer>
</template>
<script>
    import QuestionTemplate from "./QuestionTemplate"
    import Answer from "./Answer";

    export default {
        name: 'CompletionAnswer',

        props: {
            question: {
                type: Object,
                required: true
            },
        },

        components: {
            QuestionTemplate,
            Answer,
        },

    }
</script>
