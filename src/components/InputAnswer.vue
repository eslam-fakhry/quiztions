<template>
    <v-textarea
            v-model="value[0]"
            :disabled="uiState.ANSWER_CHECKED"
            :success="uiState.ANSWERED_CORRECTLY"
            :error="uiState.ANSWERED_WRONG"
            style="width: 100vw;max-width: 300px;"
            autofocus
            outlined
    ></v-textarea>
</template>
<script>
    // todo check if textarea needs key
    export default {
        name: 'InputAnswer',
        // todo: remove if not needed
        inject: ['question'],
        props: {
            value: {},
            uiState: {},
        },

        components: {},
    }
</script>
