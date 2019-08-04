<template>
    <v-layout
            column
            class=" justify-center align-center "
            style="height: 100%"
    >

        <v-flex shrink v-if="isBodyString">
            <div class="text-center pb-6 mt-6">{{question.body}}</div>
        </v-flex>
        <v-flex shrink v-else>
            <div
                    v-for="(bodyItem,i) in  question.body"
                    class="text-center pb-6 mt-6"
                    :key="`bodyItem--${i}`"
            >
                <span v-if="bodyItem.text" v-text="bodyItem.text"></span>
            </div>
        </v-flex>

        <v-flex>

            <Answer
                    @continue="$emit('continue')"
                    @result="$emit('result',$event)"
            />

        </v-flex>

    </v-layout>
</template>

<script>


    import Answer from "../components/Answer";
    // todo: move fetching question object from lesson into here
    export default {
        name: "Question",
        components: {
            Answer,
        },
        props: {
            question: {type: Object, required: true},
            questionId:{type:String}
        },
        provide() {
            return {
                question: this.question
            }
        },
        data() {
            return {
                loading: false
            }
        },
        computed: {
            isBodyString() {
                return typeof this.question.body === 'string';
            }
        },
        // watch:{
        //     question_id: {
        //         immediate:true,
        //         handler(){
        //             this.loading = true
        //             this.$store.dispatch('fetchQuestion', {id: this.questionId})
        //                 .then((question) => {
        //                     !this.questions[this.currentIndex] && this.questions.push(question);
        //                 })
        //                 .finally(() => this.loading = false)
        //         }
        //
        //     }
        // },

    }
</script>

