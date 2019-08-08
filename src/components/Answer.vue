<template>
    <v-layout column style="height: 100%">
        <v-flex shrink>
            <!--<slot v-bind="{question,userAnswer,uiState,updateAnswer}"></slot>-->
            <component
                    :is="answerComponentName"
                    @continue="$emit('continue')"
                    @result="$emit('result',$event)"
                    :key="question.id"
                    v-model="userAnswer"
                    :ui-state="uiState"
            ></component>

        </v-flex>
        <v-flex grow class="d-flex justify-center align-center">
            <QuestionFeedback :ui-state="uiState" :feedback="feedback"/>
        </v-flex>
        <v-flex shrink class="text-center pb-4">
            <v-btn
                    outlined
                    @click="answer"
                    :disabled="uiState.NOT_ANSWERED"
                    :loading="loading"
                    v-text="submitBtnText"
            />
        </v-flex>
    </v-layout>
</template>
<script>

    import _ from "lodash"
    import {mapGetters} from 'vuex'

    import SelectionAnswer from "../components/SelectionAnswer";
    import CompletionAnswer from "../components/CompletionAnswer";
    import InputAnswer from "../components/InputAnswer";

    import QuestionMixin from "./mixins/Question"
    import QuestionFeedback from "./QuestionFeedback";

    export default {
        name: 'Answer',

        props: {
            // question: {type: Object, required: true},
        },
        inject:['question'],

        mixins: [QuestionMixin,],

        components: {
            QuestionFeedback,
            SelectionAnswer,
            CompletionAnswer,
            InputAnswer,
        },

        methods: {
            // override setFeedback from question mixin
            setFeedback() {
                this.feedback = this.correct ? `you were right, "${this.userAnswer}" is the answer` : `sorry
            but "${this.getRightAnswer(this.question.id)}" is the right answer`
            },

        },

        computed: {
            ...mapGetters('answers',['getRightAnswer']),
            /**
             * @return {string}
             */
            answerComponentName() {
                return _.camelCase(this.question.type) + "Answer";
            }
        },

    }
</script>
