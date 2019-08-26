<template>
    <div>
        <CreateList
                :value="[...options]"
                :min="2"
                :max="5"
                @input="options=[...$event]"
        />
<!--                data-jest="options"-->
        <v-select
                :items="[...options]"
                @input="answer = [$event]"
                label="select the right answer"
                solo
                data-jest="right-answer"
        />
    </div>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'
    import CreateList from '@/components/CreateList'

    export default {
        name: "CreateCompletionQuestion",
        components: {
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

        mounted() {
            this.$emit('update:valid', !this.$v.$invalid)
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
        }
    }
</script>
