<template>
            <SelectionOptions
                    :value="userAnswer[0]"
                    @input="answer([$event])"
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

        mixins:[AnswerMixin],

        props: { value: {}, uiState:{}, },

        methods: {
            // answer(value){
            //
            //     this.$emit('answered')
            //     this.$emit('input',value)
            // }
        },
    }
</script>
