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

        mixins:[AnswerMixin],

        props: {
            value: {},
            uiState:{},
        },

        components: {SelectionOptions},

        methods: {
            // answer(value){
            //
            //     this.$emit('answered')
            //     this.$emit('input',value)
            // }
        },

    }
</script>
