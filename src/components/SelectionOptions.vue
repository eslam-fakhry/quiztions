<template>
    <div style="width: 100vw;max-width: 300px;">
        <SingleSelectionOption
                class=" "
                v-for="option in options"
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
        props: {
            uiState: {
                type: Object,
                required: true
            },
            value: {
                type: String
            },
            options: {
                type: Array,
                required: true
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            choose(option) {
                !this.disabled && this.$emit('input', option)
            }
        },

        activated() {
            const NumberPressHandler = () => {
                if (['1', '2', '3', '4', '5', '6', '7'].includes(event.key)) {
                    const index = Number(event.key) - 1
                    event.preventDefault()
                    this.options[index] && this.choose(this.options[index])
                }
            }
            document.addEventListener('keypress', NumberPressHandler)

            this.$once('hook:deactivated', () => {
                document.removeEventListener('keypress', NumberPressHandler)
            })

        },


    }
</script>
