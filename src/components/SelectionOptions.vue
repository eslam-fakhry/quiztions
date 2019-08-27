<template>
    <div style="width: 100vw;max-width: 300px;">
        <SingleSelectionOption
                class=" "
                v-for="option in question.options"
                :key="option"
                :option="option"
                @click="choose(option)"
                :selected="option === value"
                :ui-state="uiState"
        />
    </div>
</template>
<script>
    // todo: make this component renderless
    import SingleSelectionOption from "./SingleSelectionOption";

    export default {
        name: 'SelectionOptions',

        components: {SingleSelectionOption},

        inject:['question'],

        props: {
            uiState: {
                type: Object,
                required: true
            },
            value: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },

        created() {
            const NumberPressHandler = () => {
                if (['1', '2', '3', '4', '5', '6', '7'].includes(event.key)) {
                    const index = Number(event.key) - 1
                    event.preventDefault()
                    this.question.options[index] && this.choose(this.question.options[index])
                }
            }
            document.addEventListener('keypress', NumberPressHandler)
            this.$once('hook:activated', () => {
                document.addEventListener('keypress', NumberPressHandler)
            })
            this.$once('hook:deactivated', () => {
                document.removeEventListener('keypress', NumberPressHandler)
            })
            this.$once('hook:destroyed', () => {
                document.removeEventListener('keypress', NumberPressHandler)
            })
        },

        methods: {
            choose(option) {
                !this.disabled && this.$emit('input', option)
            }
        },
    }
</script>
