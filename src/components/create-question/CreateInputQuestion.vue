<template>
    <div>
        <TheTextField
                :value="answer"
                @input="update"
                data-jest="right-answer"
        />
    </div>
</template>

<script>
    import {required} from 'vuelidate/lib/validators'
    import TheTextField from "@/components/TheTextField";

    export default {
        name: "CreateInputQuestion",
        components: {TheTextField},
        props: {
            rightAnswer: {},
        },

        data() {
            return {
                answer: "",
            }
        },

        watch: {
            rightAnswer: {
                immediate: true,
                handler(val) {
                    this.answer = val && (typeof val === "string")
                        ? val
                        : ""
                }
            }
        },

        mounted() {
            this.$emit('update:valid', !this.$v.$invalid)
        },

        methods: {
            update(answer) {
                this.answer = answer
                this.$emit('update:rightAnswer', answer)
                this.$emit('update:questionPart', {
                    type: 'input'
                })
                this.$emit('update:valid', !this.$v.$invalid)
            }
        },

        validations: {
            answer: {
                required,
            }
        },
    }
</script>
