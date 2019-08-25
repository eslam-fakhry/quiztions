<template>
            <SelectionOptions
                    v-model="value[0]"
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

    }
</script>
