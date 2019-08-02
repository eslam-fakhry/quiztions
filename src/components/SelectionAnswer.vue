<template>
            <SelectionOptions
                    v-model="value[0]"
                    :ui-state="uiState"
                    :disabled="uiState.ANSWER_CHECKED"
            />
</template>
<script>

    import SelectionOptions from "./SelectionOptions"

    export default {
        name: 'SelectionAnswer',
        props: {
            value: {},
            uiState:{},
        },

        components: {SelectionOptions},

    }
</script>
