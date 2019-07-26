<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <Answer :question="question" v-on="$listeners">
        <template v-slot:default="{userAnswer,question,uiState}">
            <SelectionOptions
                    v-model="userAnswer[0]"
                    :options="question.options"
                    :ui-state="uiState"
                    :disabled="uiState.ANSWER_CHECKED"
            />
        </template>
    </Answer>
</template>
<script>

    import SelectionOptions from "./SelectionOptions"
    import Answer from "./Answer";

    export default {
        name: 'SelectionAnswer',

        props: {
            question: {type: Object, required: true},
        },

        components: {Answer,SelectionOptions},

    }
</script>
