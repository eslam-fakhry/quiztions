<template>
    <div class="py-4 my-4 option text-center"
         v-on="$listeners"
         :class="classes"
    >{{option}}
    </div>
</template>
<script>
    export default {
        name: 'SingleSelectionOption',
        props: {
            option: {
                type: String,
                required: true
            },
            uiState: {
                type: Object,
                required: true
            },
            selected: {
                type: Boolean, default: false
            },
        },
        computed: {
            classes() {
                return {
                    blue: this.uiState.ANSWER_NOT_CHECKED && this.selected,
                    green: this.uiState.ANSWERED_CORRECTLY && this.selected,
                    red: this.uiState.ANSWERED_WRONG && this.selected,
                }
            }
        },
    }
</script>

<style scoped>
    .option{
        border: 1px solid #000;
        border-radius: 3000px;
        cursor: pointer;
    }

</style>
