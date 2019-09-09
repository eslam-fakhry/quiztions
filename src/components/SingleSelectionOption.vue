<template>
    <div class="py-4 my-4 option text-center"
         @click="$emit('click')"
         :class="selected?classes:{}"
         v-text="option"
         data-jest="option"
    />
</template>
<script>
    export default {
        name: 'SingleSelectionOption',

        props: {
            option: {type: String, required: true},
            uiState: {type: Object, required: true},
            selected: {type: Boolean, default: false},
            disabled: {type: Boolean, default: false}
        },

        computed: {
            classes() {
                return {
                    blue: this.uiState.ANSWER_NOT_CHECKED,
                    success: this.uiState.ANSWERED_CORRECTLY,
                    error: this.uiState.ANSWERED_WRONG,
                }
            }
        },
    }
</script>

<style scoped>
    .option {
        border: 1px solid #000;
        border-radius: 3000px;
        cursor: pointer;
        transition: background-color .3s ease-in;
    }

    .option:hover {
        background: #e3e3e3;
    }
</style>

