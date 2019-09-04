<template>
    <div>
        <CreateList
                :value="[...options]"
                :min="2"
                :max="5"
                @input="options=[...$event]"
        />
        <TheSelectField
                :items="[...options]"
                @input="answer = [$event]"
                label="select the right answer"
                data-jest="right-answer"
        />
    </div>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    import CreateList from '@/components/CreateList'
    import TheSelectField from "@/components/TheSelectField";

    export default {
        name: "CreateCompletionQuestion",

        components: {
            TheSelectField,
            CreateList,
        },

        props: {
            rightAnswer: {},
        },

        data() {
            return {
                answer: [],
                options: [],
            }
        },

        watch:{
            rightAnswer:{
                immediate:true,
                handler(val){
                    this.answer =  val && Array.isArray(val)
                        ? val
                        : []
                }
            },
            options(){
                this.update()
            },
            answer(){
                this.update()
            },
        },

        mounted() {
            this.$emit('update:valid', !this.$v.$invalid)
        },

        methods: {
            update() {
                this.$emit('update:rightAnswer', this.answer)
                this.$emit('update:questionPart', {
                    type: 'selection',
                    options:this.options,
                })
                this.$emit('update:valid', !this.$v.$invalid)
            }
        },

        validations: {
            options: {
                required,
                minLength:minLength(2),
                maxLength:maxLength(6),
                $each: {
                    required,
                },
            },
            answer: {
                required,
                maxLength:maxLength(1),
                validAnswer(value) {
                    return this.options.includes(value[0])
                },
                $each: {
                    required,
                }
            }
        },
    }
</script>
