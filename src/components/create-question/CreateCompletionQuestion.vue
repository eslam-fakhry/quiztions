<template>
    <div>
        <CreateCompletionTemplate
                v-model="questionTemplate"
        />
        <CompletionRightAnswers
            :template="questionTemplate"
            :value="[...answer]"
            @input="answer = $event"
            data-jest="right-answer"
    />
    </div>
</template>

<script>
    import {required, minLength, maxLength} from 'vuelidate/lib/validators'

    import CompletionRightAnswers from '@/components/create-question/CompletionRightAnswers'
    import CreateCompletionTemplate from '@/components/create-question/CreateCompletionTemplate'
    export default {
        name: "CreateCompletionQuestion",

        components: {
            CreateCompletionTemplate,
            CompletionRightAnswers,
        },

        props: {
            rightAnswer: {},
        },

        data() {
            return {
                answer: [],
                questionTemplate:''
            }
        },

       computed:{
           blankNum() {
               // noinspection JSCheckFunctionSignatures
               const re = new RegExp("--blank--", "g");
               return (this.questionTemplate.match(re) || []).length
           },
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
            questionTemplate(){
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
                    type: 'completion',
                    template:this.questionTemplate,
                })
                this.$emit('update:valid', !this.$v.$invalid)
            }
        },

        validations: {
            questionTemplate: {
                required,
                containBlanks(){
                    return !! this.blankNum
                },
            },
            answer: {
                required,
                exactLength(value) {
                    return value.length === this.blankNum
                },
                $each: {
                    required,
                }
            }
        },
    }
</script>
