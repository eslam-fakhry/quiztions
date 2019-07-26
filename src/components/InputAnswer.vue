<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <Answer :question="question" v-on="$listeners">
        <template v-slot:default="{userAnswer,uiState}">
            <v-textarea
                    autofocus
                    style="width: 100vw;max-width: 300px;"
                    outlined
                    v-model="userAnswer[0]"
                    :disabled="uiState.ANSWER_CHECKED"
                    :success="uiState.ANSWERED_CORRECTLY"
                    :error="uiState.ANSWERED_WRONG"
            ></v-textarea>
        </template>
    </Answer>

</template>
<script>
    import Answer from "./Answer";

    export default {
        name: 'InputAnswer',

        props: {
            question: {type: Object, required: true},
        },

        components: {Answer,},
    }
</script>
